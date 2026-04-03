import { getLoanHistory } from "@/api/loan-history";
import { useAuth } from "@/context/AuthContext";
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BLUE = "#1A56DB";
const BLUE_LIGHT = "#EEF2FF";
const GREEN = "#22C55E";
const GREEN_LIGHT = "#F0FDF4";
const PURPLE = "#7C3AED";
const GRAY = "#6B7280";
const GRAY_LIGHT = "#F3F4F6";

const ITEMS_PER_PAGE = 10;

type Loan = {
    loan_account_id: number;
    profile_id: number;
    principal_amount: number;
    interest_rate: number;
    term_months: number;
    release_date: string;
    maturity_date: string;
    monthly_amortization: number;
    balance: number;
    status: string;
};

type AmortRow = {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
    paid: boolean;
};

type PaidDates = Record<string, string[]>;

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
}

function fmt(n: number): string {
    return parseFloat(String(n)).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function isActive(status: string) {
    return status?.toLowerCase() === "active";
}

function StatusBadgeSmall({ status }: { status: string }) {
    const active = isActive(status);
    return (
        <View style={[styles.rowStatusBadge, active ? styles.rowBadgeActive : styles.rowBadgeCompleted]}>
            <Text style={[styles.rowStatusBadgeText, { color: active ? "#15803D" : GRAY }]}>
                {status}
            </Text>
        </View>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
}

function buildSchedule(loan: Loan, paidDates: string[]): AmortRow[] {
    const P = parseFloat(String(loan.principal_amount));
    const r = parseFloat(String(loan.interest_rate)) / 100;
    const n = loan.term_months;
    const monthly =
        r === 0
            ? P / n
            : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const paidYearMonths = new Set(
        paidDates.map((d) => d.slice(0, 7))
    );

    const releaseDate = new Date(loan.release_date);
    const rows: AmortRow[] = [];
    let balance = P;

    for (let i = 1; i <= n; i++) {
        const intPaid = balance * r;
        const prinPaid = monthly - intPaid;
        balance = Math.max(0, balance - prinPaid);

        const dueDate = new Date(releaseDate);
        dueDate.setMonth(dueDate.getMonth() + (i - 1));
        const dueYearMonth = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(2, "0")}`;

        rows.push({
            month: i,
            payment: parseFloat(monthly.toFixed(2)),
            principal: parseFloat(prinPaid.toFixed(2)),
            interest: parseFloat(intPaid.toFixed(2)),
            balance: parseFloat(balance.toFixed(2)),
            paid: paidYearMonths.has(dueYearMonth),
        });
    }
    return rows;
}

export default function LoanHistory() {
    const { session } = useAuth();
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalLoading, setModalLoading] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [paidDates, setPaidDates] = useState<PaidDates>({});
    const [currentPage, setCurrentPage] = useState(1);

    const profile = session?.profile;

    const totalPages = Math.ceil(loans.length / ITEMS_PER_PAGE);
    const paginatedLoans = loans.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
    });

    useFocusEffect(
        useCallback(() => {
            const fetchLoanHistory = async () => {
                try {
                    const res = await getLoanHistory(profile?.profile_id);
                    setLoans(res.loans ?? []);
                    setPaidDates(res.paidDates ?? {});
                    setCurrentPage(1);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchLoanHistory();
        }, [profile?.profile_id])
    );

    const handleRowPress = async (loan: Loan) => {
        setSelectedLoan(loan);
        setModalVisible(true);
        try {
            setModalLoading(true);
            const res = await getLoanHistory(profile?.profile_id);
            setPaidDates(res.paidDates ?? {});
        } catch (error) {
            console.log(error);
        } finally {
            setModalLoading(false);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedLoan(null);
    };

    const amortSchedule = useMemo(() => {
        if (!selectedLoan) return [];
        const dates = paidDates[String(selectedLoan.loan_account_id)] ?? [];
        return buildSchedule(selectedLoan, dates);
    }, [selectedLoan, paidDates]);

    if (!fontsLoaded) return null;

    const activeCount = loans.filter((l) => isActive(l.status)).length;
    const completedCount = loans.length - activeCount;

    const getPaginationItems = (current: number, total: number): (number | string)[] => {
        if (total <= 5) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
        if (current <= 3) {
            return [1, 2, 3, "...", total];
        }
        if (current >= total - 2) {
            return [1, "...", total - 2, total - 1, total];
        }
        return [1, "...", current - 1, current, current + 1, "...", total];
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#3A8E0D" }} edges={["top"]}>
            <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

                {/* Hero */}
                <LinearGradient
                    colors={["#51b61a", "#48a019", "#3A8E0D"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.hero}
                >
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Loan History</Text>
                    </View>
                    <Text style={styles.heroTitle}>Loan History</Text>
                    <Text style={styles.heroDesc}>View all your loan accounts — active and completed.</Text>

                    {/* Summary pills */}
                    {!loading && loans.length > 0 && (
                        <View style={styles.heroPills}>
                            <View style={styles.heroPill}>
                                <Text style={styles.heroPillValue}>{activeCount}</Text>
                                <Text style={styles.heroPillLabel}>Active</Text>
                            </View>
                            <View style={styles.heroPillDivider} />
                            <View style={styles.heroPill}>
                                <Text style={styles.heroPillValue}>{completedCount}</Text>
                                <Text style={styles.heroPillLabel}>Completed</Text>
                            </View>
                            <View style={styles.heroPillDivider} />
                            <View style={styles.heroPill}>
                                <Text style={styles.heroPillValue}>{loans.length}</Text>
                                <Text style={styles.heroPillLabel}>Total</Text>
                            </View>
                        </View>
                    )}
                </LinearGradient>

                {/* Card */}
                <View style={styles.card}>
                    <View style={styles.cardTopRow}>
                        <View style={styles.iconBox}>
                            <Ionicons name="time-outline" size={22} color={BLUE} />
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>All Loans</Text>
                            <Text style={styles.cardSubtitle}>
                                {loans.length} {loans.length === 1 ? "loan" : "loans"} found
                            </Text>
                        </View>
                    </View>

                    {/* Table Header - Added # column */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, { width: 36 }]}>#</Text>
                        <Text style={[styles.tableHeaderText, { flex: 1.4 }]}>Release Date</Text>
                        <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>Principal</Text>
                    </View>

                    {/* Loading / Empty / Content */}
                    {loading ? (
                        <View style={styles.centerBox}>
                            <ActivityIndicator size="small" color={BLUE} />
                            <Text style={styles.loadingText}>Loading loan history...</Text>
                        </View>
                    ) : loans.length === 0 ? (
                        <View style={styles.centerBox}>
                            <View style={styles.emptyIconBox}>
                                <Ionicons name="document-outline" size={32} color="#9CA3AF" />
                            </View>
                            <Text style={styles.emptyTitle}>No Loans Found</Text>
                            <Text style={styles.emptyDesc}>You don't have any loan records yet.</Text>
                        </View>
                    ) : (
                        <>
                            {paginatedLoans.map((item, index) => {
                                const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                                return (
                                    <TouchableOpacity
                                        key={item.loan_account_id}
                                        onPress={() => handleRowPress(item)}
                                        activeOpacity={0.7}
                                        style={[
                                            styles.tableRow,
                                            index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                                            index === paginatedLoans.length - 1 && styles.rowLast,
                                        ]}
                                    >
                                        <Text style={styles.rowNumber}>{globalIndex}</Text>

                                        <View style={[styles.rowLeft, { flex: 1.4 }]}>
                                            <View style={[
                                                styles.statusDot,
                                                { backgroundColor: isActive(item.status) ? GREEN : GRAY },
                                            ]} />
                                            <View>
                                                <Text style={styles.dateText}>{formatDate(item.release_date)}</Text>
                                            </View>
                                        </View>

                                        <View style={[styles.rowRight, { flex: 1 }]}>
                                            <Text style={styles.principalText}>₱{fmt(item.principal_amount)}</Text>
                                            <StatusBadgeSmall status={item.status} />
                                        </View>
                                        <Ionicons name="chevron-forward" size={16} color="#CBD5E1" style={{ marginLeft: 6 }} />
                                    </TouchableOpacity>
                                );
                            })}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <View style={styles.pagination}>
                                    <TouchableOpacity
                                        style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
                                        onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <Ionicons name="chevron-back" size={16} color={currentPage === 1 ? "#D1D5DB" : "#3A8E0D"} />
                                    </TouchableOpacity>

                                    {getPaginationItems(currentPage, totalPages).map((item, index) =>
                                        item === "..." ? (
                                            <View key={`ellipsis-${index}`} style={styles.pageEllipsis}>
                                                <Text style={styles.pageEllipsisText}>...</Text>
                                            </View>
                                        ) : (
                                            <TouchableOpacity
                                                key={item}
                                                style={[styles.pageButton, currentPage === item && styles.pageButtonActive]}
                                                onPress={() => setCurrentPage(item as number)}
                                            >
                                                <Text style={[styles.pageButtonText, currentPage === item && styles.pageButtonTextActive]}>
                                                    {item}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    )}

                                    <TouchableOpacity
                                        style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
                                        onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        <Ionicons name="chevron-forward" size={16} color={currentPage === totalPages ? "#D1D5DB" : "#3A8E0D"} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </>
                    )}
                </View>
            </ScrollView>

            {/* Detail Modal - Unchanged */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <Pressable style={styles.modalBackdrop} onPress={handleCloseModal} />
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHandle} />

                        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                            {/* Modal Header */}
                            <View style={styles.modalHeader}>
                                <View style={styles.modalIconBox}>
                                    <Ionicons name="wallet-outline" size={20} color="#3A8E0D" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.modalTitle}>Loan Details</Text>
                                </View>
                                <View style={[
                                    styles.modalStatusBadge,
                                    isActive(selectedLoan?.status ?? "")
                                        ? styles.modalBadgeActive
                                        : styles.modalBadgeCompleted,
                                ]}>
                                    <Text style={[
                                        styles.modalStatusBadgeText,
                                        { color: isActive(selectedLoan?.status ?? "") ? "#15803D" : GRAY },
                                    ]}>
                                        ● {selectedLoan?.status ?? "—"}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.modalDivider} />

                            {/* Principal Banner */}
                            <LinearGradient
                                colors={["#3A8E0D", "#3A8E0D"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.principalBanner}
                            >
                                <Text style={styles.principalBannerLabel}>Principal Amount</Text>
                                <Text style={styles.principalBannerValue}>
                                    ₱{selectedLoan ? fmt(selectedLoan.principal_amount) : "—"}
                                </Text>
                            </LinearGradient>

                            {/* Two stat boxes */}
                            <View style={styles.statRow}>
                                <View style={styles.statBox}>
                                    <Text style={styles.statLabel}>Monthly Payment</Text>
                                    <Text style={styles.statValue}>
                                        ₱{selectedLoan ? fmt(selectedLoan.monthly_amortization) : "—"}
                                    </Text>
                                </View>
                                <View style={styles.statBox}>
                                    <Text style={styles.statLabel}>Remaining Balance</Text>
                                    <Text style={[styles.statValue, { color: BLUE }]}>
                                        ₱{selectedLoan ? fmt(selectedLoan.balance) : "—"}
                                    </Text>
                                </View>
                            </View>

                            {/* Detail rows */}
                            <View style={styles.detailsContainer}>
                                <DetailRow
                                    label="Status"
                                    value={selectedLoan?.status ?? "—"}
                                />
                                <DetailRow
                                    label="Interest Rate"
                                    value={selectedLoan ? `${selectedLoan.interest_rate}% / month` : "—"}
                                />
                                <DetailRow
                                    label="Term"
                                    value={selectedLoan ? `${selectedLoan.term_months} months` : "—"}
                                />
                                <DetailRow
                                    label="Release Date"
                                    value={selectedLoan ? formatDate(selectedLoan.release_date) : "—"}
                                />
                                <DetailRow
                                    label="Maturity Date"
                                    value={selectedLoan ? formatDate(selectedLoan.maturity_date) : "—"}
                                />
                            </View>

                            {/* Amortization Table */}
                            {amortSchedule.length > 0 && (
                                <View style={styles.amortCard}>
                                    <View style={styles.amortCardHeader}>
                                        <View style={styles.amortIconBox}>
                                            <Ionicons name="calculator-outline" size={16} color={BLUE} />
                                        </View>
                                        <Text style={styles.amortTitle}>Amortization Schedule</Text>
                                        {modalLoading && (
                                            <ActivityIndicator size="small" color={BLUE} style={{ marginLeft: 8 }} />
                                        )}
                                    </View>

                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={true}
                                        bounces={false}
                                    >
                                        <View>
                                            <View style={styles.amortHeaderRow}>
                                                <Text style={[styles.amortHeaderCell, styles.colMo]}>Mo.</Text>
                                                <Text style={[styles.amortHeaderCell, styles.colAmount]}>Payment</Text>
                                                <Text style={[styles.amortHeaderCell, styles.colAmount]}>Principal</Text>
                                                <Text style={[styles.amortHeaderCell, styles.colAmount]}>Interest</Text>
                                                <Text style={[styles.amortHeaderCell, styles.colAmount]}>Balance</Text>
                                                <Text style={[styles.amortHeaderCell, styles.colStatus, { textAlign: "center" }]}>
                                                    Status
                                                </Text>
                                            </View>

                                            {amortSchedule.map((row, i) => (
                                                <View
                                                    key={row.month}
                                                    style={[
                                                        styles.amortRow,
                                                        i % 2 === 0 && styles.amortRowAlt,
                                                    ]}
                                                >
                                                    <Text style={[styles.amortCell, styles.colMo]}>{row.month}</Text>
                                                    <Text style={[styles.amortCell, styles.colAmount]}>₱{fmt(row.payment)}</Text>
                                                    <Text style={[styles.amortCell, styles.colAmount]}>₱{fmt(row.principal)}</Text>
                                                    <Text style={[styles.amortCell, styles.colAmount, { color: PURPLE }]}>₱{fmt(row.interest)}</Text>
                                                    <Text style={[styles.amortCell, styles.colAmount]}>₱{fmt(row.balance)}</Text>
                                                    <View style={styles.colStatus}>
                                                        <View style={[
                                                            styles.amortStatusBadge,
                                                            row.paid ? styles.paidBadge : styles.unpaidBadge,
                                                        ]}>
                                                            <View style={[
                                                                styles.statusDotSmall,
                                                                { backgroundColor: row.paid ? "#22C55E" : "#F59E0B" },
                                                            ]} />
                                                            <Text style={[
                                                                styles.amortStatusText,
                                                                { color: row.paid ? "#15803D" : "#B45309" },
                                                            ]}>
                                                                {row.paid ? "Paid" : "Unpaid"}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    </ScrollView>
                                </View>
                            )}

                            {/* Disclaimer */}
                            <View style={styles.disclaimer}>
                                <Ionicons name="information-circle-outline" size={13} color="#9CA3AF" style={{ marginRight: 5, marginTop: 1 }} />
                                <Text style={styles.disclaimerText}>
                                    Results are estimates only. Actual payments may vary based on your loan agreement.
                                </Text>
                            </View>

                            {/* Close Button */}
                            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal} activeOpacity={0.85}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F5F6FA",
    },

    // Hero styles (unchanged)
    hero: {
        padding: 28,
        paddingBottom: 28,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    tag: {
        alignSelf: "center",
        backgroundColor: "rgba(255,255,255,0.18)",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginBottom: 16,
    },
    tagText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        letterSpacing: 0.3,
    },
    heroTitle: {
        color: "#FFFFFF",
        fontSize: 28,
        fontFamily: "Poppins_700Bold",
        lineHeight: 38,
        marginBottom: 6,
        letterSpacing: -0.3,
        textAlign: "center",
    },
    heroDesc: {
        color: "rgba(255,255,255,0.82)",
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        lineHeight: 22,
        textAlign: "center",
        marginBottom: 20,
    },

    heroPills: {
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 8,
        alignItems: "center",
        justifyContent: "space-around",
    },
    heroPill: {
        alignItems: "center",
        flex: 1,
    },
    heroPillValue: {
        fontSize: 20,
        fontFamily: "Poppins_700Bold",
        color: "#FFFFFF",
    },
    heroPillLabel: {
        fontSize: 11,
        fontFamily: "Poppins_400Regular",
        color: "rgba(255,255,255,0.75)",
        marginTop: 2,
    },
    heroPillDivider: {
        width: 1,
        height: 32,
        backgroundColor: "rgba(255,255,255,0.25)",
    },

    // Card
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        margin: 16,
        marginTop: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    cardTopRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginBottom: 18,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: BLUE_LIGHT,
        alignItems: "center",
        justifyContent: "center",
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
        marginBottom: 2,
    },
    cardSubtitle: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
    },

    // Table Header & Rows
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#F1F5F9",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 6,
    },
    tableHeaderText: {
        fontSize: 12,
        fontFamily: "Poppins_600SemiBold",
        color: "#64748B",
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 10,
    },
    rowEven: { backgroundColor: "#FAFAFA" },
    rowOdd: { backgroundColor: "#FFFFFF" },
    rowLast: { marginBottom: 0 },

    // Numbering (New)
    rowNumber: {
        width: 36,
        fontSize: 13,
        fontFamily: "Poppins_600SemiBold",
        color: "#9CA3AF",
    },

    rowLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    rowRight: {
        alignItems: "flex-end",
        gap: 4,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    dateText: {
        fontSize: 13,
        fontFamily: "Poppins_500Medium",
        color: "#1E293B",
    },
    loanIdText: {
        fontSize: 11,
        fontFamily: "Poppins_400Regular",
        color: "#9CA3AF",
        marginTop: 1,
    },
    principalText: {
        fontSize: 14,
        fontFamily: "Poppins_700Bold",
        color: BLUE,
    },

    // Row status badges
    rowStatusBadge: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    rowBadgeActive: {
        backgroundColor: GREEN_LIGHT,
    },
    rowBadgeCompleted: {
        backgroundColor: GRAY_LIGHT,
    },
    rowStatusBadgeText: {
        fontSize: 10,
        fontFamily: "Poppins_600SemiBold",
    },

    // Pagination (Matched with active-loans.tsx)
    pagination: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    pageButton: {
        width: 46,
        height: 46,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F1F5F9",
    },
    pageButtonActive: {
        backgroundColor: "#3A8E0D",
    },
    pageButtonDisabled: {
        backgroundColor: "#F8FAFC",
    },
    pageButtonText: {
        fontSize: 16,
        fontFamily: "Poppins_700Bold",
        color: "#374151",
    },
    pageButtonTextActive: {
        color: "#FFFFFF",
    },

    // Empty / loading
    centerBox: {
        paddingVertical: 32,
        alignItems: "center",
        gap: 8,
    },
    loadingText: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#9CA3AF",
        marginTop: 8,
    },
    emptyIconBox: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#F9FAFB",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    emptyTitle: {
        fontSize: 15,
        fontFamily: "Poppins_600SemiBold",
        color: "#374151",
    },
    emptyDesc: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#9CA3AF",
        textAlign: "center",
        lineHeight: 20,
        paddingHorizontal: 20,
    },

    // Modal styles (unchanged)
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "flex-end",
    },
    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalSheet: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingBottom: 36,
        paddingTop: 12,
        maxHeight: "90%",
    },
    modalHandle: {
        width: 40,
        height: 4,
        backgroundColor: "#E2E8F0",
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 20,
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 14,
    },
    modalIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#f1ffe9",
        alignItems: "center",
        justifyContent: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
        marginBottom: 2,
    },
    modalSubtitle: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: "#9CA3AF",
    },
    modalStatusBadge: {
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    modalBadgeActive: {
        backgroundColor: GREEN_LIGHT,
    },
    modalBadgeCompleted: {
        backgroundColor: GRAY_LIGHT,
    },
    modalStatusBadgeText: {
        fontSize: 12,
        fontFamily: "Poppins_600SemiBold",
    },
    modalDivider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginBottom: 16,
    },

    principalBanner: {
        borderRadius: 16,
        padding: 18,
        marginBottom: 14,
    },
    principalBannerLabel: {
        fontSize: 12,
        fontFamily: "Poppins_500Medium",
        color: "rgba(255,255,255,0.75)",
        marginBottom: 4,
        letterSpacing: 0.3,
    },
    principalBannerValue: {
        fontSize: 28,
        fontFamily: "Poppins_800ExtraBold",
        color: "#FFFFFF",
        letterSpacing: -0.5,
    },

    statRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 16,
    },
    statBox: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        borderRadius: 14,
        padding: 14,
    },
    statLabel: {
        fontSize: 11,
        fontFamily: "Poppins_500Medium",
        color: "#6B7280",
        marginBottom: 4,
    },
    statValue: {
        fontSize: 16,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
    },

    detailsContainer: {
        gap: 8,
        marginBottom: 24,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 11,
        paddingHorizontal: 14,
        backgroundColor: "#F8FAFC",
        borderRadius: 10,
    },
    detailLabel: {
        fontSize: 13,
        fontFamily: "Poppins_500Medium",
        color: "#6B7280",
    },
    detailValue: {
        fontSize: 13,
        fontFamily: "Poppins_600SemiBold",
        color: "#1E293B",
    },

    amortCard: {
        backgroundColor: "#F8FAFC",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    amortCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    amortIconBox: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: BLUE_LIGHT,
        alignItems: "center",
        justifyContent: "center",
    },
    amortTitle: {
        fontSize: 14,
        fontFamily: "Poppins_600SemiBold",
        color: "#374151",
    },

    amortHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        marginBottom: 2,
    },
    amortHeaderCell: {
        fontSize: 11,
        fontFamily: "Poppins_600SemiBold",
        color: "#6B7280",
        letterSpacing: 0.3,
    },
    amortRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 9,
        borderRadius: 6,
    },
    amortRowAlt: {
        backgroundColor: "#EEF2FF",
    },
    amortCell: {
        fontSize: 12,
        fontFamily: "Poppins_500Medium",
        color: "#374151",
    },
    colMo: {
        width: 40,
        paddingLeft: 4,
    },
    colAmount: {
        width: 96,
        paddingRight: 10,
    },
    colStatus: {
        width: 80,
        alignItems: "center",
        justifyContent: "center",
    },
    amortStatusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    paidBadge: {
        backgroundColor: "#F0FDF4",
    },
    unpaidBadge: {
        backgroundColor: "#FFFBEB",
    },
    statusDotSmall: {
        width: 5,
        height: 5,
        borderRadius: 3,
    },
    amortStatusText: {
        fontSize: 10,
        fontFamily: "Poppins_600SemiBold",
    },

    closeButton: {
        backgroundColor: "#3A8E0D",
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: "center",
    },
    closeButtonText: {
        fontSize: 15,
        fontFamily: "Poppins_600SemiBold",
        color: "#FFFFFF",
    },

    disclaimer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    disclaimerText: {
        flex: 1,
        fontSize: 11,
        fontFamily: "Poppins_400Regular",
        color: "#9CA3AF",
        lineHeight: 16,
    },
    pageEllipsis: {
        width: 32,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
    },
    pageEllipsisText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#94A3B8",
        letterSpacing: 1,
    },
});