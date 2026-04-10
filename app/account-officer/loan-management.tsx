import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Base_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function LoansScreen() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigation();

  const fetchLoans = async () => {
    try {
      const response = await fetch(`${Base_URL}/loan/all`);
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || "Failed to fetch loans");
      setLoans(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved": return "green";
      case "pending": return "orange";
      case "rejected": return "red";
      default: return "#555";
    }
  };

  const filteredLoans = loans.filter((loan) =>
    (loan.member_name || "").toLowerCase().includes(searchText.toLowerCase())
  );

  const renderLoan = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.cell, styles.link]}
        onPress={() =>
          navigation.navigate("loanedit", { loanId: item.loan_application_id })
        }
      >
        <Text>{item.member_name}</Text>
      </TouchableOpacity>

      <Text style={styles.cell}>{item.loan_type}</Text>
      <Text style={styles.cell}>₱{item.amount_requested}</Text>
      <Text style={[styles.cell, { color: getStatusColor(item.loan_status) }]}>
        {item.loan_status}
      </Text>
      <Text style={styles.cell}>{item.term_months} mo</Text>
      <Text style={styles.cell}>{item.release_date || "Pending"}</Text>
    </View>
  );

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.center}>
      <Text style={{ color: "red" }}>{error}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Loan Management</Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search member..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.cell}>Member</Text>
            <Text style={styles.cell}>Type</Text>
            <Text style={styles.cell}>Amount</Text>
            <Text style={styles.cell}>Status</Text>
            <Text style={styles.cell}>Term</Text>
            <Text style={styles.cell}>Release</Text>
          </View>

          <FlatList
            data={filteredLoans}
            keyExtractor={(i) => i.loan_application_id.toString()}
            renderItem={renderLoan}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f6fb" },
  header: { backgroundColor: "#099a1c", padding: 50, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", flex: 1, textAlign: "center", marginTop: -28 },
  search: { backgroundColor: "#fff", margin: 15, padding: 10, borderRadius: 10 },
  table: { margin: 10, backgroundColor: "#fff", borderRadius: 10 },
  headerRow: { flexDirection: "row", backgroundColor: "#eee", padding: 10 },
  row: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderColor: "#eee" },
  cell: { flex: 1, textAlign: "center", fontSize: 12 },
  link: { color: "blue", fontWeight: "bold" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});