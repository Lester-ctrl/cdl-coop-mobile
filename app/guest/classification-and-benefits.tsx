import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ClassificationAndBenefits() {
  return (
    <ScrollView>
      <View>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Membership Classification</Text>
          <Text style={styles.headerSubtitle}>
            Unlock greater bebefits as you grow your share capital investment.
          </Text>
        </View>

        {/* Bronze Member*/}
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View style={styles.iconBox}>
              <Ionicons name="star" size={20} color="#eb9411" />
            </View>

            <View>
              <Text style={styles.cardTitle}>Bronze Member</Text>
              <Text style={styles.cardDescription}>
                Share Capital:$500-$2,500
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>All regular member benefits</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Standard Loan limits</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Basic financial counseling</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Access to all savings products</Text>
          </View>
        </View>

        {/* Silver Member*/}
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View style={[styles.iconBox, styles.silver]}>
              <Ionicons name="gift" size={20} color="#797774" />
            </View>

            <View>
              <Text style={styles.cardTitle}>Silver Member</Text>
              <Text style={styles.cardDescription}>
                Share Capital:$2,501-$10,000
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>All Broze benefits</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Increase loan limits (20% high )</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Priority customer service</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Preferential interest rates</Text>
          </View>
        </View>

        {/* Gold Member*/}
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View style={[styles.iconBox, styles.silver, styles.gold]}>
              <Ionicons name="medal-outline" size={20} color="#af5f09" />
            </View>

            <View>
              <Text style={styles.cardTitle}>Gold Member</Text>
              <Text style={styles.cardDescription}>
                Share Capital:$10,501 and above
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>All Silver benefits</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Maximum loan limits (40% high )</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>VIP customer service</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Quarterly financial planning sessions</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Exclusive investment opportunities</Text>
          </View>
        </View>
      </View>

      {/* ready to apply */}
      <LinearGradient colors={["#2f5fd0", "#1a46a7"]} style={styles.applyCard}>
        <Text style={styles.applyTitle}>Ready to Upgrade?</Text>
        <Text style={styles.applyText}>
          increase your share capital contribution to unlock higher benefits and
          better rates
        </Text>

        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now →</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Community */}
      <View style={styles.container}>
        <View style={styles.row}>
          {/* Left Section */}
          <View style={styles.left}>
            <View style={styles.logoRow}>
              <Ionicons name="business" size={18} color="#fff" />
              <Text style={styles.title}>Community Cooperative</Text>
            </View>

            <Text style={styles.subtitle}>
              Empowering our community through financial cooperation and mutual
              support.
            </Text>
          </View>

          {/* Links Section */}
          <View style={styles.linksContainer}>
            <View style={styles.linksColumn}>
              <Text style={styles.sectionTitle}>QUICK LINKS</Text>
              <Text style={styles.link}>About Us</Text>
              <Text style={styles.link}>Membership</Text>
              <Text style={styles.link}>Products</Text>
              <Text style={styles.link}>Loan Calculator</Text>
            </View>

            <View style={styles.linksColumn}>
              <Text style={styles.sectionTitle}>GET IN TOUCH</Text>
              <View style={styles.contactRow}>
                <Ionicons name="mail" size={14} color="#fff" />
                <Text style={styles.link}>info@comm-coop.com</Text>
              </View>
              <View style={styles.contactRow}>
                <Ionicons name="call" size={14} color="#fff" />
                <Text style={styles.link}>(123) 456-7890</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.footerBottom}>
          © 2026 COMMUNITY COOPERATI VE. ALL RIGHTS RESERVED.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    backgroundColor: "#1a46a7",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  headerSubtitle: {
    color: "#dbeafe",
    fontSize: 14,
  },

  //   Broze Member
  card: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: -10,
    borderRadius: 20,
    padding: 30,
    elevation: 5,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
    paddingLeft: 10,
    gap: 12,
  },
  iconBox: {
    backgroundColor: "#edbe6cb0",
    padding: 15,
    borderRadius: 12,
  },
  iconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#c5d513",
  },
  silver: {
    backgroundColor: "#7a7a8434",
  },
  gold: {
    backgroundColor: "#c693064c",
  },
  aprBadge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  aprText: {
    color: "#2563eb",
    fontWeight: "600",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    color: "#6b7280",
    marginBottom: 15,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  check: {
    color: "#2563eb",
    marginRight: 10,
    fontWeight: "bold",

    backgroundColor: "#174dc2",
    borderRadius: 12,
    width: 18,
    height: 18,
    textAlign: "center",
    lineHeight: 18,
    color: "white",
  },

  applyCard: {
    margin: 20,
    borderRadius: 25,
    padding: 25,
  },

  applyTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  applyText: {
    color: "#dbeafe",
    marginBottom: 20,
  },

  applyButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: "center",
  },

  applyButtonText: {
    color: "#1a46a7",
    fontWeight: "bold",
    fontSize: 16,
  },
  // community
  container: {
    backgroundColor: "#1f3c88",
    padding: 24,
    flex: 1,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 24,
  },
  left: {
    flex: 1.2,
    minWidth: 220,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    color: "#d6e4ff",
    fontSize: 13,
    lineHeight: 18,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 32,
  },
  linksColumn: {
    minWidth: 160,
  },
  sectionTitle: {
    color: "white",
    fontSize: 13,
    letterSpacing: 1,
    marginBottom: 14,
    fontWeight: "600",
  },
  link: {
    color: "#d6e4ff",
    fontSize: 13,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  footerBottom: {
    color: "#d6e4ff",
    fontSize: 11,
    marginTop: 28,
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
