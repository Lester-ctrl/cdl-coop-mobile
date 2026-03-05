import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const members = [
  { id: 1, name: "Juan Dela Cruz", savings: "₱5,000", status: "Active" },
  { id: 2, name: "Maria Santos", savings: "₱8,200", status: "Active" },
  { id: 3, name: "Pedro Reyes", savings: "₱2,500", status: "Pending" },
];

export default function Accounts() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Accounts Management</Text>
        <Text style={styles.subtitle}>
          View, update, and manage member accounts.
        </Text>
        {members.map((m) => (
          <View key={m.id} style={styles.memberBox}>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{m.name}</Text>
              <Text style={styles.savings}>{m.savings}</Text>
              <Text
                style={[
                  styles.status,
                  m.status === "Pending" && styles.statusPending,
                ]}
              >
                {m.status}
              </Text>
            </View>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.updateBtn]}
                onPress={() => console.log("Update clicked")}
              >
                <Text style={[styles.actionText, styles.updateText]}>
                  Update
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
  memberBox: {
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
  memberInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  memberName: {
    fontWeight: "600",
    color: "#22223b",
    fontSize: 15,
    flex: 1,
  },
  savings: {
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
  updateBtn: {
    backgroundColor: "#d1fae5",
  },
  updateText: {
    color: "#065f46",
  },
});
