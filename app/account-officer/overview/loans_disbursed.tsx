// app/account-officer/loans_disbursed.tsx

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
  accentColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  color,
  bg,
  accentColor,
}) => {
  return (
    <View style={styles.card}>
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default function LoansDisbursed() {
  const stats = [
    {
      label: "Loans Disbursed",
      value: "₱2,500,000",
      icon: "wallet-outline",
      color: "#16a34a",
      bg: "#dcfce7",
      accentColor: "#16a34a",
    },
    {
      label: "This Month",
      value: "₱320,000",
      icon: "calendar-outline",
      color: "#16a34a",
      bg: "#dcfce7",
      accentColor: "#16a34a",
    },
    {
      label: "Active Loans",
      value: 85,
      icon: "card-outline",
      color: "#16a34a",
      bg: "#dcfce7",
      accentColor: "#16a34a",
    },
    {
      label: "Approved Today",
      value: 6,
      icon: "checkmark-circle-outline",
      color: "#22c55e",
      bg: "#dcfce7",
      accentColor: "#22c55e",
    },
  ];

  const actions = [
    { label: "View Loans", icon: "eye-outline" },
    { label: "Approve Loan", icon: "checkmark-done-outline" },
    { label: "Disburse Loan", icon: "cash-outline" },
    { label: "Generate Report", icon: "document-text-outline" },
  ];

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Loans Disbursed</Text>
        <Text style={styles.headerSub}>
          Track approved and released loan amounts
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        {stats.map((item, idx) => (
          <StatCard key={idx} {...item} />
        ))}
      </View>

      {/* QUICK ACTIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.grid}>
          {actions.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.gridItem}
              activeOpacity={0.8}
            >
              <View style={styles.actionIcon}>
                <Ionicons name={item.icon as any} size={22} color="#16a34a" />
              </View>

              <Text style={styles.gridText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* SUMMARY */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Disbursement Overview</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Total Approved Loans</Text>
          <Text style={styles.rowValue}>₱3,200,000</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Total Released</Text>
          <Text style={styles.rowValue}>₱2,500,000</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Pending Release</Text>
          <Text style={styles.rowValue}>₱700,000</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },

  /* HEADER */
  header: {
    backgroundColor: "#099a1c",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  headerSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    marginTop: 4,
  },

  /* STATS */
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 24,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    position: "relative",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  accentBar: {
    position: "absolute",
    top: 0,
    left: 6,
    right: 6,
    height: 3,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  value: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1a1a",
  },

  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  /* QUICK ACTIONS */
  section: {
    paddingHorizontal: 16,
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridItem: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 12,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  gridText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },

  /* SUMMARY */
  summaryCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
    color: "#1a1a1a",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },

  rowLabel: {
    fontSize: 13,
    color: "#555",
  },

  rowValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1a1a1a",
  },
});