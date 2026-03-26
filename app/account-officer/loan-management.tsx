// app/account-officer/loan-management.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const stats = [
  {
    label: "Pending Applications",
    value: "7",
    icon: "document-text-outline",
    color: "#f59e42",
    bg: "#fef9c3",
  },
  {
    label: "Active Loans",
    value: "12",
    icon: "cash-outline",
    color: "#1c3faa",
    bg: "#dbeafe",
  },
  {
    label: "Partial Payments",
    value: "5",
    icon: "wallet-outline",
    color: "#16a34a",
    bg: "#dcfce7",
  },
];

const actions = [
  { label: "Approve Applications", icon: "checkmark-done-outline" },
  { label: "Reject Applications", icon: "close-circle-outline" },
  { label: "Modify Loan Terms", icon: "create-outline" },
  { label: "View Payment History", icon: "time-outline" },
  { label: "Record Partial Payment", icon: "wallet-outline" },
];

export default function LoanManagement() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.headerContent}>
        <Text style={styles.greeting}>Loan Management</Text>
        <Text style={styles.subtitle}>
          Manage loan applications, approvals, and partial payments.
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        {stats.map((stat, idx) => (
          <View
            key={idx}
            style={[styles.statCard, { backgroundColor: stat.bg }]}
          >
            <Ionicons name={stat.icon as any} size={28} color={stat.color} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* QUICK ACTIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.grid}>
          {actions.map((action, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.gridItem}
              activeOpacity={0.8}
            >
              <View style={styles.iconBox}>
                <Ionicons name={action.icon as any} size={24} color="#1c3faa" />
              </View>
              <Text style={styles.gridText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  headerContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1c3faa",
    marginBottom: 4,
  },
  subtitle: { fontSize: 14, color: "#64748b" },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: { flex: 1, borderRadius: 16, padding: 16, alignItems: "center" },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1e293b",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "600",
    marginTop: 2,
  },

  section: { paddingHorizontal: 20, marginBottom: 28 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: { width: "30%", alignItems: "center", marginBottom: 20 },
  iconBox: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  gridText: {
    textAlign: "center",
    fontSize: 12,
    color: "#475569",
    fontWeight: "600",
  },
});
