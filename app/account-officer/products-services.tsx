import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const productsServices = [
  { label: "Savings Account", icon: "cash-outline" },
  { label: "Loan Products", icon: "card-outline" },
  { label: "Membership Registration", icon: "person-add-outline" },
  { label: "Reward Points", icon: "gift-outline" },
  { label: "Fund Transfers", icon: "swap-horizontal-outline" },
];

export default function ProductsServices() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Products & Services</Text>

      <View style={styles.grid}>
        {productsServices.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.gridItem}
            activeOpacity={0.7}
          >
            <View style={styles.iconBox}>
              <Ionicons name={item.icon as any} size={28} color="#1c3faa" />
            </View>
            <Text style={styles.gridText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: { width: "48%", alignItems: "center", marginBottom: 20 },
  iconBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 8,
  },
  gridText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1c3faa",
    textAlign: "center",
  },
});
