import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
    label: "Active Loans",
    icon: "card-outline",
    bg: "#EEF3FB",
    color: "#2563C7",
    route: "/loan-officer/loan-management/Loans",
  },
  {
    label: "Partial Payments",
    icon: "wallet-outline",
    bg: "#DCFCE7",
    color: "#16A34A",
    route: "/loan-officer/loan-management/loan-dash",
  },
  {
    label: "Restructure Application",
    icon: "create-outline",
    bg: "#FEF9C3",
    color: "#F59E42",
    route: "/loan-officer/loan-management/restructure-application",
  },
];

export default function LoanManagementDashboard() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient
        colors={["#1E3A8A", "#2563EB", "#3B82F6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.greeting}>Loan Management</Text>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>
          Access and manage loans, partial payments, and restructuring.
        </Text>
      </LinearGradient>

      {/* DASHBOARD CARDS */}
      <View style={styles.cardsRow}>
        {dashboardCards.map((card, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.card, { backgroundColor: card.bg }]}
            onPress={() => router.push(card.route)}
            activeOpacity={0.85}
          >
            <Ionicons name={card.icon as any} size={32} color={card.color} />
            <Text style={styles.cardLabel}>{card.label}</Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={18}
              color="#64748B"
              style={{ marginTop: 8 }}
            />
          </TouchableOpacity>
        ))}
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
    backgroundColor: "#284B9B",
    paddingHorizontal: 20,
    paddingTop: 44,
    paddingBottom: 70,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    marginBottom: 24,
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
  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: -40,
  },
  card: {
    width: "40%",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 12,
    textAlign: "center",
  },
});
