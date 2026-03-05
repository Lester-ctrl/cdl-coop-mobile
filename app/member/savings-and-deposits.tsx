import MemberNavbar from "@/components/navigations/memberNavbar";
import {
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

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
          {/* Tag */}
          <View style={styles.tag}>
            <Text style={styles.tagText}>Grow Your Wealth</Text>
          </View>

          {/* Title */}
          <Text style={styles.heroTitle}>Savings & Deposits</Text>

          {/* Description */}
          <Text style={styles.heroDesc}>
            Secure your financial future with our range of savings and deposit
            products. Enjoy competitive interest rates and the security of
            cooperative banking.
          </Text>
        </LinearGradient>

        {/* ── Content area ── */}
        <View style={styles.content}>
          {/* Add product cards here */}
        </View>

      </ScrollView>
    </>
  );
}

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

  /* Tag pill */
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

  /* Title */
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    lineHeight: 38,
    marginBottom: 14,
    letterSpacing: -0.3,
  },

  /* Description */
  heroDesc: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },

  /* ── Content ── */
  content: {
    padding: 16,
    paddingBottom: 40,
  },
});