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
  const { session, isLoading } = useAuth();

  if (isLoading) {
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

  const fullName = [profile.first_name, profile.middle_name, profile.last_name]
    .filter(Boolean)
    .join(" ");

  const handleEdit = () => {
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
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Profile</Text>
        <TouchableOpacity style={styles.topBarEdit} onPress={handleEdit}>
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
            <Ionicons name="person-circle-outline" size={90} color="#fff" />
          )}
        </View>

        <Text style={styles.name}>{fullName || "Loan Officer"}</Text>
        <Text style={styles.email}>{profile.email || "No email"}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Mobile Number</Text>
        <Text style={styles.value}>
          {profile.mobile_number || "Not provided"}
        </Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{profile.address || "Not provided"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2f7" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
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
    marginLeft: 4,
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#2563eb",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarWrapper: { marginBottom: 10 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#fff",
  },
  name: { color: "#fff", fontSize: 20, fontWeight: "700" },
  email: { color: "#e0e7ff" },
  infoCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 18,
    borderRadius: 16,
  },
  label: { fontSize: 11, color: "#64748b", marginTop: 10 },
  value: { fontSize: 15, color: "#1e293b" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
