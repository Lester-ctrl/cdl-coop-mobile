import MemberNavbar from "@/components/navigations/memberNavbar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoanProducts() {
  const [openOne, setOpenOne] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);

  return (
    <>
      <MemberNavbar />

      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Loan Products</Text>
          <Text style={styles.headerSubtitle}>
            Flexible financing solutions tailored to your needs. From personal
            loans to business expansion, we have the right loan product for you.
          </Text>
        </View>

        {/* PERSONAL LOAN*/}
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View style={styles.iconBox}>
              <Ionicons name="person" size={20} color="#1a46a7" />
            </View>

            <View style={styles.aprBadge}>
              <Text style={styles.aprText}>5.5% - 8.5% APR</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>Personal Loan</Text>

          <Text style={styles.cardDescription}>
            Flexible personal loans for any purpose - from medical expenses to
            special occasions.
          </Text>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Up to $50,000</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Low interest rates</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Flexible terms up to 5 years</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Quick approval</Text>
          </View>
        </View>

        {/* //HOUSING LOAN// */}
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View style={styles.iconBox}>
              <Ionicons name="home" size={20} color="#1a46a7" />
            </View>

            <View style={styles.aprBadge}>
              <Text style={styles.aprText}>4.5% - 6.5% APR</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>Housing Loan</Text>

          <Text style={styles.cardDescription}>
            Make your dream home a raelity with our competitive housing loan
            packages.
          </Text>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Up to $500,000</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Long-term financing up to 25 years</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Competitve rates</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>No prepayment penalties</Text>
          </View>
        </View>

        {/* //BUSINESS LOAN//*/}
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View style={styles.iconBox}>
              <Ionicons name="business" size={20} color="#1a46a7" />
            </View>

            <View style={styles.aprBadge}>
              <Text style={styles.aprText}>6.0% - 9.0% APR</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>Business Loan</Text>

          <Text style={styles.cardDescription}>
            Grow your business with capital designed for entrepreneurs and
            enterprises.
          </Text>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Up to $200,000</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Business expansion support</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Flexible repayment</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.check}>✓</Text>
            <Text>Competitive rates</Text>
          </View>
        </View>

        {/* General Loan Requirements */}
        <Text style={styles.sectionTitle}>General Loan Requirements</Text>

        {/* Accordion 1 */}
        <TouchableOpacity
          style={styles.accordion}
          onPress={() => setOpenOne(!openOne)}
        >
          <Text style={styles.accordionTitle}>For All Members</Text>
          <Ionicons name={openOne ? "chevron-up" : "chevron-down"} size={20} />
        </TouchableOpacity>

        {openOne && (
          <View style={styles.accordionContent}>
            <Text>• Valid ID</Text>
            <Text>• Proof of Income</Text>
            <Text>• Membership Certificate</Text>
          </View>
        )}

        {/* Accordion 2 */}
        <TouchableOpacity
          style={styles.accordion}
          onPress={() => setOpenTwo(!openTwo)}
        >
          <Text style={styles.accordionTitle}>Additional Documents</Text>
          <Ionicons name={openTwo ? "chevron-up" : "chevron-down"} size={20} />
        </TouchableOpacity>

        {openTwo && (
          <View style={styles.accordionContent}>
            <Text>• Barangay Clearance</Text>
            <Text>• Collateral Documents</Text>
          </View>
        )}

        {/* Ready to Apply Card */}
        <LinearGradient
          colors={["#2f5fd0", "#1a46a7"]}
          style={styles.applyCard}
        >
          <Text style={styles.applyTitle}>Ready to Apply?</Text>
          <Text style={styles.applyText}>
            Use our loan calculator to estimate your monthly payments or contact
            us to discuss your loan needs.
          </Text>

          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Calculate Loan →</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </>
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
    marginBottom: 10,
  },
  headerSubtitle: {
    color: "#dbeafe",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: -10,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  iconBox: {
    backgroundColor: "#dbeafe",
    padding: 15,
    borderRadius: 12,
  },
  iconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
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
    marginRight: 8,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },

  accordion: {
    backgroundColor: "#f3f4f6",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  accordionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  accordionContent: {
    marginHorizontal: 25,
    marginBottom: 10,
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
});
