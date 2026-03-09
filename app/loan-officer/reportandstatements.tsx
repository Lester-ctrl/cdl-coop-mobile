import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReportAndStatement() {
  const menu = [
    {
      title: "Record Partial Payments",
      icon: "cash-outline",
      route: "/loan-officer/loan-management/partial-payments",
    },
    {
      title: "View Payment History",
      icon: "time-outline",
      route: "/loan-officer/loan-management/partial-payments",
    },
    {
      title: "Approve Loan Applications",
      icon: "document-text-outline",
      route: "/loan-officer/loan-management/applications",
    },
    {
      title: "Reject Loans",
      icon: "close-circle-outline",
      route: "/loan-officer/loan-management/applications",
    },
    {
      title: "Modify Loan Terms",
      icon: "create-outline",
      route: "/loan-officer/loan-management/active-loans",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={["#1e3a8a", "#2563eb", "#60a5fa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Loan Officer</Text>
        <Text style={styles.headerSubtitle}>
          Manage loans, applications and payments
        </Text>
      </LinearGradient>

      <View style={styles.section}>
        {menu.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(item.route)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={22} color="#2563eb" />
            </View>

            <Text style={styles.cardText}>{item.title}</Text>

            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },

  headerSubtitle: {
    fontSize: 15,
    color: "#e0e7ff",
  },

  section: {
    padding: 20,
    gap: 14,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 16,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    elevation: 3,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  cardText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
});
