import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Array of products/services
const productsServices = [
  { label: "Loan", icon: "cash-outline", router: "../loan-management" },
  { label: "Reports", icon: "document-text-outline", router: "../reports-statement" },
  { label: "Payments", icon: "card-outline", router: "../payments-collections" },
];

export default function ProductsServices() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Products & Services</Text>
      </View>

      {/* Products Grid */}
      <View style={styles.container}>
        <View style={styles.grid}>
          {productsServices.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.gridItem}
              activeOpacity={0.7}
              onPress={() => router.push(item.router)}
            >
              <View style={styles.iconBox}>
                <Ionicons name={item.icon} size={28} color="#0d8147" />
              </View>
              <Text style={styles.gridText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 56,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    marginBottom: 16,
    width: "100%",
    backgroundColor: "#099a1c",
    position: "relative",
    zIndex: 200,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#e9eaeb",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  iconBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 8,
    marginTop: 10,
  },
  gridText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0a2708",
    textAlign: "center",
  },
});