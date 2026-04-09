import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

const Base_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function LoansScreen() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState("");

  // MODAL
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanLoading, setLoanLoading] = useState(false);

  // FETCH ALL
  const fetchLoans = async () => {
    try {
      const response = await fetch(`${Base_URL}/loan/all`);
      const json = await response.json();

      if (!response.ok) throw new Error(json.message);

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

  // CLICK
  const handleLoanPress = async (id) => {
    setModalVisible(true);
    setLoanLoading(true);
    setSelectedLoan(null);

    try {
      const response = await fetch(`${Base_URL}/loan/${id}`);
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (!response.ok) throw new Error(data?.message);

      setSelectedLoan(data);
    } catch (err) {
      setSelectedLoan({ error: err.message });
    } finally {
      setLoanLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "green";
      case "pending":
        return "orange";
      case "rejected":
        return "red";
      default:
        return "#555";
    }
  };

  const filteredLoans = loans.filter((loan) =>
    (loan.member_name || "")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const renderLoan = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => handleLoanPress(item.loan_application_id)}
    >
      <Text style={[styles.cell, styles.link]}>
        {item.member_name}
      </Text>
      <Text style={styles.cell}>{item.loan_type}</Text>
      <Text style={styles.cell}>₱{item.amount_requested}</Text>
      <Text style={[styles.cell, { color: getStatusColor(item.loan_status) }]}>
        {item.loan_status}
      </Text>
      <Text style={styles.cell}>{item.term_months} mo</Text>
      <Text style={styles.cell}>
        {item.release_date || "Pending"}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Loan Management</Text>
      </View>

      {/* SEARCH */}
      <TextInput
        style={styles.search}
        placeholder="Search member..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* TABLE */}
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

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modal}>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.close}>Close</Text>
            </Pressable>

            {loanLoading && <Text>Loading...</Text>}

            {selectedLoan?.error && (
              <Text style={{ color: "red" }}>{selectedLoan.error}</Text>
            )}

            {selectedLoan && !loanLoading && !selectedLoan.error && (
              <ScrollView>
                <Text style={styles.modalTitle}>
                  {selectedLoan.member_name}
                </Text>

                {/* BASIC */}
                <Text>Loan Type: {selectedLoan.loan_type}</Text>
                <Text>Amount: ₱{selectedLoan.amount_requested}</Text>
                <Text>Term: {selectedLoan.term_months} months</Text>
                <Text>Status: {selectedLoan.loan_status}</Text>
                <Text>Purpose: {selectedLoan.purpose}</Text>

                {/* CASHFLOW */}
                <Text style={styles.section}>Income</Text>
                <Text>Salary: ₱{selectedLoan.salary}</Text>
                <Text>Business: ₱{selectedLoan.business_income}</Text>

                <Text style={styles.section}>Expenses</Text>
                <Text>Living: ₱{selectedLoan.living_expenses}</Text>
                <Text>Loans: ₱{selectedLoan.existing_loan_payments}</Text>

                {/* FEES */}
                <Text style={styles.section}>Fees</Text>
                <Text>Processing: ₱{selectedLoan.processing_fee}</Text>
                <Text>Insurance: ₱{selectedLoan.insurance_fee}</Text>
                <Text>Total Fees: ₱{selectedLoan.coop_fee_total}</Text>
                <Text>
                  Net Release: ₱{selectedLoan.net_release_amount}
                </Text>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f6fb" },

  header: {
    backgroundColor: "#099a1c",
    padding: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  title: { color: "#fff", fontSize: 22, 
    fontWeight: "bold", flex: 1, 
    textAlign: "center",
    marginTop: -28,
  

  },

  search: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 10,
    borderRadius: 10,
  },

  table: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  headerRow: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding:10,
  },

  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  cell: { flex: 1, textAlign: "center" ,
    fontSize: 12,

  },

  link: { color: "blue", fontWeight: "bold" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  modalBg: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
  },

  close: {
    alignSelf: "flex-end",
    color: "#fff",
    marginBottom: 10,
    backgroundColor: "#17158a",
    padding: 8,
    borderRadius: 10,

    
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  section: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#099a1c",
  },
});