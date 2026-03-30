import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
const members = [
  { id: 1, name: "Juan Dela Cruz", savings: "₱5,000", status: "Active" },
  { id: 2, name: "Maria Santos", savings: "₱8,200", status: "Active" },
  { id: 3, name: "Pedro Reyes", savings: "₱2,500", status: "Pending" },
];

export default function Accounts() {
  return (
    <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
            <View style={styles.header}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <View style={{ flex: 1 }}>
                   <Text style={styles.title}>Accounts Management</Text>
        <Text style={styles.subtitle}>
          View, update, and manage member accounts.
        </Text>
                </View>
              </View>
            </View>
            
            
      <View style={styles.card}>
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
         {/* Reports Section */}
      <View style={{ marginTop: 30 }}>
        <Text style={styles.sectionTitle}>Member</Text>

        <TouchableOpacity
          style={styles.gridItem}
          activeOpacity={0.7}
          onPress={() => router.push("/account-officer/members")}
        >
          <View style={styles.iconBox}>
            <Ionicons name="person-outline" size={28} color="#0d8147" />
          </View>
          <Text style={styles.gridText}>Member</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 24,
    backgroundColor: "#099a1c",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 80,
    position: "relative",
    zIndex: 200,
  },
  greeting: {
    color: "#93c5fd",
    fontSize: 14,
    fontWeight: "500",
  },
  container: {
    padding: 0,
    backgroundColor: "#f3f6fb",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: "95%",
    alignSelf: "center",
    shadowColor: "#1c3faa",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    marginTop: -60,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#e9eaeb",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#dfe1e4",
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
  gridItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  iconBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 8,
  },
  gridText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0a2708",
    textAlign: "center",
  },
    sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 12,
  },
});
