import { useAuth } from "@/context/AuthContext";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

const actions = [
  { label: "Manage\nAccounts", icon: "wallet-outline" },
  { label: "Wallet", icon: "card-outline" },
  { label: "Open\nAccount", icon: "add-circle-outline" },
  { label: "Fund\nTransfer", icon: "swap-horizontal-outline" },
  { label: "Payments", icon: "cash-outline" },
  { label: "Apply\nLoan", icon: "document-text-outline" },
  { label: "Rewards", icon: "gift-outline" },
  { label: "More", icon: "grid-outline" },
];

function HomeContent() {
  const { session } = useAuth();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const insets = useSafeAreaInsets();

  const profile = session?.profile;
  const roleName = session?.role_name ?? "N/A";

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const handleLogout = () => {
    setShowMenu(false);
    router.replace("/");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <LinearGradient
          colors={["#1A56DB", "#2563C7", "#3B82F6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          {/* Greeting + Avatar */}
          <View style={styles.headerMain}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>Good day,</Text>
              <Text style={styles.name}>{profile?.first_name} {profile?.last_name}</Text>
              <View style={styles.classBadge}>
                <MaterialIcons name="verified" size={12} color="#fff" style={{ marginRight: 4 }} />
                <Text style={styles.classText}>{roleName}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* QUICK STATS */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#e0f2fe" }]}>
              <MaterialIcons name="account-balance" size={22} color="#0284c7" />
            </View>
            <Text style={styles.statLabel}>Total Balance</Text>
            <Text style={styles.statValue}>₱125,500</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#fce7f3" }]}>
              <MaterialIcons name="trending-up" size={22} color="#ec4899" />
            </View>
            <Text style={styles.statLabel}>Active Loans</Text>
            <Text style={styles.statValue}>₱45,200</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#dcfce7" }]}>
              <MaterialIcons name="savings" size={22} color="#16a34a" />
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
                  <Ionicons name={item.icon as any} size={22} color="#1e40af" />
                </View>
                <Text style={styles.gridText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* WHAT'S NEW */}
        <View style={styles.newsSection}>
          <View style={styles.newsHeader}>
            <Text style={styles.sectionTitle}>What's New</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* UPDATE Card */}
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
                <MaterialIcons name="arrow-forward" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.cardIconWrap}>
              <MaterialIcons name="trending-up" size={44} color="#1e40af" />
            </View>
          </View>

          {/* ALERT Card */}
          <View style={[styles.card, styles.alertCard]}>
            <View style={styles.cardContent}>
              <View style={[styles.cardBadge, styles.alertBadge]}>
                <Text style={[styles.badgeText, { color: "#991b1b" }]}>ALERT</Text>
              </View>
              <Text style={styles.cardTitle}>Payment Reminder</Text>
              <Text style={styles.cardDescription}>
                Your monthly payment is due on the 15th of this month
              </Text>
              <TouchableOpacity style={[styles.cardButton, styles.alertButton]}>
                <Text style={styles.cardButtonText}>Pay Now</Text>
                <MaterialIcons name="arrow-forward" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={[styles.cardIconWrap, { backgroundColor: "#fee2e2" }]}>
              <MaterialIcons name="notifications-active" size={44} color="#ef4444" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <HomeContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  /* ── HEADER ── */
  header: {
    backgroundColor: "#1e40af",
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  hamburger: {
    gap: 5,
    padding: 4,
  },
  hamburgerLine: {
    height: 2,
    width: 22,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  headerMain: {
    padding: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    color: "#93c5fd",
    fontSize: 14,
    fontWeight: "500",
  },
  name: {
    color: "#fff",
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    marginTop: 2,
    marginBottom: 10,
  },
  classBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  classText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 0.5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.5)",
    overflow: "hidden",
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  /* ── STAT CARDS ── */
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: -18,
    marginBottom: 22,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 10,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1e293b",
    textAlign: "center",
  },

  /* ── SERVICES GRID ── */
  gridSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  gridTitle: {
    fontSize: 17,
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
    marginBottom: 18,
  },
  iconBox: {
    backgroundColor: "#fff",
    padding: 13,
    borderRadius: 14,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  gridText: {
    textAlign: "center",
    fontSize: 10,
    color: "#475569",
    fontWeight: "600",
    lineHeight: 14,
  },

  /* ── WHAT'S NEW ── */
  newsSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  newsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1e293b",
  },
  seeAll: {
    color: "#2563eb",
    fontWeight: "700",
    fontSize: 13,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  alertCard: {
    // subtle red tint border
    borderWidth: 1,
    borderColor: "#fee2e2",
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  cardBadge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  alertBadge: {
    backgroundColor: "#fecaca",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#1e40af",
    letterSpacing: 0.6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: "#64748b",
    lineHeight: 17,
    marginBottom: 12,
  },
  cardButton: {
    backgroundColor: "#1e40af",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
  },
  alertButton: {
    backgroundColor: "#ef4444",
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  cardIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 16,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
  },

  /* ── DROPDOWN ── */
  dropdown: {
    position: "absolute",
    top: 72,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    zIndex: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  menuText: {
    marginLeft: 12,
    color: "#1e293b",
    fontWeight: "700",
    fontSize: 14,
  },
});