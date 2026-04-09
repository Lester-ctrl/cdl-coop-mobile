import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Define proper types
interface ProfileData {
  profile_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  mobile_number: string | null;
  address: string | null;
  birthdate: string | null;
  sex: string | null;
  civil_status: string | null;
  tin: string | null;
  city: string | null;
  zip_code: string | null;
  roles_id: number;
}

interface UserData {
  user_id: number;
  coop_id: string;
  avatar: string; // This is the avatar URL
  image_path: string;
  username: string;
  profile_id: number;
  is_active: boolean;
  qr_code: string;
}

interface SessionData {
  profile: ProfileData;
  user: UserData;
  role: string;
}

interface AuthContextType {
  session: SessionData | null;
  isLoading: boolean;
}

export default function LoanOfficerProfile() {
  const { session, isLoading } = useAuth() as AuthContextType;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  const profile = session?.profile;
  const user = session?.user;

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

  const getAvatarUrl = () => {
    if (user?.avatar) {
      return user.avatar;
    }
    // Fallback to UI Avatars API
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=10b981&color=fff`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Profile</Text>
        <TouchableOpacity style={styles.topBarEdit} onPress={handleEdit}>
          <Ionicons name="create-outline" size={20} color="#10b981" />
          <Text style={styles.topBarEditText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <LinearGradient
          colors={["#065f46", "#10b981", "#6ee7b7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientHeader}
        >
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: getAvatarUrl() }}
              style={styles.avatar}
              onError={(e) => {
                console.log("Avatar loading error:", e.nativeEvent.error);
              }}
            />
          </View>
          <Text style={styles.name}>{fullName || "Loan Officer"}</Text>
          <Text style={styles.email}>{profile.email || "No email"}</Text>
        </LinearGradient>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Mobile Number</Text>
        <Text style={styles.value}>
          {profile.mobile_number || "Not provided"}
        </Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{profile.address || "Not provided"}</Text>

        <Text style={styles.label}>Coop ID</Text>
        <Text style={styles.value}>{user?.coop_id || "Not assigned"}</Text>

        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{user?.username || "Not set"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0fdf4" },
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
    color: "#10b981",
  },
  topBarEdit: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d1fae5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  topBarEditText: {
    color: "#10b981",
    marginLeft: 4,
  },
  gradientHeader: {
    alignItems: "center",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  avatarWrapper: { marginBottom: 10 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  name: { color: "#fff", fontSize: 20, fontWeight: "700", marginTop: 8 },
  email: { color: "#d1fae5", marginTop: 4 },
  infoCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 12,
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#1e293b",
    marginTop: 4,
    fontWeight: "500",
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
