import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const dashboardCards = [
  {
    label: "Loan Applications",
    icon: "document-text-outline",
    bg: "#F0FDF4",
    color: "#2D5016",
    route: "/loan-officer/loan-management/loans",
    description: "Review & process applications",
  },
  {
    label: "Partial Payments",
    icon: "cash-outline",
    bg: "#F0FDF4",
    color: "#48a019",
    route: "/loan-officer/loan-management/loan-dash",
    description: "Track installment payments",
  },
  {
    label: "Restructure",
    icon: "refresh-circle-outline",
    bg: "#F0FDF4",
    color: "#51b61a",
    route: "/loan-officer/loan-management/restructure-application",
    description: "Modify loan terms",
  },
];

const stats = [
  {
    label: "Active Loans",
    value: "24",
    icon: "briefcase-outline",
    color: "#2D5016",
  },
  {
    label: "Pending Reviews",
    value: "8",
    icon: "time-outline",
    color: "#48a019",
  },
  {
    label: "Total Disbursed",
    value: "₱1.2M",
    icon: "trending-up-outline",
    color: "#51b61a",
  },
];

export default function LoanManagementDashboard() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* HEADER */}
      <LinearGradient
        colors={["#2D5016", "#48a019", "#51b61a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>Loan Officer</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>
          Manage loans, track payments, and handle restructures
        </Text>
      </LinearGradient>

      {/* STATS SECTION */}
      <View style={styles.statsContainer}>
        {stats.map((stat, idx) => (
          <View key={idx} style={styles.statCard}>
            <View
              style={[
                styles.statIconBg,
                { backgroundColor: `${stat.color}10` },
              ]}
            >
              <Ionicons name={stat.icon as any} size={22} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* DASHBOARD CARDS */}
      <View style={styles.cardsGrid}>
        {dashboardCards.map((card, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.card,
              idx === dashboardCards.length - 1 &&
              dashboardCards.length % 2 !== 0
                ? styles.cardFullWidth
                : null,
              { backgroundColor: card.bg },
            ]}
            onPress={() => router.push(card.route)}
            activeOpacity={0.85}
          >
            <View
              style={[
                styles.cardIconWrapper,
                { backgroundColor: `${card.color}15` },
              ]}
            >
              <Ionicons name={card.icon as any} size={28} color={card.color} />
            </View>
            <Text style={styles.cardLabel}>{card.label}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* RECENT ACTIVITY */}
      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { color: "#2D5016" }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activityList}>
          {[
            {
              title: "New loan application #LN-2341",
              time: "2 min ago",
              icon: "document-text",
              color: "#2D5016",
            },
            {
              title: "Partial payment received",
              time: "1 hour ago",
              icon: "cash",
              color: "#48a019",
            },
            {
              title: "Restructure request pending",
              time: "3 hours ago",
              icon: "refresh",
              color: "#51b61a",
            },
          ].map((activity, idx) => (
            <View key={idx} style={styles.activityItem}>
              <View
                style={[
                  styles.activityIcon,
                  { backgroundColor: `${activity.color}10` },
                ]}
              >
                <Ionicons
                  name={activity.icon as any}
                  size={20}
                  color={activity.color}
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </View>
          ))}
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
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 48,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    color: "#E8F5E9",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  userName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 2,
  },
  notificationBtn: {
    position: "relative",
    padding: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  headerSubtitle: {
    color: "#E8F5E9",
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.95,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: -28,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  statIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    rowGap: 14,
    marginTop: 18,
  },
  card: {
    width: "48%",
    borderRadius: 24,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardFullWidth: {
    width: "100%",
  },
  cardIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 0,
  },
  recentSection: {
    marginTop: 8,
    paddingHorizontal: 20,
  },
  activityList: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: "#94A3B8",
  },
});
