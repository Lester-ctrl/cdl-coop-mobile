import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

export default function CashFlowForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    salary: "",
    business_income: "",
    remittances: "",
    other_income: "",
    living_expenses: "",
    business_expenses: "",
    existing_loan_payments: "",
    other_expenses: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const num = (v: string) => Number(v || 0);

  const totalIncome =
    num(form.salary) +
    num(form.business_income) +
    num(form.remittances) +
    num(form.other_income);

  const totalExpenses =
    num(form.living_expenses) +
    num(form.business_expenses) +
    num(form.existing_loan_payments) +
    num(form.other_expenses);

  const netCashflow = totalIncome - totalExpenses;

  const submit = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER (same style as AddLoan) */}
      <View style={styles.header}>
        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push("/account-officer/add_loan/add_loan")}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Cash Flow Form</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* INCOME */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Income</Text>

          <View style={styles.row}>
            <Input
              label="Salary"
              value={form.salary}
              onChange={(v) => handleChange("salary", v)}
            />
            <Input
              label="Business Income"
              value={form.business_income}
              onChange={(v) => handleChange("business_income", v)}
            />
          </View>

          <View style={styles.row}>
            <Input
              label="Remittances"
              value={form.remittances}
              onChange={(v) => handleChange("remittances", v)}
            />
            <Input
              label="Other Income"
              value={form.other_income}
              onChange={(v) => handleChange("other_income", v)}
            />
          </View>
        </View>

        {/* EXPENSES */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Expenses</Text>

          <View style={styles.row}>
            <Input
              label="Living Expenses"
              value={form.living_expenses}
              onChange={(v) => handleChange("living_expenses", v)}
            />
            <Input
              label="Business Expenses"
              value={form.business_expenses}
              onChange={(v) => handleChange("business_expenses", v)}
            />
          </View>

          <View style={styles.row}>
            <Input
              label="Loan Payments"
              value={form.existing_loan_payments}
              onChange={(v) =>
                handleChange("existing_loan_payments", v)
              }
            />
            <Input
              label="Other Expenses"
              value={form.other_expenses}
              onChange={(v) => handleChange("other_expenses", v)}
            />
          </View>
        </View>

        {/* SUMMARY */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Summary</Text>

          <Text style={styles.value}>
            Total Income: ₱{totalIncome}
          </Text>
          <Text style={styles.value}>
            Total Expenses: ₱{totalExpenses}
          </Text>
          <Text
            style={[
              styles.value,
              { color: netCashflow >= 0 ? "#099a1c" : "red" },
            ]}
          >
            Net Cashflow: ₱{netCashflow}
          </Text>
        </View>

        {/* SUBMIT BUTTON */}
        <TouchableOpacity style={styles.addBtn} onPress={submit}>
          <Text style={styles.addBtnText}>Submit</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* INPUT */
const Input = ({ label, value, onChange }: any) => (
  <View style={styles.inputBox}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      keyboardType="numeric"
      placeholder="0"
      style={styles.input}
    />
  </View>
);

/* STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f6fb" },

  header: {
    backgroundColor: "#099a1c",
    padding: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backBtn: {
    position: "absolute",
    top: 20,
    left: 15,
  },

  backText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -10,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 16,
    padding: 15,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#099a1c",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputBox: {
    width: "48%",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
  },

  label: {
    fontSize: 10,
    color: "#888",
    fontWeight: "600",
  },

  value: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },

  addBtn: {
    backgroundColor: "#099a1c",
    alignSelf: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 20,
  },

  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});