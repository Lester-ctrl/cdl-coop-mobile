import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      <Text style={styles.header}>Settings</Text>

      {/* profile */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/loan-officer/profiles/profile")}
      >
        <Ionicons name="person-outline" size={22} color="#4e6ac5" />
        <Text style={styles.itemText}>Profile</Text>
      </TouchableOpacity>
      {/* logout  */}
      <TouchableOpacity style={styles.item} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#ef4444" />
        <Text style={styles.itemText}>Logout</Text>
      </TouchableOpacity>
      {/* Add more settings options here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f7",
    padding: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 30,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  itemText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "500",
  },
});
