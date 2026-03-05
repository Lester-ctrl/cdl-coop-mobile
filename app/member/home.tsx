import MemberNavbar from "@/components/navigations/memberNavbar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
const actions = [
  { label: "Manage\nAccounts", icon: "wallet-outline" },
  { label: "Wallet", icon: "card-outline" },
  { label: "Open\nAccount", icon: "add-circle-outline" },
  { label: "Fund\nTransfer", icon: "swap-horizontal-outline" },
  { label: "Payments", icon: "cash-outline" },
  { label: "Apply\nLoan", icon: "cash-outline" },
  { label: "Rewards", icon: "gift-outline" },
];

export default function HomeScreen() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    setShowMenu(false);
    router.replace("/");
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <MemberNavbar/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MemberNavbar />
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good day,</Text>
              <Text style={styles.name}>John Doe</Text>
              <View style={styles.classBadge}>
                <Text style={styles.class}>CLASS A</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setShowMenu(!showMenu)}
              style={styles.avatar}
            >
              <Image
                source={require("@/assets/images/profile-logo.png")}
                style={{ width: 44, height: 44, borderRadius: 22 }}
                contentFit="cover"
              />
            </TouchableOpacity>
          </View>

          {showMenu && (
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                <Ionicons name="log-out" size={20} color="#ef4444" />
                <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* QUICK STATS */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#dcfce7" }]}>
              <MaterialIcons name="account-balance" size={24} color="#16a34a" />
            </View>
            <Text style={styles.statLabel}>Total Balance</Text>
            <Text style={styles.statValue}>₱125,500</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#fce7f3" }]}>
              <MaterialIcons name="trending-up" size={24} color="#ec4899" />
            </View>
            <Text style={styles.statLabel}>Active Loans</Text>
            <Text style={styles.statValue}>₱45,200</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#dbeafe" }]}>
              <MaterialIcons name="credit-card" size={24} color="#0284c7" />
            </View>
            <Text style={styles.statLabel}>Savings</Text>
            <Text style={styles.statValue}>₱80,300</Text>
          </View>
        </View>

        {/* ACTION GRID */}
        <View style={styles.gridSection}>
          <Text style={styles.gridTitle}>Services</Text>
          <View style={styles.grid}>
            {actions.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.gridItem}
                activeOpacity={0.7}
              >
                <View style={styles.iconBox}>
                  <Ionicons name={item.icon as any} size={24} color="#1e40af" />
                </View>
                <Text style={styles.gridText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* WHAT'S NEW */}
        <View style={styles.newsSection}>
          <View style={styles.newsHeader}>
            <Text style={styles.sectionTitle}>Whats New</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardBadge}>
                <Text style={styles.badgeText}>UPDATE</Text>
              </View>
              <Text style={styles.cardTitle}>New Loan Products Available</Text>
              <Text style={styles.cardDescription}>
                Check out our latest loan offerings with competitive rates
              </Text>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Learn More</Text>
                <MaterialIcons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.cardIcon}>
              <MaterialIcons name="trending-up" size={48} color="#1e40af" />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={[styles.cardBadge, { backgroundColor: "#fecaca" }]}>
                <Text style={[styles.badgeText, { color: "#991b1b" }]}>
                  ALERT
                </Text>
              </View>
              <Text style={styles.cardTitle}>Payment Reminder</Text>
              <Text style={styles.cardDescription}>
                Your monthly payment is due on the 15th of this month
              </Text>
              <TouchableOpacity
                style={[styles.cardButton, { backgroundColor: "#ef4444" }]}
              >
                <Text style={styles.cardButtonText}>Pay Now</Text>
                <MaterialIcons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={[styles.cardIcon, { backgroundColor: "#fee2e2" }]}>
              <MaterialIcons
                name="notifications-active"
                size={48}
                color="#ef4444"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {
    backgroundColor: "#1e40af",
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: "relative",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "#fff",
    overflow: "hidden",
  },

  greeting: {
    color: "#93c5fd",
    fontSize: 14,
    fontWeight: "500",
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 2,
  },
  classBadge: {
    marginTop: 8,
    backgroundColor: "#3b82f6",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  class: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: -12,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1e293b",
  },

  gridSection: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  gridTitle: {
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
  gridItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 20,
  },
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
    fontSize: 11,
    color: "#475569",
    fontWeight: "600",
  },

  newsSection: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  newsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1e293b",
  },
  seeAll: {
    color: "#0284c7",
    fontWeight: "700",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  cardBadge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0c4a6e",
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 18,
    marginBottom: 12,
  },
  cardButton: {
    backgroundColor: "#1e40af",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  cardIcon: {
    width: 68,
    height: 68,
    borderRadius: 14,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
  },

  dropdown: {
    position: "absolute",
    top: 66,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    zIndex: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  menuText: {
    marginLeft: 14,
    color: "#1e293b",
    fontWeight: "700",
    fontSize: 14,
  },
});
