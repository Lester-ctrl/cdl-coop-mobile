import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoanOfficerProfile() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  const profile = session?.profile;
  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text>Profile not found.</Text>
      </View>
    );
  }

  const fullName = session?.profile
    ? `${session.profile.first_name} ${session.profile.middle_name ?? ""} ${session.profile.last_name}`
        .replace(/\s+/g, " ")
        .trim()
    : (session?.user?.username ?? "Loan Officer");

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.topBarEdit}
          onPress={() =>
            router.push({
              pathname: "/loan-officer/profiles/editprofile",
              params: {
                profileId: profile.profile_id,
                firstName: profile.first_name,
                middleName: profile.middle_name,
                lastName: profile.last_name,
                email: profile.email,
                mobile: profile.mobile_number,
                address: profile.address,
                birthdate: profile.birthdate,
                sex: profile.sex,
              },
            })
          }
        >
          <Ionicons name="create-outline" size={20} color="#2563eb" />
          <Text style={styles.topBarEditText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          {session?.user?.avatar ? (
            <Image
              source={{ uri: session.user.avatar }}
              style={styles.avatar}
            />
          ) : (
            <Ionicons name="person-circle-outline" size={90} color="#2563eb" />
          )}
        </View>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Mobile Number</Text>
        <Text style={styles.value}>{profile.mobile_number}</Text>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{profile.address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2f7" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563eb",
  },
  topBarEdit: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  topBarEditText: {
    color: "#2563eb",
    fontWeight: "600",
    marginLeft: 4,
    fontSize: 15,
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#2563eb",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarWrapper: {
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
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#e0e7ff",
    marginBottom: 8,
  },
  infoCard: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 11,
    color: "#64748b",
    marginBottom: 2,
    fontWeight: "600",
    marginTop: 10,
  },
  value: {
    fontSize: 15,
    color: "#1e293b",
    fontWeight: "500",
  },
  editButton: {
    marginHorizontal: 20,
    marginTop: 10,
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
