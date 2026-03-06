import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoanOfficerProfile() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#2563eb", "#3b82f6"]} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <FontAwesome6 name="arrow-left" size={18} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* AVATAR */}
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatar} />
      </View>

      {/* PERSONAL DETAILS */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <FontAwesome6 name="user" size={16} color="#2563eb" />
          <Text style={styles.sectionTitle}>Personal Details</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>FIRST NAME</Text>
          <View style={styles.valueRow}>
            <FontAwesome6 name="user" size={14} color="#2563eb" />
            <Text style={styles.value}>John</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>MIDDLE NAME</Text>
          <View style={styles.valueRow}>
            <FontAwesome6 name="user" size={14} color="#2563eb" />
            <Text style={styles.value}>Quincy</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>LAST NAME</Text>
          <View style={styles.valueRow}>
            <FontAwesome6 name="user" size={14} color="#2563eb" />
            <Text style={styles.value}>Doe</Text>
          </View>
        </View>
      </View>

      {/* CONTACT INFORMATION */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <FontAwesome6 name="address-card" size={16} color="#22c55e" />
          <Text style={styles.sectionTitle}>Contact Information</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <View style={styles.valueRow}>
            <FontAwesome6 name="envelope" size={14} color="#22c55e" />
            <Text style={styles.value}>john.doe@example.com</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>MOBILE NUMBER</Text>
          <View style={styles.valueRow}>
            <FontAwesome6 name="phone" size={14} color="#f97316" />
            <Text style={styles.value}>+63 912 345 6789</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>RESIDENTIAL ADDRESS</Text>
          <View style={styles.valueRow}>
            <FontAwesome6 name="house" size={14} color="#9333ea" />
            <Text style={styles.value}>
              123 Main Street{"\n"}
              Barangay San Lorenzo{"\n"}
              Makati City, Metro Manila{"\n"}
              Philippines 1223
            </Text>
          </View>
        </View>
      </View>

      {/* EDIT BUTTON */}
      <TouchableOpacity style={styles.editButton}>
        <FontAwesome6 name="pen" size={14} color="#fff" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f7",
  },

  header: {
    height: 140,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarWrapper: {
    alignItems: "center",
    marginTop: -45,
    marginBottom: 10,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#ddd",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  sectionTitle: {
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 15,
    color: "#334155",
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 11,
    color: "#64748b",
    marginBottom: 4,
    fontWeight: "600",
  },

  valueRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  value: {
    marginLeft: 8,
    fontSize: 14,
    color: "#1e293b",
    flex: 1,
  },

  editButton: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 40,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  editText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },
});
