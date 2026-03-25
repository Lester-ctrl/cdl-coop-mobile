import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SimpleNavbar() {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push("/account-officer/home")}>
        <Ionicons name="home-outline" size={24} color="#fff" />
        <Text style={styles.item}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/account-officer/members")}>
        <Ionicons name="people-outline" size={24} color="#fff" />
        <Text style={styles.item}>Members</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/account-officer/accounts")}
      >
        <Ionicons name="card-outline" size={24} color="#fff" />
        <Text style={styles.item}>Accounts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/account-officer/loan-management")}
      >
        <Ionicons name="cash-outline" size={24} color="#fff" />
        <Text style={styles.item}>Loans</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/account-officer/products-services")}
      >
        <Ionicons name="grid" size={24} color="#fff" />
        <Text style={styles.item}>Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/account-officer/payments-collections")}
      >
        <Ionicons name="wallet-outline" size={24} color="#fff" />
        <Text style={styles.item}>Payments</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/account-officer/reports-statement")}
      >
        <Ionicons name="document-text-outline" size={24} color="#fff" />
        <Text style={styles.item}>Reports</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#1c3faa",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    zIndex: 1000,
  },
  item: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
    marginTop: 2,
    textAlign: "center",
    flex: 1,
  },
});
