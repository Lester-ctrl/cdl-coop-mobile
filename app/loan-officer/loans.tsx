import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const loans = [
  {
    id: 1,
    member: "Juan Dela Cruz",
    balance: "₱8,000",
    status: "Active",
    overdue: false,
  },
  {
    id: 2,
    member: "Maria Santos",
    balance: "₱0",
    status: "Completed",
    overdue: false,
  },
  {
    id: 3,
    member: "Pedro Reyes",
    balance: "₱15,000",
    status: "Active",
    overdue: true,
  },
];

export default function Loans() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Loans Management</Text>
        <Text style={styles.subtitle}>
          Monitor, restructure, and track member loans.
        </Text>
        {loans.map((loan) => (
          <View key={loan.id} style={styles.loanBox}>
            <View style={styles.loanInfo}>
              <Text style={styles.member}>{loan.member}</Text>
              <Text style={styles.balance}>{loan.balance}</Text>
              <Text
                style={[
                  styles.status,
                  loan.status === "Active" && styles.statusActive,
                  loan.status === "Completed" && styles.statusCompleted,
                  loan.overdue && styles.statusOverdue,
                ]}
              >
                {loan.overdue ? "Overdue" : loan.status}
              </Text>
            </View>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>View Payments</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.restructureBtn]}
              >
                <Text style={[styles.actionText, styles.restructureText]}>
                  Restructure
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.penaltyBtn]}>
                <Text style={[styles.actionText, styles.penaltyText]}>
                  Recommend Penalty Waiver
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  balance: {
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
  statusActive: {
    backgroundColor: "#dbeafe",
    color: "#2563eb",
  },
  statusCompleted: {
    backgroundColor: "#bbf7d0",
    color: "#065f46",
  },
  statusOverdue: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    flexWrap: "wrap",
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
  restructureBtn: {
    backgroundColor: "#fef9c3",
  },
  restructureText: {
    color: "#b45309",
  },
  penaltyBtn: {
    backgroundColor: "#f1f5f9",
  },
  penaltyText: {
    color: "#1c3faa",
  },
});
