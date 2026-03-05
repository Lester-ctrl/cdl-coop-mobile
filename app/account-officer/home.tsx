import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AccountOfficerHome() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.greeting}>Hello, Account Officer 👋</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>Co-op Staff</Text>
        </View>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>
          Manage member accounts, monitor savings, and assist with membership.
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>120</Text>
            <Text style={styles.statLabel}>Active Members</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Pending Applications</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>View Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>Add New Member</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f6fb",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 28,
    width: "100%",
    maxWidth: 370,
    shadowColor: "#1c3faa",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    alignItems: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1c3faa",
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: "#e0e7ff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 12,
  },
  roleText: {
    color: "#3b82f6",
    fontWeight: "700",
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#22223b",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 18,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 18,
  },
  statBox: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1c3faa",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  actionBtn: {
    backgroundColor: "#1c3faa",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 6,
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  secondaryBtn: {
    backgroundColor: "#e0e7ff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 2,
  },
  secondaryText: {
    color: "#1c3faa",
    fontWeight: "600",
    fontSize: 14,
  },
});
