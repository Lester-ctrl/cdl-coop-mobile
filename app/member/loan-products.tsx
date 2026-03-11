import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BLUE = "#2952CC";
const BLUE_DARK = "#1a3aab";
const BLUE_LIGHT = "#EEF2FF";

const LOANS = [
  {
    icon: "person" as const,
    apr: "5.5% - 8.5% APR",
    title: "Personal Loan",
    desc: "Flexible personal loans for any purpose - from medical expenses to special occasions.",
    features: [
      "Up to ₱50,000",
      "Low interest rates",
      "Flexible terms up to 5 years",
      "Quick approval",
    ],
  },
  {
    icon: "home" as const,
    apr: "4.5% - 6.5% APR",
    title: "Housing Loan",
    desc: "Make your dream home a reality with our competitive housing loan packages.",
    features: [
      "Up to ₱500,000",
      "Long-term financing up to 25 years",
      "Competitive rates",
      "No prepayment penalties",
    ],
  },
  {
    icon: "business" as const,
    apr: "6.0% - 9.0% APR",
    title: "Business Loan",
    desc: "Grow your business with capital designed for entrepreneurs and enterprises.",
    features: [
      "Up to ₱200,000",
      "Business expansion support",
      "Flexible repayment",
      "Competitive rates",
    ],
  },
];

const ACCORDIONS = [
  {
    title: "For All Members",
    items: [
        "Active membership for at least 6 months", 
        "Valid government-issued ID", 
        "Proof of income (payslip, ITR, etc.)",
        "Good credit standing",
        "Completed loan application form"
    ],
  },
  {
    title: "Additional Documents",
    items: [
        "Latest bank statements (3 months)", 
        "Proof of billing address",
        "Co-maker information (if required)",
        "Collateral documents (for secured loans)"
    ],
  },
];

export default function LoanProducts() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>Financial Solutions</Text>
        </View>
        <Text style={styles.headerTitle}>Loan Products</Text>
        <Text style={styles.headerSubtitle}>
          Flexible financing solutions tailored to your needs. From personal
          loans to business expansion, we have the right loan product for you.
        </Text>
      </View>

      {/* Loan Cards */}
      <View style={styles.cardsWrapper}>
        {LOANS.map((loan, i) => (
          <View key={i} style={styles.card}>
            {/* Top Row */}
            <View style={styles.cardTopRow}>
              <View style={styles.iconBox}>
                <Ionicons name={loan.icon} size={22} color={BLUE} />
              </View>
              <View style={styles.aprBadge}>
                <Text style={styles.aprText}>{loan.apr}</Text>
              </View>
            </View>

            {/* Title & Desc */}
            <Text style={styles.cardTitle}>{loan.title}</Text>
            <Text style={styles.cardDesc}>{loan.desc}</Text>

            {/* Divider */}
            <View style={styles.cardDivider} />

            {/* Features */}
            {loan.features.map((f, fi) => (
              <View key={fi} style={styles.featureRow}>
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={12} color={BLUE} />
                </View>
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* General Requirements */}
      <View style={styles.requirementsSection}>
        <Text style={styles.sectionTitle}>General Loan Requirements</Text>

        {ACCORDIONS.map((acc, i) => (
          <View key={i} style={styles.accordionWrapper}>
            <TouchableOpacity
              style={styles.accordion}
              activeOpacity={0.8}
              onPress={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <Text style={styles.accordionTitle}>{acc.title}</Text>
              <Ionicons
                name={openIndex === i ? "chevron-up" : "chevron-down"}
                size={18}
                color="#6B7280"
              />
            </TouchableOpacity>

            {openIndex === i && (
              <View style={styles.accordionBody}>
                {acc.items.map((item, ii) => (
                  <View key={ii} style={styles.accordionItem}>
                    <View style={styles.accordionBullet} />
                    <Text style={styles.accordionItemText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  /* ── Header ── */
  header: {
    backgroundColor: BLUE,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 14,
  },
  headerBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Poppins_800ExtraBold",
    marginBottom: 10,
    lineHeight: 38,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.80)",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    lineHeight: 22,
  },

  /* ── Cards ── */
  cardsWrapper: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: BLUE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  aprBadge: {
    backgroundColor: BLUE_LIGHT,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  aprText: {
    color: BLUE,
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  cardTitle: {
    color: "#111827",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginBottom: 6,
  },
  cardDesc: {
    color: "#6B7280",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    lineHeight: 20,
    marginBottom: 16,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 14,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: BLUE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  featureText: {
    color: "#374151",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    flex: 1,
  },

  /* ── Requirements ── */
  requirementsSection: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 8,
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginBottom: 16,
  },
  accordionWrapper: {
    marginBottom: 10,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  accordion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  accordionTitle: {
    color: "#111827",
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  accordionBody: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    gap: 10,
  },
  accordionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  accordionBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BLUE,
  },
  accordionItemText: {
    color: "#374151",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },

  /* ── CTA ── */
  ctaWrapper: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  ctaCard: {
    borderRadius: 24,
    padding: 28,
  },
  ctaTitle: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Poppins_800ExtraBold",
    marginBottom: 10,
  },
  ctaSubtitle: {
    color: "rgba(255,255,255,0.80)",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    lineHeight: 21,
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  ctaButtonText: {
    color: BLUE_DARK,
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
  },
});