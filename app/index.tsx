import GuestFooter from "@/components/footer/guestFooter";
import GuestNavbar from "@/components/navigations/guestNavbar";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FEATURES: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
}[] = [
  {
    icon: "shield-checkmark",
    title: "Secure & Trusted",
    desc: "Your financial security is our top priority with industry-leading protection.",
  },
  {
    icon: "trending-up",
    title: "Competitive Rates",
    desc: "Enjoy attractive interest rates on loans and deposits designed for members.",
  },
  {
    icon: "people",
    title: "Member-Focused",
    desc: "Built by the community, for the community. Your success is our mission.",
  },
  {
    icon: "heart-circle",
    title: "Community Impact",
    desc: "Together we grow stronger, supporting local development and prosperity.",
  },
];

const SERVICES: {
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  desc: string;
  route: string;
}[] = [
  {
    icon: "card",
    iconBg: "#EEF2FF",
    iconColor: "#4F6EF7",
    title: "Flexible Loans",
    desc: "Personal, business, and emergency loans with flexible terms.",
    route: "/services/flexible-loans",
  },
  {
    icon: "wallet",
    iconBg: "#F0F4FF",
    iconColor: "#5B7BF8",
    title: "Savings & Deposits",
    desc: "Grow your wealth with competitive savings rates.",
    route: "/services/savings-deposits",
  },
  {
    icon: "calculator",
    iconBg: "#F3EEFF",
    iconColor: "#8B5CF6",
    title: "Loan Calculator",
    desc: "Calculate your monthly payments and plan ahead.",
    route: "/services/loan-calculator",
  },
  {
    icon: "person-add",
    iconBg: "#FFF0F6",
    iconColor: "#EC4899",
    title: "Become a Member",
    desc: "Join our growing community and unlock benefits.",
    route: "/services/become-a-member",
  },
];

const QUICK_LINKS: { label: string; route: string }[] = [
  { label: "About Us", route: "/guest/about-us" },
  { label: "Membership", route: "/guest/regular-membership" },
  { label: "Products & Services", route: "/guest/loan-products" },
  { label: "Loan Calculator", route: "/guest/loan-calculator" },
];

const RESOURCES: { label: string; route: string }[] = [
  { label: "News & Events", route: "/guest/news-events" },
  { label: "Promos", route: "/guest/promos" },
  { label: "Careers", route: "/guest/careers" },
  { label: "Contact Us", route: "/guest/contact-us" },
];

export default function IndexScreen() {
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
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <GuestNavbar />
      {/* Blue Hero Section */}
      <View style={styles.hero}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>Trusted by over 10,000 members</Text>
        </View>

        <Text style={styles.headline}>
          Your Community.{"\n"}Your Cooperative.{"\n"}Your Future.
        </Text>

        <Text style={styles.subheadline}>
          Join thousands of members who trust us with their financial goals.
          Together, we build a stronger, more prosperous community.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/auth/login")}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Become a Member →</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
          <Text style={styles.secondaryButtonText}>Explore Services</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>10K+</Text>
            <Text style={styles.statLabel}>ACTIVE MEMBERS</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>$50M+</Text>
            <Text style={styles.statLabel}>TOTAL ASSETS</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>25+</Text>
            <Text style={styles.statLabel}>YEARS OF SERVICE</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>99%</Text>
            <Text style={styles.statLabel}>MEMBER SATISFACTION</Text>
          </View>
        </View>
      </View>

      {/* Why Choose Us Section */}
      <View style={styles.whySection}>
        <Text style={styles.whyTitle}>Why Choose Us</Text>
        <Text style={styles.whySubtitle}>
          We're more than a financial institution —{"\n"}we're a community
          dedicated to your success.
        </Text>

        {FEATURES.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.featureIconBox}>
              <Ionicons name={feature.icon} size={24} color="#2952CC" />
            </View>
            <View style={styles.featureTextBlock}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Our Services Section */}
      <View style={styles.servicesSection}>
        <Text style={styles.servicesTitle}>Our Services</Text>
        <Text style={styles.servicesSubtitle}>
          Comprehensive financial solutions designed{"\n"}to meet your every
          need.
        </Text>

        <View style={styles.servicesGrid}>
          {SERVICES.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={styles.serviceCard}
              onPress={() => router.push(service.route as any)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.serviceIconBox,
                  { backgroundColor: service.iconBg },
                ]}
              >
                <Ionicons
                  name={service.icon}
                  size={22}
                  color={service.iconColor}
                />
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDesc}>{service.desc}</Text>
              <Text style={styles.serviceLearnMore}>Learn more →</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Ready to Get Started CTA */}
      <View style={styles.ctaSection}>
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
          <Text style={styles.ctaSubtitle}>
            Join our community today and experience the benefits of cooperative
            banking.
          </Text>

          <TouchableOpacity
            style={styles.ctaPrimary}
            onPress={() => router.push("/auth/login")}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaPrimaryText}>Apply for Membership →</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ctaSecondary} activeOpacity={0.85}>
            <Text style={styles.ctaSecondaryText}>Contact Agent</Text>
          </TouchableOpacity>
        </View>
      </View>

      <GuestFooter />
    </ScrollView>
  );
}

const BLUE = "#2952CC";
const BLUE_DARK = "#1a3aab";
const FOOTER_BG = "#1E3A7A";

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContent: {
    flexGrow: 1,
  },

  /* ── Blue Hero ── */
  hero: {
    backgroundColor: BLUE,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 40,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 28,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ADE80",
    marginRight: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  headline: {
    color: "#fff",
    fontSize: 36,
    fontFamily: "Poppins_800ExtraBold",
    lineHeight: 48,
    marginBottom: 16,
  },
  subheadline: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    lineHeight: 24,
    marginBottom: 36,
  },
  primaryButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: BLUE_DARK,
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  secondaryButton: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },

  /* ── Stats ── */
  statsSection: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "47.5%",
    alignItems: "flex-start",
  },
  statValue: {
    color: BLUE_DARK,
    fontSize: 28,
    fontFamily: "Poppins_800ExtraBold",
    marginBottom: 4,
  },
  statLabel: {
    color: "#6B7280",
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 0.8,
  },

  /* ── Why Choose Us ── */
  whySection: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 40,
  },
  whyTitle: {
    color: "#111827",
    fontSize: 26,
    fontFamily: "Poppins_800ExtraBold",
    textAlign: "center",
    marginBottom: 12,
  },
  whySubtitle: {
    color: "#6B7280",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 28,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F8F9FB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  featureIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#E8EDFB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    flexShrink: 0,
  },
  featureTextBlock: {
    flex: 1,
  },
  featureTitle: {
    color: "#111827",
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
    marginBottom: 4,
  },
  featureDesc: {
    color: "#6B7280",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    lineHeight: 20,
  },

  /* ── Our Services ── */
  servicesSection: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 40,
  },
  servicesTitle: {
    color: "#111827",
    fontSize: 26,
    fontFamily: "Poppins_800ExtraBold",
    textAlign: "center",
    marginBottom: 10,
  },
  servicesSubtitle: {
    color: "#6B7280",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    width: "47.5%",
  },
  serviceIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  serviceTitle: {
    color: "#111827",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    marginBottom: 6,
    lineHeight: 20,
  },
  serviceDesc: {
    color: "#6B7280",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    lineHeight: 18,
    marginBottom: 14,
  },
  serviceLearnMore: {
    color: BLUE,
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
  },

  /* ── CTA Section ── */
  ctaSection: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  ctaCard: {
    backgroundColor: BLUE,
    borderRadius: 20,
    padding: 28,
  },
  ctaTitle: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Poppins_800ExtraBold",
    marginBottom: 10,
    lineHeight: 32,
  },
  ctaSubtitle: {
    color: "rgba(255,255,255,0.80)",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    lineHeight: 22,
    marginBottom: 28,
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

  /* ── Footer ── */
  footer: {
    backgroundColor: FOOTER_BG,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 32,
  },
  footerBrand: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  footerLogoBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  footerBrandName: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
  footerBrandTagline: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
    marginTop: 2,
  },
  footerDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    marginVertical: 20,
  },
  footerLinks: {
    flexDirection: "row",
    gap: 32,
    marginBottom: 4,
  },
  footerCol: {
    flex: 1,
  },
  footerColTitle: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 1,
    marginBottom: 14,
  },
  footerLink: {
    color: "rgba(255,255,255,0.80)",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    marginBottom: 10,
  },
  footerContact: {
    gap: 12,
    marginTop: 4,
  },
  footerContactRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerContactIcon: {
    marginRight: 10,
  },
  footerContactText: {
    color: "rgba(255,255,255,0.80)",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  footerCopy: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
});
