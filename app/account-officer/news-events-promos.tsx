// app/account-officer/news-events-support.tsx
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const news = [
  {
    type: "UPDATE",
    title: "New Loan Products Available",
    description: "Check out our latest loan offerings with competitive rates.",
    icon: "trending-up",
    color: "#1c3faa",
    bg: "#dbeafe",
  },
  {
    type: "ALERT",
    title: "Payment Reminder",
    description: "Your monthly payment is due on the 15th of this month.",
    icon: "notifications-active",
    color: "#ef4444",
    bg: "#fee2e2",
  },
  {
    type: "EVENT",
    title: "Monthly Training for Officers",
    description: "Join our webinar on loan management best practices.",
    icon: "people-outline",
    color: "#f59e42",
    bg: "#fef9c3",
  },
];

const support = [
  { label: "Contact Support", icon: "call-outline" },
  { label: "FAQs", icon: "help-circle-outline" },
  { label: "Feedback", icon: "chatbubble-ellipses-outline" },
];

export default function NewsEventsSupport() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.headerContent}>
        <Text style={styles.greeting}>News, Events & Support</Text>
        <Text style={styles.subtitle}>
          Stay updated and get help whenever you need it.
        </Text>
      </View>

      {/* NEWS & EVENTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest News & Events</Text>
        {news.map((item, idx) => (
          <View
            key={idx}
            style={[styles.newsCard, { backgroundColor: "#fff" }]}
          >
            <View style={[styles.newsBadge, { backgroundColor: item.bg }]}>
              <Text style={[styles.newsBadgeText, { color: item.color }]}>
                {item.type}
              </Text>
            </View>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDesc}>{item.description}</Text>
            <View style={styles.iconBox}>
              <MaterialIcons
                name={item.icon as any}
                size={32}
                color={item.color}
              />
            </View>
          </View>
        ))}
      </View>

      {/* SUPPORT */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.grid}>
          {support.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.gridItem}
              activeOpacity={0.8}
            >
              <View style={styles.iconBox}>
                <Ionicons name={item.icon as any} size={28} color="#1c3faa" />
              </View>
              <Text style={styles.gridText}>{item.label}</Text>
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

  section: { paddingHorizontal: 20, marginBottom: 28 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
  },

  newsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  newsBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  newsBadgeText: { fontSize: 10, fontWeight: "800", letterSpacing: 0.5 },
  newsTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 4,
    flex: 1,
  },
  newsDesc: { fontSize: 13, color: "#64748b", lineHeight: 18, flex: 2 },
  iconBox: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: { width: "30%", alignItems: "center", marginBottom: 20 },
  gridText: {
    textAlign: "center",
    fontSize: 12,
    color: "#475569",
    fontWeight: "600",
  },
});
