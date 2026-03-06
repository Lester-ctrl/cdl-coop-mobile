import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

const Tab = createBottomTabNavigator();

const loans = [
  {
    id: 1,
    member: "Anna Villanueva",
    balance: 12500,
    status: "Active",
    overdue: false,
  },
  {
    id: 2,
    member: "Carlos Mendoza",
    balance: 5200,
    status: "Active",
    overdue: true,
  },
  {
    id: 3,
    member: "Liza Ramos",
    balance: 9800,
    status: "Active",
    overdue: false,
  },
];

export default function Loans() {
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [rangeLoans, setRangeLoans] = useState(loans);

  const nameFilteredLoans = rangeLoans.filter((loan) =>
    loan.member.toLowerCase().includes(search.toLowerCase()),
  );

  const handleRangeFilter = () => {
    const minVal = min ? parseInt(min, 10) : 0;
    const maxVal = max ? parseInt(max, 10) : Infinity;

    setRangeLoans(
      loans.filter((loan) => loan.balance >= minVal && loan.balance <= maxVal),
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient
        colors={["#1e3a8a", "#2563eb", "#3b82f6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Active</Text>
        <Text style={styles.headerSubtitle}>
          Search and manage member loan accounts
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
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={handleRangeFilter}
          >
            <FontAwesome6 name="filter-circle-dollar" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* LOAN LIST */}
      <View style={styles.loanList}>
        {nameFilteredLoans.length === 0 ? (
          <Text style={styles.noResult}>No loans found</Text>
        ) : (
          nameFilteredLoans.map((loan) => (
            <View key={loan.id} style={styles.loanCard}>
              <View style={styles.loanHeader}>
                <Text style={styles.memberName}>{loan.member}</Text>

                <View
                  style={[
                    styles.statusBadge,
                    loan.overdue ? styles.badgeOverdue : styles.badgeActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      loan.overdue
                        ? { color: "#dc2626" }
                        : { color: "#2563eb" },
                    ]}
                  >
                    {loan.overdue ? "Overdue" : "Active"}
                  </Text>
                </View>
              </View>

              <Text style={styles.balance}>
                Balance:{" "}
                <Text style={styles.balanceAmount}>
                  ₱{loan.balance.toLocaleString()}
                </Text>
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
