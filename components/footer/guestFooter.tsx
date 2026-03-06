import {
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

export default function GuestFooter() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.footer}>
      {/* Brand */}
      <View style={styles.footerBrand}>
        <View style={styles.footerLogoBox}>
          <Ionicons name="business" size={20} color="#fff" />
        </View>
        <View style={styles.footerBrandTextBlock}>
          <Text style={styles.footerBrandName}>Community Cooperative</Text>
          <Text style={styles.footerBrandTagline}>
            Empowering community through financial cooperation
          </Text>
        </View>
      </View>

      <View style={styles.footerDivider} />

      {/* Links */}
      <View style={styles.footerLinks}>
        <View style={styles.footerCol}>
          <Text style={styles.footerColTitle}>QUICK LINKS</Text>
          {QUICK_LINKS.map((item) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.7}
              onPress={() => router.push(item.route as any)}
            >
              <Text style={styles.footerLink}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footerCol}>
          <Text style={styles.footerColTitle}>RESOURCES</Text>
          {RESOURCES.map((item) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.7}
              onPress={() => router.push(item.route as any)}
            >
              <Text style={styles.footerLink}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footerDivider} />

      {/* Get In Touch */}
      <Text style={styles.footerColTitle}>GET IN TOUCH</Text>
      <View style={styles.footerContact}>
        <View style={styles.footerContactRow}>
          <Ionicons name="mail-outline" size={15} color="#93A8D8" style={styles.footerContactIcon} />
          <Text style={styles.footerContactText}>info@community-coop.com</Text>
        </View>
        <View style={styles.footerContactRow}>
          <Ionicons name="call-outline" size={15} color="#93A8D8" style={styles.footerContactIcon} />
          <Text style={styles.footerContactText}>(123) 456-7890</Text>
        </View>
        <View style={styles.footerContactRow}>
          <Ionicons name="time-outline" size={15} color="#93A8D8" style={styles.footerContactIcon} />
          <Text style={styles.footerContactText}>Mon-Fri 9AM–5PM</Text>
        </View>
      </View>

      <View style={styles.footerDivider} />
      <Text style={styles.footerCopy}>© 2024 Community Cooperative. All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#1E3A7A",
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
  footerBrandTextBlock: {
    flex: 1,
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