import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

export default function AddLoan() {
  const [form, setForm] = useState({
    member: "",
    loanType: "",
    amountRequested: "",
    term: "",
    interestRate: "",
  });
const router = useRouter();
  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Create Loan Application</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* LOAN DETAILS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Loan Application Details</Text>

          <View style={styles.row}>
            <View style={styles.inputBox}>
              <Text style={styles.label}>Member</Text>
              <TextInput
                style={styles.input}
                placeholder="Select member"
                value={form.member}
                onChangeText={(text) => handleChange("member", text)}
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>Loan Type</Text>
              <TextInput
                style={styles.input}
                placeholder="Select type"
                value={form.loanType}
                onChangeText={(text) => handleChange("loanType", text)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputBox}>
              <Text style={styles.label}>Amount Requested</Text>
              <TextInput
                style={styles.input}
                placeholder="₱ 0"
                keyboardType="numeric"
                value={form.amountRequested}
                onChangeText={(text) =>
                  handleChange("amountRequested", text)
                }
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>Term (Months)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={form.term}
                onChangeText={(text) => handleChange("term", text)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputBox}>
              <Text style={styles.label}>Interest Rate</Text>
              <TextInput
                style={styles.input}
                placeholder="%"
                keyboardType="numeric"
                value={form.interestRate}
                onChangeText={(text) =>
                  handleChange("interestRate", text)
                }
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>Loan Status</Text>
              <TextInput
                style={styles.input}
                placeholder="Pending"
                editable={false}
              />
            </View>
          </View>
        </View>

        {/* BASIC INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.row}>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>—</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>—</Text>
            </View>
          </View>
        </View>

        {/* CONTACT */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.row}>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Mobile</Text>
              <Text style={styles.value}>—</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>—</Text>
            </View>
          </View>
        </View>

        {/* EMPLOYMENT */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Employment & Identification
          </Text>
          <View style={styles.row}>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Occupation</Text>
              <Text style={styles.value}>—</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.label}>Monthly Income</Text>
              <Text style={styles.value}>—</Text>
            </View>
          </View>
        </View>

        {/* BUTTON */}
       <TouchableOpacity
               style={styles.addBtn}
               onPress={() => router.push("/account-officer/add_loan/cash_flow_form")}
             >
               <Text style={styles.addBtnText}>Next</Text>
             </TouchableOpacity>
      </ScrollView>
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

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -28,
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

  infoBox: {
    width: "48%",
    marginBottom: 10,
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