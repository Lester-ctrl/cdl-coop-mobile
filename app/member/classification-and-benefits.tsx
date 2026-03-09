import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const BLUE = "#2952CC";
const BLUE_DARK = "#1a3aab";
const BLUE_LIGHT = "#EEF2FF";

const TIERS = [
  {
    key: "bronze",
    label: "Bronze Member",
    range: "Share Capital: ₱500 – ₱2,500",
    icon: "star" as const,
    iconColor: "#D97706",
    iconBg: "#FEF3C7",
    features: [
      "All regular member benefits",
      "Standard loan limits",
      "Basic financial counseling",
      "Access to all savings products",
    ],
  },
  {
    key: "silver",
    label: "Silver Member",
    range: "Share Capital: ₱2,501 – ₱10,000",
    icon: "gift" as const,
    iconColor: "#6B7280",
    iconBg: "#F3F4F6",
    features: [
      "All Bronze benefits",
      "Increased loan limits (20% higher)",
      "Priority customer service",
      "Preferential interest rates",
    ],
  },
  {
    key: "gold",
    label: "Gold Member",
    range: "Share Capital: ₱10,001 and above",
    icon: "medal" as const,
    iconColor: "#B45309",
    iconBg: "#FEF9C3",
    features: [
      "All Silver benefits",
      "Maximum loan limits (40% higher)",
      "VIP customer service",
      "Quarterly financial planning sessions",
      "Exclusive investment opportunities",
    ],
  },
];

export default function ClassificationAndBenefits() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView
      style={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Hero ── */}
      <View style={styles.hero}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>MEMBER BENEFITS</Text>
        </View>
        <Text style={styles.heroTitle}>Membership{"\n"}Classifications</Text>
        <Text style={styles.heroSubtitle}>
          Unlock greater benefits as you grow your share capital investment.
        </Text>
      </View>

      {/* ── Tier Cards ── */}
      <View style={styles.cardsWrapper}>
        {TIERS.map((tier) => (
          <View key={tier.key} style={styles.card}>
            {/* Top Row */}
            <View style={styles.cardTopRow}>
              <View style={[styles.iconBox, { backgroundColor: tier.iconBg }]}>
                <Ionicons name={tier.icon} size={22} color={tier.iconColor} />
              </View>
              <View style={styles.cardTitleBlock}>
                <Text style={styles.cardTitle}>{tier.label}</Text>
                <Text style={styles.cardRange}>{tier.range}</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.cardDivider} />

            {/* Features */}
            {tier.features.map((feature, fi) => (
              <View key={fi} style={styles.featureRow}>
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={11} color="#fff" />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  /* ── Hero ── */
  hero: {
    backgroundColor: BLUE,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 48,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.45)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 18,
  },
  heroBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 1.2,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 34,
    fontFamily: "Poppins_800ExtraBold",
    lineHeight: 44,
    marginBottom: 12,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.82)",
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
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardTitleBlock: {
    flex: 1,
  },
  cardTitle: {
    color: "#111827",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    marginBottom: 2,
  },
  cardRange: {
    color: "#6B7280",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 14,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  featureText: {
    color: "#374151",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    flex: 1,
    lineHeight: 20,
  },

  /* ── CTA ── */
  ctaWrapper: {
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 24,
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
    color: "rgba(255,255,255,0.82)",
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