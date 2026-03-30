import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const productsServices = [
  { label: "Savings Account", icon: "cash-outline" , router: "accounts"},
  { label: "Membership Registration", icon: "person-add-outline" },
  { label: "Reward Points", icon: "gift-outline" },
  { label: "Fund Transfers", icon: "swap-horizontal-outline" },
];

export default function ProductsServices() {
  return (
    <ScrollView  showsVerticalScrollIndicator={false}>
      
              {/* HEADER */}
                  <View style={styles.header}>
                    <View
                      style={{
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <View style={{ flex: 1 }}>
                         <Text style={styles.title}>Products & Services</Text>
              
                      </View>
                    </View>
                  </View>

<View style={styles.container}  >
      <View style={styles.grid} >
        {productsServices.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.gridItem}
            activeOpacity={0.7}
          >
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={28} color="#0d8147" />
            </View>
            <Text style={styles.gridText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Loan Section */}
      <View style={{ marginTop: 30 }}>
        <Text style={styles.sectionTitle}>Loan</Text>

        <TouchableOpacity
          style={styles.gridItem}
          activeOpacity={0.7}
          onPress={() => router.push("/account-officer/loan-management")}
        >
          <View style={styles.iconBox}>
            <Ionicons name="cash-outline" size={28} color="#0d8147" />
          </View>
          <Text style={styles.gridText}>Loan Products</Text>
        </TouchableOpacity>
      </View>

      {/* Payments Section */}
      <View style={{ marginTop: 30 }}>
        <Text style={styles.sectionTitle}>Payments</Text>

        <TouchableOpacity
          style={styles.gridItem}
          activeOpacity={0.7}
          onPress={() => router.push("/account-officer/payments-collections")}
        >
          <View style={styles.iconBox}>
            <Ionicons name="card-outline" size={28} color="#0d8147" />
          </View>
          <Text style={styles.gridText}>Payments</Text>
        </TouchableOpacity>
      </View>

      {/* Reports Section */}
      <View style={{ marginTop: 30 }}>
        <Text style={styles.sectionTitle}>Reports</Text>

        <TouchableOpacity
          style={styles.gridItem}
          activeOpacity={0.7}
          onPress={() => router.push("/account-officer/reports-statement")}
        >
          <View style={styles.iconBox}>
            <Ionicons name="document-text-outline" size={28} color="#0d8147" />
          </View>
          <Text style={styles.gridText}>Report</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: "#f1f5f9",
    padding: 20, 
     
  },

  title: { fontSize: 24,
    fontWeight: "bold",
     marginBottom: 20
     },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
  },
   title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#e9eaeb",
    marginBottom: 26,
    textAlign: "center",
  },
  gridItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 20,
    marginTop:0,
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
   subtitle: {
    fontSize: 14,
    color: "#dfe1e4",
    marginBottom: 18,
    textAlign: "center",
  },
  gridText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0a2708",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 12,
  },
});