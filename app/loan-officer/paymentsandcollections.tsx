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

const payments = [
  {
    id: 1,
    member: "Anna Villanueva",
    amount: 2500,
    date: "2026-03-01",
    type: "Partial",
  },
  {
    id: 2,
    member: "Carlos Mendoza",
    amount: 1200,
    date: "2026-02-20",
    type: "Full",
  },
];

export default function PaymentsAndCollections() {
  const [member, setMember] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Partial");
  const [records, setRecords] = useState(payments);

  const handleAddPayment = () => {
    if (!member || !amount) return;
    setRecords([
      ...records,
      {
        id: records.length + 1,
        member,
        amount: parseFloat(amount),
        date: new Date().toISOString().slice(0, 10),
        type,
      },
    ]);
    setMember("");
    setAmount("");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={["#1e3a8a", "#2563eb", "#3b82f6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Payments & Collections</Text>
        <Text style={styles.headerSubtitle}>
          Record and view member payments and collections.
        </Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Payment</Text>
        <TextInput
          style={styles.input}
          placeholder="Member Name"
          value={member}
          onChangeText={setMember}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddPayment}>
          <Text style={styles.buttonText}>Record Payment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Records</Text>
        {records.map((rec) => (
          <View key={rec.id} style={styles.card}>
            <Text style={styles.cardTitle}>{rec.member}</Text>
            <Text style={styles.cardDate}>{rec.date}</Text>
            <Text style={styles.cardDesc}>
              Amount: ₱{rec.amount} ({rec.type})
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtitle: { fontSize: 16, color: "#e0e7ef" },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#2563eb" },
  cardDate: { fontSize: 14, color: "#64748b", marginBottom: 4 },
  cardDesc: { fontSize: 14, color: "#334155" },
});
