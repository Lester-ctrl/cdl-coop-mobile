import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

const BLUE = "#2952CC";
const BLUE_LIGHT = "#EEF2FF";
const PURPLE = "#7C3AED";
const PURPLE_LIGHT = "#F3F0FF";
const GREEN = "#22C55E";
const GREEN_LIGHT = "#F0FDF4";
const RED = "#EF4444";

type AmortRow = {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
};

type LoanPreviewCardProps = {
    loanType: string | null;
    loanLabel: string | null;
    amountRequested: string;
    term: string;
    interestRate: number | null;
};

function fmt(n: number): string {
    return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function LoanPreviewCard({
    loanType,
    loanLabel,
    amountRequested,
    term,
    interestRate,
}: LoanPreviewCardProps) {
    const P = parseFloat(amountRequested) || 0;
    const n = parseInt(term) || 0;
    const r = (interestRate ?? 0) / 100;

    const isValid = P > 0 && n > 0;

    const { monthly, totalInterest, totalPayment, principalPct, interestPct, schedule } =
        useMemo(() => {
            if (!isValid) return { monthly: 0, totalInterest: 0, totalPayment: 0, principalPct: 0, interestPct: 0, schedule: [] };

            let monthly: number;
            if (r === 0) {
                monthly = P / n;
            } else {
                monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            }

            const totalPayment = monthly * n;
            const totalInterest = totalPayment - P;

            const principalPct = (P / totalPayment) * 100;
            const interestPct = (totalInterest / totalPayment) * 100;

            // Build schedule — show all rows for emergency (≤3), first 12 for others
            const maxRows = loanType === "Instant/Emergency Loan" ? n : Math.min(n, 12);
            const schedule: AmortRow[] = [];
            let balance = P;
            for (let i = 1; i <= maxRows; i++) {
                const intPaid = balance * r;
                const prinPaid = monthly - intPaid;
                balance = Math.max(0, balance - prinPaid);
                schedule.push({
                    month: i,
                    payment: parseFloat(monthly.toFixed(2)),
                    principal: parseFloat(prinPaid.toFixed(2)),
                    interest: parseFloat(intPaid.toFixed(2)),
                    balance: parseFloat(balance.toFixed(2)),
                });
            }

            return { monthly, totalInterest, totalPayment, principalPct, interestPct, schedule };
        }, [P, n, r, loanType]);

    if (!loanType || !isValid) return null;

    const isEmergency = loanType === "Instant/Emergency Loan";
    const scheduleTitle = isEmergency
        ? "Amortization Schedule"
        : `Amortization Schedule (First ${Math.min(n, 12)} Months)`;

    return (
        <View style={styles.root}>
            {/* ── Header ── */}
            <View style={styles.header}>
                <View style={styles.iconBox}>
                    <Ionicons name="calculator-outline" size={22} color={BLUE} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>Loan Preview</Text>
                    <Text style={styles.cardSubtitle}>Estimated payment breakdown</Text>
                </View>
                <View style={styles.loanTypeBadge}>
                    <Text style={styles.loanTypeBadgeText}>{loanLabel}</Text>
                </View>
            </View>

            {/* ── Key Metrics ── */}
            <View style={styles.metricsCol}>
                <View style={[styles.metricCard, { backgroundColor: BLUE_LIGHT, marginBottom: 10 }]}>
                    <View style={styles.metricLabelRow}>
                        <Ionicons name="wallet-outline" size={12} color={BLUE} />
                        <Text style={[styles.metricLabel, { color: BLUE }]}>  MONTHLY PAYMENT</Text>
                    </View>
                    <Text style={[styles.metricValue, { color: BLUE }]}>₱{fmt(monthly)}</Text>
                </View>
                <View style={[styles.metricCard, { backgroundColor: PURPLE_LIGHT }]}>
                    <View style={styles.metricLabelRow}>
                        <Ionicons name="trending-up-outline" size={12} color={PURPLE} />
                        <Text style={[styles.metricLabel, { color: PURPLE }]}>  TOTAL INTEREST</Text>
                    </View>
                    <Text style={[styles.metricValue, { color: PURPLE }]}>₱{fmt(totalInterest)}</Text>
                </View>
            </View>

            {/* ── Breakdown Bars ── */}
            <View style={styles.barsSection}>
                <View style={styles.barRow}>
                    <View style={styles.barLabelRow}>
                        <Text style={styles.barLabel}>Principal</Text>
                        <Text style={styles.barPct}>₱{fmt(P)} ({principalPct.toFixed(1)}%)</Text>
                    </View>
                    <View style={styles.barTrack}>
                        <View style={[styles.barFill, { width: `${principalPct}%` as any, backgroundColor: BLUE }]} />
                    </View>
                </View>
                <View style={[styles.barRow, { marginTop: 10 }]}>
                    <View style={styles.barLabelRow}>
                        <Text style={styles.barLabel}>Total Interest</Text>
                        <Text style={styles.barPct}>₱{fmt(totalInterest)} ({interestPct.toFixed(1)}%)</Text>
                    </View>
                    <View style={styles.barTrack}>
                        <View style={[styles.barFill, { width: `${interestPct}%` as any, backgroundColor: PURPLE }]} />
                    </View>
                </View>
            </View>

            <View style={styles.divider} />

            {/* ── Summary Rows ── */}
            <View style={styles.summarySection}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryKey}>Loan Amount</Text>
                    <Text style={styles.summaryVal}>₱{fmt(P)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryKey}>Loan Term</Text>
                    <Text style={styles.summaryVal}>{n} month{n > 1 ? "s" : ""}</Text>
                </View>
                {!isEmergency && (
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryKey}>Monthly Interest</Text>
                        <Text style={styles.summaryVal}>{interestRate ?? 0}%</Text>
                    </View>
                )}
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryKey}>Total Interest Paid</Text>
                    <Text style={styles.summaryVal}>₱{fmt(totalInterest)}</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalKey}>Total Payment</Text>
                    <Text style={styles.totalVal}>₱{fmt(totalPayment)}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* ── Amortization Table ── */}
            <Text style={styles.tableTitle}>{scheduleTitle}</Text>
            <View>
                {/* Header */}
                <View style={styles.tableHeaderRow}>
                    <Text style={[styles.tableHeaderCell, styles.colMo]}>Mo.</Text>
                    <Text style={[styles.tableHeaderCell, styles.colFlex]}>Payment</Text>
                    <Text style={[styles.tableHeaderCell, styles.colFlex]}>Principal</Text>
                    <Text style={[styles.tableHeaderCell, styles.colFlex]}>Interest</Text>
                    <Text style={[styles.tableHeaderCell, styles.colFlex, { textAlign: "right" }]}>Balance</Text>
                </View>

                {schedule.map((row, i) => (
                    <View
                        key={row.month}
                        style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}
                    >
                        <Text style={[styles.tableCell, styles.colMo]}>{row.month}</Text>
                        <Text style={[styles.tableCell, styles.colFlex]}>₱{fmt(row.payment)}</Text>
                        <Text style={[styles.tableCell, styles.colFlex]}>₱{fmt(row.principal)}</Text>
                        <Text style={[styles.tableCell, styles.colFlex, { color: PURPLE }]}>₱{fmt(row.interest)}</Text>
                        <Text style={[styles.tableCell, styles.colFlex, { textAlign: "right" }]}>₱{fmt(row.balance)}</Text>
                    </View>
                ))}
            </View>

            {/* ── Disclaimer ── */}
            <View style={styles.disclaimer}>
                <Ionicons name="information-circle-outline" size={13} color="#9CA3AF" style={{ marginRight: 5, marginTop: 1 }} />
                <Text style={styles.disclaimerText}>
                    Results are estimates only. Actual payments may vary based on your loan agreement.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        borderWidth: 1.5,
        borderColor: BLUE_LIGHT,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: BLUE_LIGHT,
        alignItems: "center",
        justifyContent: "center",
    },
    cardTitle: {
        fontSize: 17,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
        marginBottom: 1,
    },
    cardSubtitle: {
        fontSize: 11,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
    },
    loanTypeBadge: {
        backgroundColor: BLUE_LIGHT,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    loanTypeBadgeText: {
        fontSize: 10,
        fontFamily: "Poppins_600SemiBold",
        color: BLUE,
    },
    metricsCol: {
        flexDirection: "column",
        marginBottom: 16,
    },
    metricCard: {
        borderRadius: 14,
        padding: 14,
    },
    metricLabelRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    metricLabel: {
        fontSize: 10,
        fontFamily: "Poppins_600SemiBold",
        letterSpacing: 0.4,
    },
    metricValue: {
        fontSize: 20,
        fontFamily: "Poppins_800ExtraBold",
        lineHeight: 26,
    },
    barsSection: {
        marginBottom: 16,
    },
    barRow: {},
    barLabelRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    barLabel: {
        fontSize: 12,
        fontFamily: "Poppins_500Medium",
        color: "#374151",
    },
    barPct: {
        fontSize: 11,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
    },
    barTrack: {
        height: 8,
        backgroundColor: "#F3F4F6",
        borderRadius: 4,
        overflow: "hidden",
    },
    barFill: {
        height: 8,
        borderRadius: 4,
    },
    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
        marginVertical: 14,
    },
    summarySection: {},
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#F9FAFB",
    },
    summaryKey: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
    },
    summaryVal: {
        fontSize: 13,
        fontFamily: "Poppins_600SemiBold",
        color: "#111827",
    },
    totalRow: {
        borderBottomWidth: 0,
        marginTop: 4,
    },
    totalKey: {
        fontSize: 14,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
    },
    totalVal: {
        fontSize: 15,
        fontFamily: "Poppins_800ExtraBold",
        color: BLUE,
    },
    tableTitle: {
        fontSize: 13,
        fontFamily: "Poppins_600SemiBold",
        color: "#374151",
        marginBottom: 10,
    },
    tableHeaderRow: {
        flexDirection: "row",
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        marginBottom: 2,
    },
    tableHeaderCell: {
        fontSize: 11,
        fontFamily: "Poppins_600SemiBold",
        color: "#6B7280",
        letterSpacing: 0.3,
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 7,
        alignItems: "center",
    },
    tableRowAlt: {
        backgroundColor: "#F9FAFB",
        borderRadius: 6,
    },
    colMo: {
        width: 28,
    },
    colFlex: {
        flex: 1,
    },
    tableCell: {
        fontSize: 11,
        fontFamily: "Poppins_500Medium",
        color: "#374151",
    },
    disclaimer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 14,
    },
    disclaimerText: {
        flex: 1,
        fontSize: 11,
        fontFamily: "Poppins_400Regular",
        color: "#9CA3AF",
        lineHeight: 16,
    },
});