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
        type: "Partial",
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
          Record and track member collections
        </Text>
      </LinearGradient>

      {/* ADD PAYMENT */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Payment</Text>

        <TextInput
          style={styles.input}
          placeholder="Member Name"
          value={member}
          onChangeText={setMember}
          placeholderTextColor="#94a3b8"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholderTextColor="#94a3b8"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleAddPayment}
        >
          <LinearGradient
            colors={["#2563eb", "#3b82f6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>+ Record Payment</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* RECORDS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Records</Text>

        {records.map((rec) => (
          <View key={rec.id} style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle}>{rec.member}</Text>
              <Text style={styles.amount}>₱{rec.amount}</Text>
            </View>

            <View style={styles.cardBottom}>
              <Text style={styles.cardDate}>{rec.date}</Text>
              <View style={styles.typeBadge}>
                <Text style={styles.typeText}>{rec.type}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  header: {
    padding: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },

  headerSubtitle: {
    fontSize: 15,
    color: "#dbeafe",
  },

  section: {
    paddingHorizontal: 18,
    marginBottom: 26,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: 14,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },

  button: {
    marginTop: 6,
    borderRadius: 12,
    overflow: "hidden",
  },

  buttonGradient: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e3a8a",
  },

  amount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2563eb",
  },

  cardDate: {
    fontSize: 13,
    color: "#64748b",
  },

  typeBadge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1e40af",
  },
});
