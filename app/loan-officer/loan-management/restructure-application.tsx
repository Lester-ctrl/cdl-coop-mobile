import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const applications = [
  { id: 1, member: "Juan Dela Cruz", amount: "₱20,000", status: "Pending" },
  { id: 2, member: "Maria Santos", amount: "₱10,000", status: "For Review" },
  { id: 3, member: "Pedro Reyes", amount: "₱30,000", status: "Recommended" },
];

export default function Applications() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient
        colors={["#2D5016", "#48a019", "#51b61a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Loan Applications</Text>
        <Text style={styles.headerSubtitle}>
          Review, approve, recommend, or reject member loan requests.
        </Text>
      </LinearGradient>

      {/* APPLICATION LIST */}
      <View style={styles.appList}>
        {applications.map((app) => (
          <View key={app.id} style={styles.appCard}>
            <View style={styles.appHeader}>
              <Text style={styles.memberName}>{app.member}</Text>
              <View
                style={[
                  styles.statusBadge,
                  app.status === "Pending"
                    ? styles.badgePending
                    : app.status === "Recommended"
                      ? styles.badgeRecommended
                      : styles.badgeReview,
                ]}
              >
                <Text style={styles.badgeText}>{app.status}</Text>
              </View>
            </View>
            <Text style={styles.amount}>
              Amount: <Text style={styles.amountValue}>{app.amount}</Text>
            </Text>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() =>
                  router.push("./loan-officer/applications/review")
                }
              >
                <FontAwesome6 name="magnifying-glass" size={16} color="#fff" />
                <Text style={styles.primaryBtnText}>Review</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() =>
                  router.push("./loan-officer/applications/approve")
                }
              >
                <FontAwesome6 name="circle-check" size={16} color="#065f46" />
                <Text style={styles.secondaryBtnText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.recommendBtn}
                onPress={() =>
                  router.push("./loan-officer/applications/recommend")
                }
              >
                <FontAwesome6 name="star" size={16} color="#2D5016" />
                <Text style={styles.recommendBtnText}>Recommend</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rejectBtn}
                onPress={() =>
                  router.push("./loan-officer/applications/reject")
                }
              >
                <FontAwesome6 name="circle-xmark" size={16} color="#b91c1c" />
                <Text style={styles.rejectBtnText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4faf3",
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
  },
  headerSubtitle: {
    color: "#D4EDD8", // light green
    marginTop: 6,
    fontSize: 14,
  },
  appList: {
    paddingHorizontal: 18,
    marginTop: 18,
    paddingBottom: 30,
  },
  appCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#2D5016",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  appHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  memberName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e293b",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgePending: {
    backgroundColor: "#fde68a",
  },
  badgeRecommended: {
    backgroundColor: "#bbf7d0",
  },
  badgeReview: {
    backgroundColor: "#DCFCE7",
  },
  badgeText: {
    fontWeight: "700",
    fontSize: 12,
    color: "#22223b",
  },
  amount: {
    marginTop: 8,
    fontSize: 14,
    color: "#475569",
  },
  amountValue: {
    fontWeight: "800",
    color: "#2D5016",
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 14,
    gap: 8,
    flexWrap: "wrap",
  },
  primaryBtn: {
    backgroundColor: "#48a019",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  secondaryBtn: {
    backgroundColor: "#DCFCE7",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  secondaryBtnText: {
    color: "#2D5016",
    fontWeight: "700",
    fontSize: 12,
  },
  recommendBtn: {
    backgroundColor: "#ECFCCB",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  recommendBtnText: {
    color: "#2D5016",
    fontWeight: "700",
    fontSize: 12,
  },
  rejectBtn: {
    backgroundColor: "#fee2e2",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  rejectBtnText: {
    color: "#b91c1c",
    fontWeight: "700",
    fontSize: 12,
  },
  filterCard: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginTop: -25,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#2D5016", // green shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  noResult: {
    textAlign: "center",
    marginTop: 40,
    color: "#48a019",
    fontWeight: "600",
  },
  balanceAmount: {
    fontWeight: "800",
    color: "#48a019",
  },
  ghostBtnText: {
    color: "#2D5016", // green
    fontWeight: "700",
    fontSize: 12,
  },
  badgeActive: {
    backgroundColor: "#DCFCE7", // light green
  },
});
