import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Tab = createBottomTabNavigator();

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function Loans() {
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchLoans = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/loan-applications`);
      if (!res.ok) throw new Error("Failed to fetch loan applications");
      const data = await res.json();
      setLoans(data.data || []);
      setFilteredLoans(data.data || []);
    } catch (err) {
      setError(err.message || "Error fetching loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchLoans();
    setRefreshing(false);
  };

  useEffect(() => {
    // Filter by name and range
    let result = loans;
    if (search) {
      result = result.filter((loan) => {
        const firstName = loan.member?.profile?.first_name || "";
        const lastName = loan.member?.profile?.last_name || "";
        const fullName = `${firstName} ${lastName}`.toLowerCase();
        return fullName.includes(search.toLowerCase());
      });
    }
    const minVal = min ? parseInt(min, 10) : 0;
    const maxVal = max ? parseInt(max, 10) : Infinity;
    result = result.filter((loan) => {
      const bal = loan.loanAccount?.balance || 0;
      return bal >= minVal && bal <= maxVal;
    });
    setFilteredLoans(result);
  }, [search, min, max, loans]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {/* HEADER */}
      <LinearGradient
        colors={["#1e3a8a", "#2563eb", "#3b82f6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Loan Applications</Text>
        <Text style={styles.headerSubtitle}>
          Search and manage member loan applications
        </Text>
      </LinearGradient>

      {/* FILTER CARD */}
      <View style={styles.filterCard}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search member name..."
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.rangeRow}>
          <TextInput
            style={styles.rangeInput}
            placeholder="Min ₱"
            keyboardType="numeric"
            value={min}
            onChangeText={setMin}
          />
          <TextInput
            style={[styles.rangeInput, { marginRight: 0 }]}
            placeholder="Max ₱"
            keyboardType="numeric"
            value={max}
            onChangeText={setMax}
          />
        </View>
      </View>

      {/* LOAN APPLICATION LIST */}
      <View style={styles.loanList}>
        {loading ? (
          <Text style={styles.noResult}>Loading...</Text>
        ) : error ? (
          <Text style={[styles.noResult, { color: "#dc2626" }]}>{error}</Text>
        ) : filteredLoans.length === 0 ? (
          <Text style={styles.noResult}>No loan applications found</Text>
        ) : (
          filteredLoans.map((loan) => (
            <View key={loan.loan_application_id} style={styles.loanCard}>
              <View style={styles.loanHeader}>
                <Text style={styles.memberName}>
                  {loan.member?.profile?.first_name &&
                  loan.member?.profile?.last_name
                    ? `${loan.member.profile.first_name} ${loan.member.profile.last_name}`
                    : "Unknown Member"}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    loan.loanAccount?.is_overdue
                      ? styles.badgeOverdue
                      : styles.badgeActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      loan.loanAccount?.is_overdue
                        ? { color: "#dc2626" }
                        : { color: "#2563eb" },
                    ]}
                  >
                    {loan.loanAccount?.is_overdue ? "Overdue" : "Active"}
                  </Text>
                </View>
              </View>

              <Text style={styles.balance}>
                Balance:{" "}
                <Text style={styles.balanceAmount}>
                  ₱
                  {(
                    loan.loanAccount?.balance ||
                    loan.amount_requested ||
                    0
                  ).toLocaleString()}
                </Text>
              </Text>

              <Text style={[styles.badgeText, { marginTop: 8 }]}>
                Status: {loan.status || "Pending"}
              </Text>

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.primaryBtn}>
                  <Text style={styles.primaryBtnText}>View Payments</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>Restructure</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ghostBtn}>
                  <Text style={styles.ghostBtnText}>Penalty Waiver</Text>
                </TouchableOpacity>
              </View>
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

  filterCard: {
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

  searchInput: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  rangeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  rangeInput: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 8,
  },

  filterBtn: {
    width: 48,
    height: 48,
    backgroundColor: "#2563eb",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  filterText: {
    color: "#fff",
    fontWeight: "700",
  },

  loanList: {
    paddingHorizontal: 18,
    marginTop: 18,
    paddingBottom: 30,
  },

  noResult: {
    textAlign: "center",
    marginTop: 40,
    color: "#2563eb",
    fontWeight: "600",
  },

  loanCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  loanHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  memberName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e293b",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  badgeActive: {
    backgroundColor: "#dbeafe",
  },

  badgeOverdue: {
    backgroundColor: "#fee2e2",
  },

  badgeText: {
    fontWeight: "700",
    fontSize: 12,
  },

  balance: {
    marginTop: 8,
    fontSize: 14,
    color: "#475569",
  },

  balanceAmount: {
    fontWeight: "800",
    color: "#1e3a8a",
  },

  actionRow: {
    flexDirection: "row",
    marginTop: 14,
    gap: 8,
    flexWrap: "wrap",
  },

  primaryBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  secondaryBtn: {
    backgroundColor: "#e0e7ff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  secondaryBtnText: {
    color: "#3730a3",
    fontWeight: "700",
    fontSize: 12,
  },

  ghostBtn: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  ghostBtnText: {
    color: "#1e3a8a",
    fontWeight: "700",
    fontSize: 12,
  },
});
