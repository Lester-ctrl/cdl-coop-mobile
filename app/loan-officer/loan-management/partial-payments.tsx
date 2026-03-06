import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// Example partial payments data
const partialPayments = [
  { id: 1, member: "Anna Villanueva", amount: 2500, date: "2026-03-01" },
  { id: 2, member: "Carlos Mendoza", amount: 1200, date: "2026-02-20" },
];

export default function PartialPayments() {
  const [member, setMember] = useState("");
  const [amount, setAmount] = useState("");
  const [payments, setPayments] = useState(partialPayments);
  const [search, setSearch] = useState("");

  const handleAddPayment = () => {
    if (!member || !amount) return;
    setPayments([
      ...payments,
      {
        id: payments.length + 1,
        member,
        amount: parseFloat(amount),
        date: new Date().toISOString().slice(0, 10),
      },
    ]);
    setMember("");
    setAmount("");
  };

  // Filter payments by search
  const filteredPayments = payments.filter((p) =>
    p.member.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient
        colors={["#1e3a8a", "#2563eb", "#3b82f6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Partial Payments</Text>
        <Text style={styles.headerSubtitle}>
          View and record partial loan payments from members.
        </Text>
      </LinearGradient>

      {/* ADD PAYMENT CARD */}
      <View style={styles.addCard}>
        <Text style={styles.addTitle}>Record Partial Payment</Text>
        {/* SEARCH BAR AT BOTTOM */}
        <View style={styles.searchBarContainer}>
          <FontAwesome6 name="magnifying-glass" size={18} color="#2563eb" />
          <TextInput
            style={styles.searchBar}
            placeholder="Search member name..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Member name"
            value={member}
            onChangeText={setMember}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount ₱"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAddPayment}>
            <FontAwesome6 name="circle-plus" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* PAYMENT LIST */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Recent Partial Payments</Text>
        {filteredPayments.length === 0 ? (
          <Text style={styles.noResult}>No partial payments recorded.</Text>
        ) : (
          filteredPayments.map((p) => (
            <View key={p.id} style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <Text style={styles.memberName}>{p.member}</Text>
                <Text style={styles.paymentDate}>{p.date}</Text>
              </View>
              <Text style={styles.amountText}>
                Amount:{" "}
                <Text style={styles.amountValue}>
                  ₱{p.amount.toLocaleString()}
                </Text>
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f7ff",
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
  },
  headerSubtitle: {
    color: "#dbeafe",
    marginTop: 6,
    fontSize: 14,
  },
  addCard: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginTop: -25,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  addTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#2563eb",
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 8,
    fontSize: 14,
  },
  addBtn: {
    width: 48,
    height: 48,
    backgroundColor: "#2563eb",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  listSection: {
    paddingHorizontal: 18,
    marginTop: 18,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: "#1e3a8a",
    marginBottom: 10,
  },
  noResult: {
    textAlign: "center",
    marginTop: 20,
    color: "#2563eb",
    fontWeight: "600",
  },
  paymentCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  memberName: {
    fontWeight: "700",
    fontSize: 15,
    color: "#22223b",
  },
  paymentDate: {
    fontSize: 13,
    color: "#6b7280",
  },
  amountText: {
    fontSize: 14,
    color: "#475569",
  },
  amountValue: {
    fontWeight: "800",
    color: "#1e3a8a",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginBottom: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  searchBar: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
});
