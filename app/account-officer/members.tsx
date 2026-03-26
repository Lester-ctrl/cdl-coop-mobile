import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const loanApplications = [
  {
    id: 1,
    member: "Juan Dela Cruz",
    amount: "₱20,000",
    interest: "8%",
    months: 12,
    status: "Pending",
    payments: [
      { id: 1, date: "2026-03-01", amount: "₱2,000" },
      { id: 2, date: "2026-04-01", amount: "₱2,000" },
    ],
  },
];

export default function LoanOfficerLoanManagement() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Members</Text>
        
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f3f6fb",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    shadowColor: "#1c3faa",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1c3faa",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 18,
    textAlign: "center",
  },
  loanBox: {
    backgroundColor: "#f1f5f9",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#1c3faa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  loanInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  member: {
    fontWeight: "600",
    color: "#22223b",
    fontSize: 15,
    flex: 1,
  },
  amount: {
    color: "#1c3faa",
    fontWeight: "700",
    fontSize: 15,
    marginHorizontal: 8,
  },
  status: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: "#e0e7ff",
  },
  termsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 8,
  },
  termField: {
    flex: 1,
    alignItems: "center",
  },
  termLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 2,
  },
  termInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e7ff",
    padding: 6,
    width: "100%",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    color: "#1c3faa",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginBottom: 8,
  },
  actionBtn: {
    backgroundColor: "#e0e7ff",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginLeft: 6,
    marginTop: 4,
  },
  actionText: {
    color: "#1c3faa",
    fontWeight: "600",
    fontSize: 13,
  },
  approveBtn: {
    backgroundColor: "#d1fae5",
  },
  approveText: {
    color: "#065f46",
  },
  rejectBtn: {
    backgroundColor: "#fee2e2",
  },
  rejectText: {
    color: "#b91c1c",
  },
  paymentsSection: {
    marginTop: 10,
  },
  paymentsTitle: {
    fontWeight: "700",
    color: "#22223b",
    fontSize: 14,
    marginBottom: 6,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  paymentDate: {
    color: "#6b7280",
    fontSize: 12,
  },
  paymentAmount: {
    color: "#1c3faa",
    fontWeight: "600",
    fontSize: 12,
  },
  partialPaymentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  partialPaymentInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e7ff",
    padding: 6,
    flex: 1,
    fontSize: 13,
    color: "#1c3faa",
  },
  recordBtn: {
    backgroundColor: "#1c3faa",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  recordText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});
