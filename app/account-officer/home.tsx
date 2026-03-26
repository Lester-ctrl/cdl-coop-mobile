import { useAuth } from "@/context/AuthContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
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
    icon: "cash-outline",
    color: "#1c3faa",
    bg: "#dbeafe",
  },
  {
    label: "Partial Payments",
    value: "₱8,000",
    icon: "wallet-outline",
    color: "#16a34a",
    bg: "#dcfce7",
  },
  {
    label: "Pending Approvals",
    value: "5",
    icon: "document-text-outline",
    color: "#f59e42",
    bg: "#fef9c3",
  },
];

const actions = [
  { label: "Approve Applications", icon: "checkmark-done-outline" },
  { label: "Reject Applications", icon: "close-circle-outline" },
  { label: "Modify Loan Terms", icon: "create-outline" },
  { label: "View Payment History", icon: "time-outline" },
  { label: "Record Partial Payment", icon: "wallet-outline" },
];

const sections = [
  { label: "Products & Services", icon: "grid-outline" },
  { label: "Loan Management", icon: "cash-outline" },
  { label: "Payments & Collections", icon: "card-outline" },
  { label: "News, Events, Promos", icon: "megaphone-outline" },
  { label: "Reports & Statements", icon: "document-text-outline" },
];

export default function AccountOfficerDashboard() {
  const router = useRouter();
  const { session, clearSession } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const userName = session?.profile?.first_name ?? "Account Officer";

  const handleCloseMenu = () => setShowMenu(false);

  const handleProfile = () => {
    router.push("/account-officer/profile");
    handleCloseMenu();
  };

  const handleSettings = () => {
    alert("Settings page coming soon!");
    handleCloseMenu();
  };

  const handleLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Logout clear error:", e);
    }
    router.replace("/");
  };

  const handleOverlayPress = (e: any) => {
    if (e.target === e.currentTarget) {
      handleCloseMenu();
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* FULL OVERLAY FOR DROPDOWN */}
      {showMenu && (
        <Pressable style={styles.globalOverlay} onPress={handleOverlayPress} />
      )}

      {/* HEADER */}
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>Welcome, {userName} 👋</Text>
            <Text style={styles.title}>Account Officer Dashboard</Text>
            <Text style={styles.subtitle}>
              Manage member accounts, loan applications, and payments
              efficiently.
            </Text>
          </View>
        </View>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        {stats.map((stat, idx) => (
          <View
            key={idx}
            style={[styles.statCard, { backgroundColor: stat.bg }]}
          >
            <Ionicons
              name={stat.icon as any}
              size={28}
              color={stat.color}
              style={styles.statIcon}
            />
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
                <Ionicons name={action.icon as any} size={24} color="#179023" />
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
            <TouchableOpacity
              key={idx}
              style={styles.gridItem}
              activeOpacity={0.8}
            >
              <View style={styles.iconBox}>
                <Ionicons
                  name={section.icon as any}
                  size={24}
                  color="#13842d"
                />
              </View>
              <Text style={styles.gridText}>{section.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* NEWS & EVENTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>News, Events & Promos</Text>
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
        <View style={styles.newsCard}>
          <View style={[styles.newsBadge, { backgroundColor: "#fecaca" }]}>
            <Text style={[styles.newsBadgeText, { color: "#991b1b" }]}>
              ALERT
            </Text>
          </View>
          <Text style={styles.newsTitle}>Payment Reminder</Text>
          <Text style={styles.newsDesc}>
            Your monthly payment is due on the 15th of this month.
          </Text>
          <TouchableOpacity
            style={[styles.newsBtn, { backgroundColor: "#ef4444" }]}
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
  container: { flex: 1, backgroundColor: "#f8fafc" },
  globalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 24,
    backgroundColor: "#099a1c",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 80,
    position: "relative",
    zIndex: 200,
  },
  greeting: {
    color: "#f8f8f8",
    fontSize: 20,
    fontWeight: "500",
    marginTop: -24
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 20,
    
  },
  subtitle: {
    color: "#e0e7ff",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
  },
 
  statsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  statIcon: { marginBottom: 8 },
  statValue: { fontSize: 18, fontWeight: "800", color: "#1e293b" },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
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
  newsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  newsBadge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  newsBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0c4a6e",
    letterSpacing: 0.5,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 6,
  },
  newsDesc: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 18,
  },
  newsBtn: {
    backgroundColor: "#1c3faa",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  newsBtnText: { color: "#fff", fontWeight: "700", fontSize: 12 },
});
