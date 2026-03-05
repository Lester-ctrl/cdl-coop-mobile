import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const applications = [
  { id: 1, member: "Juan Dela Cruz", amount: "₱20,000", status: "Pending" },
  { id: 2, member: "Maria Santos", amount: "₱10,000", status: "For Review" },
  { id: 3, member: "Pedro Reyes", amount: "₱30,000", status: "Recommended" },
];

export default function Applications() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Loan Applications</Text>
        <Text style={styles.subtitle}>
          Review, approve, recommend, or reject member loan requests.
        </Text>
        {applications.map((app) => (
          <View key={app.id} style={styles.appBox}>
            <View style={styles.appInfo}>
              <Text style={styles.member}>{app.member}</Text>
              <Text style={styles.amount}>{app.amount}</Text>
              <Text
                style={[
                  styles.status,
                  app.status === "Pending" && styles.statusPending,
                  app.status === "Recommended" && styles.statusRecommended,
                ]}
              >
                {app.status}
              </Text>
            </View>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>Review</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.approveBtn]}>
                <Text style={[styles.actionText, styles.approveText]}>
                  Approve
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.recommendBtn]}>
                <Text style={[styles.actionText, styles.recommendText]}>
                  Recommend
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]}>
                <Text style={[styles.actionText, styles.rejectText]}>
                  Reject
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
  appBox: {
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
  appInfo: {
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
  statusPending: {
    backgroundColor: "#fde68a",
    color: "#b45309",
  },
  statusRecommended: {
    backgroundColor: "#bbf7d0",
    color: "#065f46",
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
  approveBtn: {
    backgroundColor: "#d1fae5",
  },
  approveText: {
    color: "#065f46",
  },
  recommendBtn: {
    backgroundColor: "#e0e7ff",
  },
  recommendText: {
    color: "#1c3faa",
  },
  rejectBtn: {
    backgroundColor: "#fee2e2",
  },
  rejectText: {
    color: "#b91c1c",
  },
});
