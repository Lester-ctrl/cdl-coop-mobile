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

const STEPS: {
  icon: keyof typeof Ionicons.glyphMap;
  step: string;
  title: string;
  desc: string;
  items: string[];
}[] = [
  {
    icon: "school",
    step: "Step 1",
    title: "Attend Orientation",
    desc: "Join our free membership orientation seminar to learn about cooperative principles and member benefits.",
    items: [
      "Available online and in-person",
      "Every Saturday at 10 AM",
      "Duration: 2 hours",
      "Certificate provided",
    ],
  },
  {
    icon: "document-text",
    step: "Step 2",
    title: "Prepare Documents",
    desc: "Gather all required documents for your membership application.",
    items: [
      "Valid government ID (2 copies)",
      "Proof of address",
      "2×2 ID photos (2 pcs)",
      "Birth certificate (optional)",
    ],
  },
  {
    icon: "cash",
    step: "Step 3",
    title: "Pay Initial Contribution",
    desc: "Make your initial share capital contribution and membership fee.",
    items: [
      "Share capital: ₱500 (Reg) / ₱250 (Assoc)",
      "Membership fee: ₱25",
      "Payment via cash, check, or bank transfer",
      "Receipt will be issued",
    ],
  },
  {
    icon: "checkmark-circle",
    step: "Step 4",
    title: "Submit & Get Approved",
    desc: "Submit your complete application and await approval from the board.",
    items: [
      "Processing time: 5–7 business days",
      "Email/SMS notification upon approval",
      "Receive member ID and passbook",
      "Start enjoying benefits immediately",
    ],
  },
];


const CHECKLIST: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  items: string[];
}[] = [
  {
    icon: "document-text",
    title: "Required Documents",
    items: [
      "Accomplished application form",
      "Orientation certificate",
      "Valid government ID (2 photocopies)",
      "2×2 ID photos (2 pieces)",
      "Proof of billing address",
    ],
  },
  {
    icon: "card",
    title: "Payment Requirements",
    items: [
      "Share capital contribution",
      "Membership fee (₱25)",
      "Initial deposit (optional)",
    ],
  },
];

export default function HowToJoin() {
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
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>SIMPLE PROCESS</Text>
        </View>
        <Text style={styles.heroTitle}>How to Become{"\n"}a Member</Text>
        <Text style={styles.heroSubtitle}>
          Join our cooperative in 4 simple steps. Start your journey to
          financial empowerment today.
        </Text>
      </View>

      {/* ── Steps ── */}
      <View style={styles.stepsSection}>
        {STEPS.map((step, index) => (
          <View key={index} style={styles.stepWrapper}>
            {/* Connector line (not for last step) */}
            {index < STEPS.length - 1 && <View style={styles.connector} />}

            <View style={styles.stepCard}>
              {/* Icon + Step label row */}
              <View style={styles.stepTopRow}>
                <View style={styles.stepIconBox}>
                  <Ionicons name={step.icon} size={24} color={BLUE} />
                </View>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>{step.step}</Text>
                </View>
              </View>

              {/* Title & Description */}
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>

              {/* Divider */}
              <View style={styles.stepDivider} />

              {/* Checklist */}
              {step.items.map((item, ii) => (
                <View key={ii} style={styles.checkRow}>
                  <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={11} color={BLUE} />
                  </View>
                  <Text style={styles.checkText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>


      {/* ── Application Checklist ── */}
      <View style={styles.checklistSection}>
        <Text style={styles.checklistTitle}>Application Checklist</Text>
        {CHECKLIST.map((group, gi) => (
          <View key={gi} style={styles.checklistCard}>
            <View style={styles.checklistGroupHeader}>
              <View style={styles.checklistGroupIcon}>
                <Ionicons name={group.icon} size={20} color={BLUE} />
              </View>
              <Text style={styles.checklistGroupTitle}>{group.title}</Text>
            </View>
            <View style={styles.checklistDivider} />
            {group.items.map((item, ii) => (
              <View key={ii} style={styles.checklistRow}>
                <View style={styles.checklistBullet}>
                  <Ionicons name="checkmark" size={12} color={BLUE} />
                </View>
                <Text style={styles.checklistItem}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* ── CTA ── */}
      <View style={styles.ctaSection}>
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready to Start?</Text>
          <Text style={styles.ctaSubtitle}>
            Begin your membership journey today and experience the benefits of
            cooperative banking.
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
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.45)",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginBottom: 28,
  },
  heroBadgeText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    letterSpacing: 1.2,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 42,
    fontFamily: "Poppins_800ExtraBold",
    lineHeight: 52,
    marginBottom: 20,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    lineHeight: 26,
    marginBottom: 40,
  },

  /* ── Steps ── */
  stepsSection: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 8,
  },
  stepWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  connector: {
    position: "absolute",
    left: 34,
    bottom: -16,
    width: 2,
    height: 16,
    backgroundColor: BLUE_LIGHT,
    zIndex: 0,
  },
  stepCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    zIndex: 1,
  },
  stepTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  stepIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: BLUE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBadge: {
    backgroundColor: BLUE_LIGHT,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  stepBadgeText: {
    color: BLUE,
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  stepTitle: {
    color: "#111827",
    fontSize: 19,
    fontFamily: "Poppins_700Bold",
    marginBottom: 6,
  },
  stepDesc: {
    color: "#6B7280",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    lineHeight: 20,
    marginBottom: 16,
  },
  stepDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 14,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BLUE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  checkText: {
    color: "#374151",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    flex: 1,
    lineHeight: 20,
  },


  /* ── Application Checklist ── */
  checklistSection: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 8,
  },
  checklistTitle: {
    color: "#111827",
    fontSize: 22,
    fontFamily: "Poppins_800ExtraBold",
    marginBottom: 16,
    textAlign: "center"
  },
  checklistCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  checklistGroupHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  checklistGroupIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  checklistGroupTitle: {
    color: "#111827",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  checklistDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 14,
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  checklistBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  checklistItem: {
    color: "#374151",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    flex: 1,
    lineHeight: 20,
  },

  /* ── CTA ── */
  ctaSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
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