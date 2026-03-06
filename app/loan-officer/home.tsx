import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
    label: "Active Loans",
    value: "12",
    icon: "card-outline",
    bg: "#EEF3FB",
    color: "#2563C7",
  },
  {
    label: "Partial Payments",
    value: "₱8,000",
    icon: "wallet-outline",
    bg: "#DCFCE7",
    color: "#16A34A",
  },
  {
    label: "Pending Apps",
    value: "5",
    icon: "document-text-outline",
    bg: "#FEF9C3",
    color: "#F59E42",
  },
];

const actions = [
  { label: "Review/Approve\nApplications", icon: "checkmark-done-outline" },
  { label: "Reject Loans", icon: "close-circle-outline" },
  { label: "Modify Loan Terms", icon: "create-outline" },
  { label: "View Payment\nHistory", icon: "time-outline" },
  { label: "Record Partial\nPayment", icon: "wallet-outline" },
];

const sections = [
  { label: "Products & Services", icon: "grid-outline" },
  { label: "Loan Management", icon: "cash-outline" },
  { label: "Payments & Collections", icon: "card-outline" },
  { label: "News, Events, Promos", icon: "megaphone-outline" },
  { label: "Reports & Statements", icon: "document-text-outline" },
];

export default function LoanOfficerDashboard() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient
        colors={["#1E3A8A", "#2563EB", "#3B82F6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.greeting}>Welcome, Loan Officer 👋</Text>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>
          Manage loans, payments, and member accounts efficiently.
        </Text>
      </LinearGradient>

      {/* STATS */}
      <View style={styles.statsRow}>
        {stats.map((stat, idx) => (
          <View
            key={idx}
            style={[styles.statCard, { backgroundColor: stat.bg }]}
          >
            <Ionicons name={stat.icon as any} size={22} color={stat.color} />
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
            <TouchableOpacity key={idx} style={styles.gridItem}>
              <View style={styles.iconBox}>
                <Ionicons name={action.icon as any} size={22} color="#284B9B" />
              </View>

              <Text style={styles.gridText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* MAIN SECTIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Main Sections</Text>

        <View style={styles.grid}>
          {sections.map((section, idx) => (
            <TouchableOpacity key={idx} style={styles.gridItem}>
              <View style={styles.iconBox}>
                <Ionicons
                  name={section.icon as any}
                  size={22}
                  color="#284B9B"
                />
              </View>

              <Text style={styles.gridText}>{section.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* NEWS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>News, Events & Promos</Text>

        {/* CARD 1 */}
        <View style={styles.newsCard}>
          <View style={styles.newsBadge}>
            <Text style={styles.newsBadgeText}>UPDATE</Text>
          </View>

          <Text style={styles.newsTitle}>New Loan Products Available</Text>

          <Text style={styles.newsDesc}>
            Check out our latest loan offerings with competitive rates.
          </Text>

          <TouchableOpacity style={styles.newsBtn}>
            <Text style={styles.newsBtnText}>Learn More</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* CARD 2 */}
        <View style={styles.newsCard}>
          <View style={[styles.newsBadge, { backgroundColor: "#FEE2E2" }]}>
            <Text style={[styles.newsBadgeText, { color: "#B91C1C" }]}>
              ALERT
            </Text>
          </View>

          <Text style={styles.newsTitle}>Payment Reminder</Text>

          <Text style={styles.newsDesc}>
            Your monthly payment is due on the 15th of this month.
          </Text>

          <TouchableOpacity
            style={[styles.newsBtn, { backgroundColor: "#EF4444" }]}
          >
            <Text style={styles.newsBtnText}>Pay Now</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 44,
    paddingBottom: 70,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },

  greeting: {
    color: "#BFDBFE",
    fontSize: 14,
    fontWeight: "600",
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 4,
  },

  subtitle: {
    color: "#E0E7FF",
    fontSize: 14,
    marginTop: 6,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: -40,
    marginBottom: 30,
  },

  statCard: {
    width: 120,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
    color: "#1E293B",
  },

  statLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 3,
    textAlign: "center",
  },

  section: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 18,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "16",
  },

  gridItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  gridText: {
    fontSize: 12,
    textAlign: "center",
    color: "#475569",
    fontWeight: "600",
  },

  newsCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  newsBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 10,
  },

  newsBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#1E40AF",
  },

  newsTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 6,
  },

  newsDesc: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 14,
    lineHeight: 18,
  },

  newsBtn: {
    backgroundColor: "#284B9B",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },

  newsBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
});
