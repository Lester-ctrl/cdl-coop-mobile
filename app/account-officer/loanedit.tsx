import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getLoanEdit } from "@/api/accountofficer/loanedit";

export default function LoanDetailScreen() {
  const { loanId } = useLocalSearchParams();

  const [loan, setLoan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLoan() {
      try {
        if (!loanId) return;

        const id = Number(loanId); // ensure number
        console.log("LOAN ID:", id);

        const data = await getLoanEdit(id);

        console.log("API DATA:", data);

        // ✅ Handle array or object
        if (Array.isArray(data)) {
          // take first loan from array if exists
          setLoan(data[0] || null);
        } else {
          setLoan(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLoan();
  }, [loanId]);

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

  if (!loan) {
    return (
      <View style={styles.center}>
        <Text>No data found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.section}>Member Info</Text>
      <Text>Name: {loan.member?.full_name || "-"}</Text>
      <Text>Birthdate: {loan.member?.birthdate || "-"}</Text>
      <Text>Age: {loan.member?.age || "-"}</Text>
      <Text>Sex: {loan.member?.sex || "-"}</Text>
      <Text>Civil Status: {loan.member?.civil_status || "-"}</Text>
      <Text>TIN: {loan.member?.tin || "-"}</Text>
      <Text>Mobile: {loan.member?.mobile_number || "-"}</Text>
      <Text>Email: {loan.member?.email || "-"}</Text>
      <Text>Address: {loan.member?.address || "-"}</Text>
      <Text>Member No: {loan.member?.member_no || "-"}</Text>
      <Text>Membership Type: {loan.member?.membership_type || "-"}</Text>

      <Text style={styles.section}>Loan Type</Text>
      <Text>Name: {loan.loan_type?.name || "-"}</Text>
      <Text>Max Term: {loan.loan_type?.max_term_months || "-"} months</Text>
      <Text>Max Interest Rate: {loan.loan_type?.max_interest_rate || "-"}%</Text>

      <Text style={styles.section}>Loan Details</Text>
      <Text>Amount Requested: ₱{loan.loan_details?.amount_requested || 0}</Text>
      <Text>Coop Fee Total: ₱{loan.loan_details?.coop_fee_total || 0}</Text>
      <Text>Net Release Amount: ₱{loan.loan_details?.net_release_amount || 0}</Text>
      <Text>Term: {loan.loan_details?.term_months || "-"} months</Text>
      <Text>Status: {loan.loan_details?.status || "-"}</Text>

      <Text style={styles.section}>Cashflow</Text>
      <Text>Salary: ₱{loan.cashflow?.salary || 0}</Text>
      <Text>Business Income: ₱{loan.cashflow?.business_income || 0}</Text>
      <Text>Living Expenses: ₱{loan.cashflow?.living_expenses || 0}</Text>
      <Text>Existing Loan Payments: ₱{loan.cashflow?.existing_loan_payments || 0}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f3f6fb" },
  section: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
    color: "#099a1c",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});