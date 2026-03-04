import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const actions = [
  { label: "Manage\nAccounts", icon: "wallet-outline" },
  { label: "Wallet", icon: "card-outline" },
  { label: "Open\nAccount", icon: "add-circle-outline" },
  { label: "Fund\nTransfer", icon: "swap-horizontal-outline" },
  { label: "Payments", icon: "cash-outline" },
  { label: "Apply\nLoan", icon: "cash-outline" },
  { label: "Rewards", icon: "gift-outline" },
];

export default function HomeScreen() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handlelogout = () => {
    setShowMenu(false);
    router.replace("/");
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setShowMenu(!showMenu)}
            style={styles.avatar}
          >
            <Image
              source={require("@/assets/images/profile-logo.png")}
              style={{ width: 42, height: 42, borderRadius: 21 }}
              contentFit="cover"
            />
          </TouchableOpacity>

          {showMenu && (
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={handlelogout} style={styles.menuItem}>
                <Ionicons name="log-out-outline" size={18} color="#0c2d83" />
                <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.greeting}>Good day,</Text>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.class}>CLASS A</Text>
        </View>

        {/* ACTION GRID */}
        <View style={styles.grid}>
          {actions.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.gridItem}>
              <View style={styles.iconBox}>
                <Ionicons name={item.icon as any} size={22} color="#0c2d83" />
              </View>
              <Text style={styles.gridText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* WHAT'S NEW */}
        <Text style={styles.sectionTitle}>Whats new</Text>

        <View style={styles.card}>
          <Image
            source={{
              uri: "<Blank></Blank>",
            }}
            style={styles.cardImage}
            contentFit="cover"
          />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f5fa",
  },

  header: {
    backgroundColor: "#1c3faa",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    position: "absolute",
    right: 20,
    top: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#fff",
  },

  greeting: {
    color: "#dbe3ff",
    fontSize: 16,
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  class: {
    color: "#c7d2ff",
    marginTop: 4,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },
  gridItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 20,
  },
  iconBox: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 6,
  },
  gridText: {
    textAlign: "center",
    fontSize: 12,
    color: "#1c2a4a",
  },

  sectionTitle: {
    marginHorizontal: 20,
    marginBottom: 10,
    fontWeight: "700",
    color: "#1c2a4a",
  },

  card: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
  },
  cardImage: {
    height: 140,
    width: "100%",
  },

  dropdown: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuText: {
    marginLeft: 12,
    color: "#0c2d83",
    fontWeight: "600",
  },
});
