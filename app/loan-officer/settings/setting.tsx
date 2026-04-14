import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoanOfficerSettings() {
  const { clearSession } = useAuth();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await clearSession();
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2D5016", "#48a019", "#51b61a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Configure your preferences and account details.
        </Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/loan-officer/profiles/profile")}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="person-outline" size={22} color="#48a019" />
          </View>
          <Text style={styles.itemText}>Profile</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#94a3b8"
            style={styles.chevron}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity
          style={[styles.item, styles.logoutItem]}
          onPress={handleLogout}
        >
          <View style={[styles.iconCircle, styles.logoutIconCircle]}>
            <Ionicons name="log-out-outline" size={22} color="#ef4444" />
          </View>
          <Text style={[styles.itemText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 56,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 4,
    letterSpacing: 1,
  },
  subtitle: {
    color: "#D4EDD8",
    fontSize: 14,
    marginTop: 6,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "700",
    marginLeft: 16,
    marginBottom: 4,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    borderRadius: 12,
  },
  itemText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "500",
    flex: 1,
  },
  chevron: {
    marginLeft: "auto",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 4,
  },
  logoutIconCircle: {
    backgroundColor: "#fee2e2",
  },
  logoutText: {
    color: "#ef4444",
  },
});
