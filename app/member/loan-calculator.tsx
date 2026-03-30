import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BLUE = "#2952CC";
const BLUE_DARK = "#1a3aab";
const BLUE_LIGHT = "#EEF2FF";
const PURPLE = "#7C3AED";
const RED = "#DC2626";
const RED_LIGHT = "#FEF2F2";
const AMBER_LIGHT = "#FFFBEB";

const LOAN_TYPES = [
  {
    key: "ecash",
    label: "E-Cash Loan",
    maxRate: 3,
    maxTermMonths: 24,
    maxAmount: null as number | null,
    defaultRate: "3",
    defaultTerm: "12",
    defaultAmount: "10000",
    rateNote: "Max 3% monthly interest · Max term 2 years",
    collateralNote: "Collateral may be required for large loan amounts.",
  },
  {
    key: "guaranteed",
    label: "Guaranteed Loan",
    maxRate: 2,
    maxTermMonths: 24,
    maxAmount: null as number | null,
    defaultRate: "2",
    defaultTerm: "12",
    defaultAmount: "10000",
    rateNote: "Max 2% monthly interest · Max term 2 years",
    collateralNote: null as string | null,
  },
  {
    key: "emergency",
    label: "Instant / Emergency Loan",
    maxRate: 0,
    maxTermMonths: 3,
    maxAmount: 15000,
    defaultRate: "0",
    defaultTerm: "3",
    defaultAmount: "5000",
    rateNote: "Max ₱15,000 · Max term 3 months · No interest",
    collateralNote: null as string | null,
  },
];

type AmortRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export default function LoanCalculator() {
  const router = useRouter();

  const [selectedLoan, setSelectedLoan] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loanAmount, setLoanAmount] = useState("10000");
  const [interestRate, setInterestRate] = useState("3");
  const [loanTerm, setLoanTerm] = useState("12");
  const [shareCapital, setShareCapital] = useState("5000");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [amortization, setAmortization] = useState<AmortRow[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const loan = LOAN_TYPES[selectedLoan];

  const switchLoan = (i: number) => {
    const l = LOAN_TYPES[i];
    setSelectedLoan(i);
    setShowDropdown(false);
    setLoanAmount(l.defaultAmount);
    setInterestRate(l.defaultRate);
    setLoanTerm(l.defaultTerm);
    setMonthlyPayment(null);
    setTotalInterest(null);
    setAmortization([]);
    setHasCalculated(false);
    setErrorMsg(null);
  };

  const validate = (): string | null => {
    const P = parseFloat(loanAmount) || 0;
    const r = parseFloat(interestRate) || 0;
    const n = parseInt(loanTerm) || 0;

    if (P <= 0) return "Please enter a valid loan amount.";
    if (n <= 0) return "Please enter a valid loan term.";

    if (loan.key === "ecash") {
      if (r < 0 || r > 3) return "Interest rate must be between 0% and 3% for E-Cash Loan.";
      if (n > 24) return "Maximum term for E-Cash Loan is 24 months (2 years).";
    }

    if (loan.key === "guaranteed") {
      const sc = parseFloat(shareCapital) || 0;
      if (sc <= 0) return "Please enter a valid share capital amount.";
      const maxLoan = sc * 2;
      if (P > maxLoan)
        return `Maximum loanable amount is ₱${fmt(maxLoan)} (Share Capital × 2).`;
      if (r < 0 || r > 2) return "Interest rate must be between 0% and 2% for Guaranteed Loan.";
      if (n > 24) return "Maximum term for Guaranteed Loan is 24 months (2 years).";
    }

    if (loan.key === "emergency") {
      if (P > 15000) return "Maximum loan amount for Instant/Emergency Loan is ₱15,000.";
      if (n > 3) return "Maximum term for Instant/Emergency Loan is 3 months.";
    }

    return null;
  };

  const calculate = () => {
    const error = validate();
    if (error) {
      setErrorMsg(error);
      setHasCalculated(false);
      return;
    }
    setErrorMsg(null);

    const P = parseFloat(loanAmount);
    const r = loan.key === "emergency" ? 0 : loan.maxRate / 100;
    const n = parseInt(loanTerm);

    let monthly: number;
    if (r === 0) {
      monthly = P / n;
    } else {
      monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPaid = monthly * n;
    const interest = totalPaid - P;

    setMonthlyPayment(parseFloat(monthly.toFixed(2)));
    setTotalInterest(parseFloat(interest.toFixed(2)));

    // Build amortization schedule
    const schedule: AmortRow[] = [];
    let balance = P;
    for (let i = 1; i <= n; i++) {
      const intPaid = balance * r;
      const prinPaid = monthly - intPaid;
      balance -= prinPaid;
      schedule.push({
        month: i,
        payment: parseFloat(monthly.toFixed(2)),
        principal: parseFloat(prinPaid.toFixed(2)),
        interest: parseFloat(intPaid.toFixed(2)),
        balance: parseFloat(Math.max(0, balance).toFixed(2)),
      });
    }

    setAmortization(schedule);
    setHasCalculated(true);
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const termYears = parseInt(loanTerm) > 0
    ? (parseInt(loanTerm) / 12).toFixed(1) + " years"
    : "";

  const P = parseFloat(loanAmount) || 0;
  const n = parseInt(loanTerm) || 0;
  const totalPayment = monthlyPayment !== null ? monthlyPayment * n : null;
  const tableRows = amortization;
  const tableTitle = "Amortization Schedule";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#3A8E0D" }} edges={["top"]}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Hero Header ── */}
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Financial Planning Tool</Text>
          </View>
          <Text style={styles.heroTitle}>Loan Calculator</Text>
          <Text style={styles.heroSubtitle}>
            Estimate your monthly loan payments and plan your finances with our
            easy-to-use calculator.
          </Text>
        </View>

        {/* ── Result Cards ── */}
        <View style={styles.resultRow}>
          <View style={[styles.resultCard, { backgroundColor: BLUE }]}>
            <View style={styles.resultLabelRow}>
              <Ionicons name="wallet-outline" size={13} color="rgba(255,255,255,0.75)" />
              <Text style={styles.resultLabel}>  MONTHLY PAYMENT</Text>
            </View>
            <Text style={styles.resultValue}>
              {monthlyPayment !== null ? `₱${fmt(monthlyPayment)}` : "—"}
            </Text>
          </View>

          <View style={[styles.resultCard, { backgroundColor: PURPLE }]}>
            <View style={styles.resultLabelRow}>
              <Ionicons name="checkmark-circle-outline" size={13} color="rgba(255,255,255,0.75)" />
              <Text style={styles.resultLabel}>  TOTAL INTEREST</Text>
            </View>
            <Text style={styles.resultValue}>
              {totalInterest !== null ? `₱${fmt(totalInterest)}` : "—"}
            </Text>
          </View>
        </View>

        {/* ── Loan Details Form ── */}
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <Ionicons name="list" size={20} color={BLUE} />
            <Text style={styles.formHeaderText}>Loan Details</Text>
          </View>

          <View style={styles.formDivider} />

          {/* Loan Type Dropdown */}
          <Text style={styles.fieldLabel}>Loan Type</Text>
          <TouchableOpacity
            style={styles.dropdown}
            activeOpacity={0.8}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownValue}>{loan.label}</Text>
            <Ionicons
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={18}
              color="#6B7280"
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownMenu}>
              {LOAN_TYPES.map((l, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.dropdownItem, i === selectedLoan && styles.dropdownItemActive]}
                  onPress={() => switchLoan(i)}
                >
                  <Text style={[styles.dropdownItemText, i === selectedLoan && styles.dropdownItemTextActive]}>
                    {l.label}
                  </Text>
                  <Text style={styles.dropdownItemHint}>{l.rateNote}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Info note */}
          <View style={styles.infoNote}>
            <Ionicons name="information-circle" size={14} color={BLUE} style={{ marginRight: 6, flexShrink: 0 }} />
            <Text style={styles.infoNoteText}>{loan.rateNote}</Text>
          </View>

          {loan.collateralNote && (
            <View style={[styles.infoNote, { backgroundColor: AMBER_LIGHT, marginTop: -8 }]}>
              <Ionicons name="alert-circle" size={14} color="#D97706" style={{ marginRight: 6, flexShrink: 0 }} />
              <Text style={[styles.infoNoteText, { color: "#92400E" }]}>{loan.collateralNote}</Text>
            </View>
          )}

          {/* Share Capital — Guaranteed only */}
          {loan.key === "guaranteed" && (
            <>
              <Text style={styles.fieldLabel}>Share Capital (₱)</Text>
              <View style={styles.inputRow}>
                <View style={styles.inputPrefix}>
                  <Text style={styles.inputPrefixText}>₱</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={shareCapital}
                  onChangeText={setShareCapital}
                  keyboardType="numeric"
                  placeholder="e.g. 5000"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <Text style={styles.rateHint}>
                Max loanable: ₱{fmt((parseFloat(shareCapital) || 0) * 2)}
              </Text>
            </>
          )}

          {/* Loan Amount */}
          <Text style={styles.fieldLabel}>
            Loan Amount (₱){loan.maxAmount ? `  ·  Max ₱${loan.maxAmount.toLocaleString()}` : ""}
          </Text>
          <View style={styles.inputRow}>
            <View style={styles.inputPrefix}>
              <Text style={styles.inputPrefixText}>₱</Text>
            </View>
            <TextInput
              style={styles.input}
              value={loanAmount}
              onChangeText={setLoanAmount}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Interest Rate — hidden for emergency, locked for others */}
          {loan.key !== "emergency" && (
            <>
              <Text style={styles.fieldLabel}>Monthly Interest Rate (%)</Text>
              <View style={[styles.inputRow, styles.inputRowLocked]}>
                <View style={styles.inputPrefix}>
                  <Text style={styles.inputPrefixText}>%</Text>
                </View>
                <TextInput
                  style={[styles.input, styles.inputLocked]}
                  value={String(loan.maxRate)}
                  editable={false}
                  placeholderTextColor="#9CA3AF"
                />
                <View style={styles.lockBadge}>
                  <Ionicons name="lock-closed" size={12} color="#6B7280" />
                  <Text style={styles.lockBadgeText}>Fixed</Text>
                </View>
              </View>
            </>
          )}

          {/* Loan Term */}
          <Text style={styles.fieldLabel}>
            Loan Term (months)  ·  Max {loan.maxTermMonths} months
          </Text>
          <View style={styles.inputRow}>
            <View style={styles.inputPrefix}>
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            </View>
            <TextInput
              style={styles.input}
              value={loanTerm}
              onChangeText={setLoanTerm}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          {termYears !== "" && loan.key !== "emergency" && (
            <Text style={styles.termHint}>{termYears}</Text>
          )}

          {/* Error */}
          {errorMsg && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={15} color={RED} style={{ marginRight: 8, flexShrink: 0 }} />
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          )}

          {/* Calculate Button */}
          <TouchableOpacity
            style={styles.calcButton}
            activeOpacity={0.85}
            onPress={calculate}
          >
            <Ionicons name="calculator" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.calcButtonText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {/* ── Payment Summary ── */}
        {hasCalculated && monthlyPayment !== null && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Payment Summary</Text>
            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Loan Type</Text>
              <Text style={styles.summaryValue}>{loan.label}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Loan Amount</Text>
              <Text style={styles.summaryValue}>₱{fmt(P)}</Text>
            </View>
            {loan.key !== "emergency" && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Monthly Interest</Text>
                <Text style={styles.summaryValue}>{interestRate}%</Text>
              </View>
            )}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Loan Term</Text>
              <Text style={styles.summaryValue}>{loanTerm} months</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryHighlightLabel}>Monthly Payment</Text>
              <Text style={styles.summaryHighlightValue}>₱{fmt(monthlyPayment)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <Text style={styles.summaryTitle}>Total Summary</Text>
            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Total Payment</Text>
              <Text style={styles.summaryTotalValue}>
                ₱{totalPayment !== null ? fmt(totalPayment) : "—"}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryInterest}>Total Interest</Text>
              <Text style={styles.summaryInterestValue}>
                ₱{totalInterest !== null ? fmt(totalInterest) : "—"}
              </Text>
            </View>
          </View>
        )}

        {/* ── Amortization Schedule ── */}
        {hasCalculated && tableRows.length > 0 && (
          <View style={styles.amortCard}>
            <Text style={styles.amortTitle}>{tableTitle}</Text>
            <View style={styles.summaryDivider} />

            <View style={styles.amortHeaderRow}>
              <Text style={[styles.amortHeaderCell, { width: 32 }]}>Mo.</Text>
              <Text style={[styles.amortHeaderCell, { flex: 1 }]}>Pmt</Text>
              <Text style={[styles.amortHeaderCell, { flex: 1 }]}>Prin</Text>
              <Text style={[styles.amortHeaderCell, { flex: 1 }]}>Int</Text>
              <Text style={[styles.amortHeaderCell, { flex: 1, textAlign: "right" }]}>Bal</Text>
            </View>

            {tableRows.map((row, i) => (
              <View key={i} style={[styles.amortRow, i % 2 === 0 && styles.amortRowAlt]}>
                <Text style={[styles.amortCell, { width: 32 }]}>{row.month}</Text>
                <Text style={[styles.amortCell, { flex: 1 }]}>₱{fmt(row.payment)}</Text>
                <Text style={[styles.amortCell, { flex: 1 }]}>₱{fmt(row.principal)}</Text>
                <Text style={[styles.amortCell, { flex: 1 }]}>₱{fmt(row.interest)}</Text>
                <Text style={[styles.amortCell, { flex: 1, textAlign: "right" }]}>₱{fmt(row.balance)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ── Disclaimer ── */}
        <View style={styles.disclaimer}>
          <Ionicons
            name="information-circle-outline"
            size={15}
            color="#9CA3AF"
            style={{ marginRight: 6, marginTop: 1 }}
          />
          <Text style={styles.disclaimerText}>
            Results are estimates only. Actual payments may vary based on your loan agreement and cooperative policies.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  /* ── Hero ── */
  hero: {
    backgroundColor: "#3A8E0D",
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 48,
  },
  heroBadge: {
    alignSelf: "flex-start",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.40)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 32,
    fontFamily: "Poppins_800ExtraBold",
    marginBottom: 10,
    lineHeight: 40,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.80)",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    lineHeight: 22,
  },

  /* ── Result Cards ── */
  resultRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
    marginBottom: 20,
  },
  resultCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  resultLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  resultLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 0.5,
  },
  resultValue: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Poppins_800ExtraBold",
    lineHeight: 28,
  },

  /* ── Form Card ── */
  formCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 16,
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  formHeaderText: {
    color: "#111827",
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
  },
  formDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 20,
  },
  fieldLabel: {
    color: "#374151",
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 6,
    backgroundColor: "#FAFAFA",
  },
  dropdownValue: {
    color: "#111827",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 6,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownItemActive: {
    backgroundColor: BLUE_LIGHT,
  },
  dropdownItemText: {
    color: "#374151",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  dropdownItemTextActive: {
    color: BLUE,
    fontFamily: "Poppins_600SemiBold",
  },
  dropdownItemHint: {
    color: "#9CA3AF",
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
    marginTop: 2,
  },
  infoNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: BLUE_LIGHT,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  infoNoteText: {
    color: "#1E40AF",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    flex: 1,
    lineHeight: 18,
  },
  rateHint: {
    color: "#9CA3AF",
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
    marginBottom: 16,
    marginTop: -10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 18,
    overflow: "hidden",
  },
  inputPrefix: {
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  inputPrefixText: {
    color: "#6B7280",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: "#111827",
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  termHint: {
    color: "#9CA3AF",
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
    marginTop: -14,
    marginBottom: 18,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: RED_LIGHT,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  errorText: {
    color: RED,
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    flex: 1,
    lineHeight: 20,
  },
  calcButton: {
    backgroundColor: "#3A8E0D",
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  calcButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },

  /* ── Payment Summary ── */
  summaryCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 16,
  },
  summaryTitle: {
    color: "#111827",
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    marginBottom: 8,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: {
    color: "#6B7280",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  summaryValue: {
    color: "#111827",
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
  },
  summaryHighlightLabel: {
    color: BLUE,
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
  summaryHighlightValue: {
    color: BLUE,
    fontSize: 16,
    fontFamily: "Poppins_800ExtraBold",
  },
  summaryTotalLabel: {
    color: "#111827",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
  summaryTotalValue: {
    color: "#111827",
    fontSize: 16,
    fontFamily: "Poppins_800ExtraBold",
  },
  summaryInterest: {
    color: "#F57C00",
    fontSize: 14,
    fontFamily: "Poppins_700Bold"
  },
  summaryInterestValue: {
    color: "#F57C00",
    fontSize: 16,
    fontFamily: "Poppins_800ExtraBold"
  },

  /* ── Amortization Schedule ── */
  amortCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 16,
  },
  amortTitle: {
    color: "#111827",
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    marginBottom: 14,
  },
  amortHeaderRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    marginBottom: 4,
  },
  amortHeaderCell: {
    color: "#6B7280",
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 0.3,
  },
  amortRow: {
    flexDirection: "row",
    paddingVertical: 8,
    alignItems: "center",
  },
  amortRowAlt: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  amortCell: {
    color: "#374151",
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
  },

  /* ── Disclaimer ── */
  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  disclaimerText: {
    color: "#9CA3AF",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    lineHeight: 18,
    flex: 1,
  },
  inputRowLocked: {
  backgroundColor: "#F3F4F6",
  borderColor: "#E5E7EB",
  },
  inputLocked: {
    color: "#6B7280",
  },
  lockBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
  },
  lockBadgeText: {
    color: "#6B7280",
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
  },
});