import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const Base_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function LoansScreen() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const fetchLoans = async () => {
    try {
      const response = await fetch(`${Base_URL}/loan/all`);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to fetch loans");
      }

      setLoans(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const getStatusColor = (status: string) => {
    switch ((status || "").toLowerCase()) {
      case "approved":
        return "#099a1c";
      case "pending":
        return "#f59e0b";
      case "rejected":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const filteredLoans = loans.filter((loan) =>
    (loan.member_name || "")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const renderLoan = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/account-officer/loans_edit/loanedit",
          params: { loanId: item.loan_application_id },
        })
      }
    >
      {/* HEADER */}
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.name}>{item.member_name}</Text>
          <Text style={styles.subtitle}>{item.loan_type}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.loan_status) },
          ]}
        >
          <Text style={styles.statusText}>
            {item.loan_status?.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* BODY */}
      <View style={styles.cardBody}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>AMOUNT</Text>
          <Text style={styles.value}>
            ₱{Number(item.amount_requested || 0).toLocaleString()}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>TERM</Text>
          <Text style={styles.value}>
            {item.term_months || "-"} Months
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>RELEASE DATE</Text>
          <Text style={styles.value}>
            {item.release_date || "Pending"}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.value}>
            #{item.loan_application_id}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#099a1c" />
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

      {/* ADD LOAN BUTTON */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/account-officer/add_loan/add_loan")}
      >
        <Text style={styles.addBtnText}>+ New Loan Application</Text>
      </TouchableOpacity>

      {/* SEARCH */}
      <TextInput
        style={styles.search}
        placeholder="Search member..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* LIST */}
      <FlatList
        data={filteredLoans}
        keyExtractor={(item) =>
          item.loan_application_id.toString()
        }
        renderItem={renderLoan}
        showsVerticalScrollIndicator={false}
      />
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

addBtn: {
  backgroundColor: "#099a1c",
 alignSelf: "flex-end" ,  
  paddingVertical: 8,    
  paddingHorizontal: 16, 
  borderRadius: 8,
  marginBottom: 30,
  marginTop: 10,
},

  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  search: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 12,
    borderRadius: 16,
    padding: 15,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },

  subtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  cardBody: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});