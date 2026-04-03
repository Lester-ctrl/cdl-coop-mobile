import { FetchPendingApplications, cancelApplication } from "@/api/loan-application";
import { useAuth } from "@/context/AuthContext";
import {
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ITEMS_PER_PAGE = 10;

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
}

function StatusTag({ status }: { status: string }) {
    const isPending = status === "Pending";
    const isCancelled = status === "Cancelled";

    return (
        <View style={[
            styles.statusTag,
            isPending ? styles.statusPending :
            isCancelled ? styles.statusCancelled :
            styles.statusOther
        ]}>
            <Text style={[
                styles.statusTagText,
                isPending ? styles.statusPendingText :
                isCancelled ? styles.statusCancelledText :
                styles.statusOtherText
            ]}>
                {status}
            </Text>
        </View>
    );
}

function DetailRow({ label, value }: { label: string; value: string | null }) {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value ?? "—"}</Text>
        </View>
    );
}

export default function ApplicationStatus() {
    const { session } = useAuth();
    const [loanApplications, setLoanApplications] = useState<any[]>([]);
    const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [cancelConfirmVisible, setCancelConfirmVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const profile = session?.profile;

    const totalPages = Math.ceil(loanApplications.length / ITEMS_PER_PAGE);
    const paginatedApplications = loanApplications.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useFocusEffect(
        useCallback(() => {
            const loadApplications = async () => {
                try {
                    if (profile?.profile_id) {
                        const result = await FetchPendingApplications(profile?.profile_id);
                        setLoanApplications(result?.loanApplications ?? []);
                        setCurrentPage(1);
                    }
                } catch (error) {
                    console.log("Error fetching loan applications: ", error);
                    setLoanApplications([]);
                    setCurrentPage(1);
                }
            };
            loadApplications();
        }, [profile?.profile_id])
    );

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    if (!fontsLoaded) return null;

    const handleRowPress = (item: any) => {
        setSelectedApplication(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedApplication(null);
    };

    const handleCancelPress = () => {
        setCancelConfirmVisible(true);
    };

    const handleCancelDismiss = () => {
        setCancelConfirmVisible(false);
    };

    const handleConfirmCancel = async () => {
        try {
            const result = await cancelApplication(selectedApplication?.loan_application_id);
            console.log("Cancel result:", result);

            const updated = await FetchPendingApplications(profile?.profile_id);
            setLoanApplications(updated?.loanApplications ?? []);
            setCurrentPage(1);

            setCancelConfirmVisible(false);
            handleCloseModal();
        } catch (error) {
            console.log("Error cancelling application: ", error);
            setCancelConfirmVisible(false);
        }
    };

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
                <LinearGradient
                    colors={["#51b61a", "#48a019", "#3A8E0D"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.hero}
                >
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Track loan application progress.</Text>
                    </View>
                    <Text style={styles.heroTitle}>Loan Application Status List</Text>
                    <Text style={styles.heroDesc}>View and track the status of submitted loans.</Text>
                </LinearGradient>

                {/* Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Applications</Text>

                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, styles.colDate]}>Date</Text>
                        <Text style={[styles.tableHeaderText, styles.colStatus]}>Status</Text>
                    </View>

                    {/* Table Rows */}
                    {loanApplications.length === 0 ? (
                        <View style={styles.emptyRow}>
                            <Text style={styles.emptyText}>No applications found.</Text>
                        </View>
                    ) : (
                        paginatedApplications.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleRowPress(item)}
                                activeOpacity={0.7}
                                style={[styles.tableRow, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}
                            >
                                <Text style={[styles.tableCell, styles.colDate]}>
                                    {formatDate(item.created_at)}
                                </Text>
                                <View style={styles.colStatus}>
                                    <StatusTag status={item.status} />
                                </View>
                            </TouchableOpacity>
                        ))
                    )}

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
                </View>
            </ScrollView>

            {/* Detail Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={handleCloseModal}
            >
                <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
                    <Pressable style={styles.modalSheet} onPress={() => {}}>

                        <View style={styles.modalHandle} />

                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Application Details</Text>
                            <Text style={styles.modalSubtitle}>
                                #{selectedApplication?.loan_application_id}
                            </Text>
                        </View>

                        <View style={styles.modalDivider} />

                        <View style={styles.modalStatusRow}>
                            <StatusTag status={selectedApplication?.status ?? "—"} />
                        </View>

                        <View style={styles.detailsContainer}>
                            <DetailRow
                                label="Amount Requested"
                                value={
                                    selectedApplication?.amount_requested
                                        ? `₱ ${parseFloat(selectedApplication.amount_requested).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                                        : null
                                }
                            />
                            <DetailRow
                                label="Loan Type"
                                value={selectedApplication?.type?.name ?? null}
                            />
                            <DetailRow
                                label="Application Type"
                                value={selectedApplication?.application_type}
                            />
                            <DetailRow
                                label="Term"
                                value={
                                    selectedApplication?.term_months
                                        ? `${selectedApplication.term_months} months`
                                        : null
                                }
                            />
                            <DetailRow
                                label="Last Updated"
                                value={
                                    selectedApplication?.updated_at
                                        ? formatDate(selectedApplication.updated_at)
                                        : null
                                }
                            />
                        </View>

                        {selectedApplication?.status !== "Approved" && selectedApplication?.status !== "Cancelled" && (
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
                                <Text style={styles.cancelButtonText}>Cancel Application</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>

                    </Pressable>
                </Pressable>
            </Modal>

            {/* Cancel Confirmation Modal */}
            <Modal
                visible={cancelConfirmVisible}
                transparent
                animationType="fade"
                onRequestClose={handleCancelDismiss}
            >
                <Pressable style={styles.modalOverlay} onPress={handleCancelDismiss}>
                    <Pressable style={styles.confirmSheet} onPress={() => {}}>

                        <View style={styles.warningIconContainer}>
                            <Text style={styles.warningIcon}>⚠️</Text>
                        </View>

                        <Text style={styles.confirmTitle}>Cancel Application?</Text>
                        <Text style={styles.confirmMessage}>
                            Are you sure you want to cancel this loan application? This action cannot be undone.
                        </Text>

                        <View style={styles.confirmActions}>
                            <TouchableOpacity
                                style={styles.confirmNoButton}
                                onPress={handleCancelDismiss}
                            >
                                <Text style={styles.confirmNoText}>No, Keep It</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.confirmYesButton}
                                onPress={handleConfirmCancel}
                            >
                                <Text style={styles.confirmYesText}>Yes, Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </Pressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F5F6FA",
    },

    // Hero
    hero: {
        padding: 28,
        paddingBottom: 36,
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
        marginBottom: 14,
        letterSpacing: -0.3,
        textAlign: "center",
    },
    heroDesc: {
        color: "rgba(255,255,255,0.82)",
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        lineHeight: 22,
        textAlign: "center",
    },

    // Card
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        margin: 16,
        marginTop: 20,
        paddingVertical: 25,
        paddingHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 24,
        fontFamily: "Poppins_700Bold",
        color: "#1E293B",
        marginBottom: 20,
        textAlign: "center",
    },

    // Table
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#F1F5F9",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 4,
    },
    tableHeaderText: {
        fontSize: 13,
        fontFamily: "Poppins_600SemiBold",
        color: "#64748B",
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    rowEven: {
        backgroundColor: "#FAFAFA",
    },
    rowOdd: {
        backgroundColor: "#FFFFFF",
    },
    tableCell: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#334155",
    },
    colDate: {
        flex: 2,
    },
    colStatus: {
        flex: 1,
        alignItems: "flex-start",
    },

    // Status Tag
    statusTag: {
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    statusPending: {
        backgroundColor: "#FEF9C3",
    },
    statusCancelled: {
        backgroundColor: "#d6d5d5",
    },
    statusOther: {
        backgroundColor: "#DCFCE7",
    },
    statusTagText: {
        fontSize: 13,
        fontFamily: "Poppins_600SemiBold",
        textAlign: "center",
    },
    statusPendingText: {
        color: "#CA8A04",
    },
    statusCancelledText: {
        color: "#808080",
    },
    statusOtherText: {
        color: "#16A34A",
    },

    // Empty state
    emptyRow: {
        paddingVertical: 24,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#94A3B8",
    },

    // Pagination
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

    // Modal (shared overlay)
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "flex-end",
    },
    modalSheet: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingBottom: 36,
        paddingTop: 12,
    },
    modalHandle: {
        width: 40,
        height: 4,
        backgroundColor: "#E2E8F0",
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 16,
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: "#1E293B",
    },
    modalSubtitle: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#94A3B8",
    },
    modalDivider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginBottom: 16,
    },
    modalStatusRow: {
        padding: 10,
        marginBottom: 10,
    },

    // Detail rows
    detailsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: "#F8FAFC",
        borderRadius: 10,
    },
    detailLabel: {
        fontSize: 13,
        fontFamily: "Poppins_600SemiBold",
        color: "#64748B",
    },
    detailValue: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#1E293B",
    },

    // Buttons
    closeButton: {
        backgroundColor: "#1A56DB",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
    },
    closeButtonText: {
        fontSize: 15,
        fontFamily: "Poppins_600SemiBold",
        color: "#FFFFFF",
    },
    cancelButton: {
        backgroundColor: "#f35151",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        marginBottom: 10,
    },
    cancelButtonText: {
        fontSize: 15,
        fontFamily: "Poppins_600SemiBold",
        color: "#FFFFFF",
    },

    // Confirm Modal
    confirmSheet: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingBottom: 36,
        paddingTop: 28,
        alignItems: "center",
    },
    warningIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#FEF2F2",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    warningIcon: {
        fontSize: 30,
    },
    confirmTitle: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: "#1E293B",
        marginBottom: 8,
        textAlign: "center",
    },
    confirmMessage: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#64748B",
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 28,
    },
    confirmActions: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    confirmNoButton: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        backgroundColor: "#F1F5F9",
    },
    confirmNoText: {
        fontSize: 14,
        fontFamily: "Poppins_600SemiBold",
        color: "#334155",
    },
    confirmYesButton: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        backgroundColor: "#EF4444",
    },
    confirmYesText: {
        fontSize: 14,
        fontFamily: "Poppins_600SemiBold",
        color: "#FFFFFF",
    },
    pageEllipsis: {
        width: 32,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
    },
    pageEllipsisText: {
        fontSize: 14,
        fontFamily: "Poppins_600SemiBold",
        color: "#94A3B8",
        letterSpacing: 1,
    },
});