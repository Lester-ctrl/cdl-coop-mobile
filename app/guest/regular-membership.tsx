import GuestFooter from "@/components/footer/guestFooter";
import {
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BLUE = "#2952CC";
const BLUE_DARK = "#1a3aab";
const BLUE_LIGHT = "#EEF2FF";

const BENEFITS: { icon: keyof typeof Ionicons.glyphMap; title: string; desc: string }[] = [
  {
    icon: "trending-up",
    title: "Competitive Rates",
    desc: "Access to loans with lower interest rates and savings with higher returns.",
  },
  {
    icon: "shield-checkmark",
    title: "Financial Security",
    desc: "Your deposits are insured and your financial well-being is our priority.",
  },
  {
    icon: "cash",
    title: "Member Dividends",
    desc: "Share in the cooperative's success through annual dividend distributions.",
  },
  {
    icon: "people",
    title: "Community Support",
    desc: "Be part of a community that supports local development and prosperity.",
  },
];

const MEMBERSHIP_TYPES = [
  {
    icon: "person" as keyof typeof Ionicons.glyphMap,
    title: "Regular Member",
    minLabel: "₱500 MINIMUM",
    minColor: "#2952CC",
    minBg: "#EEF2FF",
    desc: "Full membership with voting rights and access to all products and services.",
    requirements: [
      "Must be at least 18 years old",
      "Philippine citizen or resident",
      "Good moral character",
      "Completed orientation seminar",
    ],
  },
  {
    icon: "people" as keyof typeof Ionicons.glyphMap,
    title: "Associate Member",
    minLabel: "₱250 MINIMUM",
    minColor: "#7C3AED",
    minBg: "#F3EEFF",
    desc: "Limited membership for those who cannot meet regular membership requirements.",
    requirements: [
      "Employees of member organizations",
      "Immediate family of regular members",
      "Students (16–18 years old)",
      "Completed orientation seminar",
    ],
  },
];

const RIGHTS = [
  {
    role: "As a Regular Member, you can:",
    items: [
      "Vote in annual general assemblies",
      "Run for board positions",
      "Access all loan products",
      "Open all types of savings accounts",
      "Receive annual dividends",
      "Attend member education seminars",
      "Participate in all cooperative programs",
    ],
  },
  {
    role: "As an Associate Member, you can:",
    items: [
      "Access selected loan products",
      "Open savings accounts",
      "Attend member seminars",
      "Upgrade to regular membership",
      "Receive patronage refunds",
      "Participate in cooperative events",
    ],
  },
];

export default function MembershipScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

      {/* ── Hero ── */}
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Join Our Community</Text>
        </View>
        <Text style={styles.headline}>Membership{"\n"}Information</Text>
        <Text style={styles.subtitle}>
          Become part of a thriving community cooperative dedicated to your
          financial success. Experience the benefits of member-owned banking.
        </Text>
        <TouchableOpacity
          style={styles.applyButton}
          activeOpacity={0.85}
          onPress={() => router.push("/guest/apply-now" as any)}
        >
          <Text style={styles.applyButtonText}>Apply Now →</Text>
        </TouchableOpacity>
      </View>

      {/* ── Member Benefits ── */}
      <View style={styles.benefitsSection}>
        <Text style={styles.benefitsTitle}>Member Benefits</Text>
        <Text style={styles.benefitsSubtitle}>
          Enjoy exclusive advantages designed for our valued members
        </Text>
        <View style={styles.benefitsList}>
          {BENEFITS.map((benefit, index) => (
            <View key={index} style={styles.benefitCard}>
              <View style={styles.benefitIconBox}>
                <Ionicons name={benefit.icon} size={24} color={BLUE} />
              </View>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={styles.benefitDesc}>{benefit.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── Types of Membership ── */}
      <View style={styles.typesSection}>
        <Text style={styles.typesTitle}>Types of Membership</Text>
        <Text style={styles.typesSubtitle}>
          Choose the membership type that best fits your situation
        </Text>
        <View style={styles.typesList}>
          {MEMBERSHIP_TYPES.map((type, index) => (
            <View key={index} style={styles.typeCard}>
              <View style={styles.typeIconBox}>
                <Ionicons name={type.icon} size={24} color={BLUE} />
              </View>
              <Text style={styles.typeTitle}>{type.title}</Text>
              <View style={[styles.minBadge, { backgroundColor: type.minBg }]}>
                <Text style={[styles.minLabel, { color: type.minColor }]}>{type.minLabel}</Text>
              </View>
              <Text style={styles.typeDesc}>{type.desc}</Text>
              <View style={styles.typeDivider} />
              <Text style={styles.reqLabel}>Requirements:</Text>
              {type.requirements.map((req, ri) => (
                <View key={ri} style={styles.reqRow}>
                  <View style={styles.reqCheckCircle}>
                    <Ionicons name="checkmark" size={11} color={BLUE} />
                  </View>
                  <Text style={styles.reqText}>{req}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* ── Member Rights & Privileges ── */}
      <View style={styles.rightsSection}>
        <Text style={styles.rightsTitle}>Member Rights & Privileges</Text>
        {RIGHTS.map((group, gi) => (
          <View key={gi} style={styles.rightsCard}>
            <Text style={styles.rightsRole}>{group.role}</Text>
            {group.items.map((item, ii) => (
              <View key={ii} style={styles.rightsRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={BLUE}
                  style={{ marginRight: 10, marginTop: 1, flexShrink: 0 }}
                />
                <Text style={styles.rightsItem}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* ── Ready to Join CTA ── */}
      <View style={styles.ctaSection}>
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready to Join?</Text>
          <Text style={styles.ctaSubtitle}>
            Learn more about the membership process or start your application today.
          </Text>
          <TouchableOpacity
            style={styles.ctaPrimary}
            activeOpacity={0.85}
            onPress={() => router.push("/guest/apply-now" as any)}
          >
            <Text style={styles.ctaPrimaryText}>Apply Now →</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ctaSecondary}
            activeOpacity={0.85}
            onPress={() => router.push("/guest/contact-us" as any)}
          >
            <Text style={styles.ctaSecondaryText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Footer ── */}
      <GuestFooter />

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
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 52,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.45)",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginBottom: 28,
  },
  badgeText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  headline: {
    color: "#fff",
    fontSize: 42,
    fontFamily: "Poppins_800ExtraBold",
    lineHeight: 52,
    marginBottom: 20,
  },
  subtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    lineHeight: 26,
    marginBottom: 40,
  },
  applyButton: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  applyButtonText: {
    color: BLUE_DARK,
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },

  /* ── Member Benefits ── */
  benefitsSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 40,
  },
  benefitsTitle: {
    color: "#111827",
    fontSize: 24,
    fontFamily: "Poppins_800ExtraBold",
    textAlign: "center",
    marginBottom: 8,
  },
  benefitsSubtitle: {
    color: "#6B7280",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  benefitsList: {
    gap: 16,
  },
  benefitCard: {
    backgroundColor: "#F8F9FB",
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  benefitIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: BLUE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  benefitTitle: {
    color: "#111827",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  benefitDesc: {
    color: "#6B7280",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    lineHeight: 21,
  },

  /* ── Types of Membership ── */
  typesSection: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 40,
  },
  typesTitle: {
    color: "#111827",
    fontSize: 24,
    fontFamily: "Poppins_800ExtraBold",
    textAlign: "center",
    marginBottom: 8,
  },
  typesSubtitle: {
    color: "#6B7280",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  typesList: {
    gap: 16,
  },
  typeCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  typeIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: BLUE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  typeTitle: {
    color: "#111827",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginBottom: 8,
  },
  minBadge: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 14,
  },
  minLabel: {
    fontSize: 12,
    fontFamily: "Poppins_700Bold",
  },
  typeDesc: {
    color: "#6B7280",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    lineHeight: 21,
    marginBottom: 18,
  },
  typeDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 16,
  },
  reqLabel: {
    color: "#111827",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    marginBottom: 12,
  },
  reqRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  reqCheckCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BLUE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  reqText: {
    color: "#374151",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    flex: 1,
    lineHeight: 20,
  },

  /* ── Member Rights & Privileges ── */
  rightsSection: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  rightsTitle: {
    color: "#111827",
    fontSize: 24,
    fontFamily: "Poppins_800ExtraBold",
    marginBottom: 20,
    textAlign: "center",
  },
  rightsCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  rightsRole: {
    color: "#111827",
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
    marginBottom: 16,
    lineHeight: 22,
  },
  rightsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  rightsItem: {
    color: "#374151",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    flex: 1,
    lineHeight: 20,
  },

  /* ── CTA Section ── */
  ctaSection: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  ctaCard: {
    backgroundColor: BLUE,
    borderRadius: 24,
    padding: 28,
  },
  ctaTitle: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Poppins_800ExtraBold",
    textAlign: "center",
    marginBottom: 10,
  },
  ctaSubtitle: {
    color: "rgba(255,255,255,0.80)",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  ctaPrimary: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 12,
  },
  ctaPrimaryText: {
    color: BLUE_DARK,
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
  },
  ctaSecondary: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  ctaSecondaryText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
});