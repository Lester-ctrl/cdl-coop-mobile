import MemberNavbar from "@/components/navigations/memberNavbar";
import {
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Product = {
  title: string;
  description: string;
  rate: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconBg: string;
  iconColor: string;
  rateBg: string;
  rateColor: string;
  features: string[];
};

type Benefit = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  description: string;
};

const PRODUCTS: Product[] = [
  {
    title: "Regular Savings",
    description: "Build your savings with our flexible regular savings account designed for everyday needs.",
    rate: "2.5% p.a.",
    icon: "wallet-outline",
    iconBg: "#EEF3FB",
    iconColor: "#2563C7",
    rateBg: "#EEF3FB",
    rateColor: "#2563C7",
    features: [
      "Minimum deposit: ₱100",
      "Withdrawable anytime",
      "No maintaining balance",
    ],
  },
  {
    title: "Time Deposit",
    description: "Earn higher returns with our time deposit accounts with fixed terms and guaranteed...",
    rate: "4.5% - 6.0% p.a.",
    icon: "cash-outline",
    iconBg: "#ECFDF5",
    iconColor: "#059669",
    rateBg: "#ECFDF5",
    rateColor: "#059669",
    features: [
      "Minimum deposit: ₱5,000",
      "6, 12, or 24 month terms",
      "Auto-renewal option",
    ],
  },
  {
    title: "High-Yield Savings",
    description: "Maximize your earnings with premium interest rates for higher balance accounts.",
    rate: "3.5% - 5.0% p.a.",
    icon: "analytics",
    iconBg: "#F3E8FF",
    iconColor: "#9333EA",
    rateBg: "#F3E8FF",
    rateColor: "#9333EA",
    features: [
      "Minimum deposit: ₱10,000",
      "Tiered interest rates",
    ],
  },
  {
    title: "Special Savings",
    description: "Dedicated savings for specific goals like education, vacation, or emergency funds.",
    rate: "3.0% p.a.",
    icon: "shield-checkmark-outline",
    iconBg: "#FFFBEB",
    iconColor: "#D97706",
    rateBg: "#FFFBEB",
    rateColor: "#D97706",
    features: [
      "Goal-oriented savings",
    ],
  },
  {
    title: "Junior Savers",
    description: "Start your child's financial journey early with our junior savings account.",
    rate: "2.5% p.a.",
    icon: "gift-outline",
    iconBg: "#FEF2F2",
    iconColor: "#DC2626",
    rateBg: "#FEF2F2",
    rateColor: "#DC2626",
    features: [
      "Ages 0-17",
      "Parental monitoring",
    ],
  },
];

const BENEFITS: Benefit[] = [
  {
    icon: "shield-checkmark-outline",
    title: "PDIC Insured",
    description: "All deposits insured up to ₱250,000 per account",
  },
  {
    icon: "trending-up-outline",
    title: "Competitive Rates",
    description: "Industry-leading interest rates on all savings products",
  },
  {
    icon: "card-outline",
    title: "Easy Access",
    description: "Multiple channels for deposits and withdrawals",
  },
  {
    icon: "gift-outline",
    title: "Member Rewards",
    description: "Exclusive perks and bonuses for loyal members",
  },
];

type RateRow = {
  product: string;
  minDeposit: string;
  interestRate: string;
};

const RATES: RateRow[] = [
  { product: "Regular Savings",          minDeposit: "₱100",     interestRate: "2.5% p.a."       },
  { product: "Time Deposit (6 months)",  minDeposit: "₱5,000",   interestRate: "4.5% p.a."       },
  { product: "Time Deposit (12 months)", minDeposit: "₱5,000",   interestRate: "5.5% p.a."       },
  { product: "Time Deposit (24 months)", minDeposit: "₱5,000",   interestRate: "6.0% p.a."       },
  { product: "High-Yield Savings",       minDeposit: "₱10,000",  interestRate: "3.5% - 5.0% p.a."},
  { product: "Special Savings",          minDeposit: "₱500",     interestRate: "3.0% p.a."       },
  { product: "Junior Savers",            minDeposit: "₱50",      interestRate: "2.5% p.a."       },
];

export default function SavingsAndDeposits() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <MemberNavbar />
      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

        {/* ── Hero Section ── */}
        <LinearGradient
          colors={["#1A56DB", "#2563C7", "#3B82F6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.tag}>
            <Text style={styles.tagText}>Grow Your Wealth</Text>
          </View>
          <Text style={styles.heroTitle}>Savings & Deposits</Text>
          <Text style={styles.heroDesc}>
            Secure your financial future with our range of savings and deposit
            products. Enjoy competitive interest rates and the security of
            cooperative banking.
          </Text>
        </LinearGradient>

        {/* ── Products Section ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Savings Products</Text>
            <Text style={styles.sectionSubtitle}>
              Choose the savings solution that fits your financial goals
            </Text>
          </View>

          {PRODUCTS.map((product, index) => (
            <TouchableOpacity key={index} style={styles.card} activeOpacity={0.88}>
              <View style={styles.cardTop}>
                <View style={[styles.iconBox, { backgroundColor: product.iconBg }]}>
                  <Ionicons name={product.icon} size={22} color={product.iconColor} />
                </View>
                <View style={[styles.rateBadge, { backgroundColor: product.rateBg }]}>
                  <Text style={[styles.rateText, { color: product.rateColor }]}>{product.rate}</Text>
                </View>
              </View>
              <Text style={styles.cardTitle}>{product.title}</Text>
              <Text style={styles.cardDesc}>{product.description}</Text>
              <View style={styles.featureList}>
                {product.features.map((feature, i) => (
                  <View key={i} style={styles.featureRow}>
                    <Ionicons name="checkmark-circle" size={18} color="#2563C7" style={styles.featureIcon} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Why Save With Us ── */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Why Save With Us</Text>
          <Text style={[styles.sectionSubtitle, { marginBottom: 16 }]}>
            Experience the advantages of cooperative savings
          </Text>

          {BENEFITS.map((benefit, index) => (
            <View key={index} style={styles.benefitCard}>
              <View style={styles.benefitIconBox}>
                <Ionicons name={benefit.icon} size={26} color="#2563C7" />
              </View>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={styles.benefitDesc}>{benefit.description}</Text>
            </View>
          ))}
        </View>

        {/* ── Current Interest Rates ── */}
        <View style={styles.ratesSection}>
          <Text style={styles.sectionTitle}>Current Interest Rates</Text>

          {/* Table */}
          <View style={styles.table}>
            {/* Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.colProduct, styles.headerText]}>PRODUCT{"\n"}TYPE</Text>
              <Text style={[styles.colDeposit, styles.headerText]}>MINIMUM{"\n"}DEPOSIT</Text>
              <Text style={[styles.colRate, styles.headerText]}>INTEREST RATE</Text>
            </View>

            {/* Rows */}
            {RATES.map((row, index) => (
              <View
                key={index}
                style={[styles.tableRow, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}
              >
                <Text style={[styles.colProduct, styles.cellText]}>{row.product}</Text>
                <Text style={[styles.colDeposit, styles.cellText]}>{row.minDeposit}</Text>
                <Text style={[styles.colRate, styles.rateCell]}>{row.interestRate}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.ratesNote}>
            * Rates are subject to change. Contact us for the most current rates.
          </Text>
        </View>

        {/* ── CTA Section ── */}
        <View style={styles.ctaWrapper}>
          <LinearGradient
            colors={["#1A56DB", "#3B82F6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaCard}
          >
            <Text style={styles.ctaTitle}>Start Saving Today</Text>
            <Text style={styles.ctaDesc}>
              Open a savings account and take the first step towards financial
              security. Our team is here to help you choose the right product.
            </Text>
            <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.85}>
              <Text style={styles.ctaBtnText}>Become a Member →</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

      </ScrollView>
    </>
  );
}

const TEXT   = "#1C1C2E";
const MUTED  = "#6B7280";
const BORDER = "#E8EAF0";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  /* ── Hero ── */
  hero: {
    padding: 28,
    paddingBottom: 36,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 16,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    letterSpacing: 0.3,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    lineHeight: 38,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  heroDesc: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },

  /* ── Section ── */
  section: {
    padding: 20,
    paddingBottom: 8,
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    color: TEXT,
    marginBottom: 6,
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: MUTED,
    textAlign: "center",
    lineHeight: 20,
  },

  /* ── Product Card ── */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  rateBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  rateText: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    color: TEXT,
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: MUTED,
    lineHeight: 20,
    marginBottom: 16,
  },
  featureList: { gap: 8 },
  featureRow:  { flexDirection: "row", alignItems: "center" },
  featureIcon: { marginRight: 8 },
  featureText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: TEXT,
  },

  /* ── Rates Section ── */
  ratesSection: {
    paddingHorizontal: 20,
    paddingBottom: 48,
    alignItems: "center",
  },
  table: {
    width: "100%",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: "hidden",
    marginTop: 16,
    backgroundColor: "#FFFFFF",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  tableHeader: {
    backgroundColor: "#F8F9FC",
  },
  rowEven: { backgroundColor: "#FFFFFF" },
  rowOdd:  { backgroundColor: "#F8F9FC" },
  headerText: {
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
    color: MUTED,
    letterSpacing: 0.4,
  },
  cellText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: TEXT,
  },
  rateCell: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    color: "#2563C7",
  },
  colProduct: { flex: 2 },
  colDeposit: { flex: 1.5, paddingHorizontal: 4 },
  colRate:    { flex: 1.8, textAlign: "right" },
  ratesNote: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: MUTED,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 17,
    paddingHorizontal: 8,
  },

  /* ── CTA ── */
  ctaWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  ctaCard: {
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  ctaDesc: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  ctaBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingHorizontal: 28,
    paddingVertical: 13,
  },
  ctaBtnText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#2563C7",
  },

  benefitsSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 48,
    alignItems: "center",
  },
  benefitCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    marginTop: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  benefitIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EEF3FB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  benefitTitle: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: TEXT,
    marginBottom: 6,
    textAlign: "center",
  },
  benefitDesc: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: MUTED,
    textAlign: "center",
    lineHeight: 20,
  },
});