import { useAuth } from "@/context/AuthContext";
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

export default function ProfilePage() {
  const { session } = useAuth();

  const profile = session?.profile;
  const user = session?.user;
  const roleName = session?.role_name ?? "N/A";

  const fullName = profile
    ? `${profile.first_name || ""} ${profile.middle_name || ""} ${profile.last_name || ""}`
        .replace(/\s+/g, " ")
        .trim()
    : (user?.username ?? "User");

  const avatarUrl = user?.avatar ?? null;

  // Determine the edit path based on role
  let editProfilePath = "";
  if (roleName === "Loan Officer") {
    editProfilePath = "/loan-officer/profile/editprofile";
  } else if (roleName === "Account Officer") {
    editProfilePath = "/account-officer/profile/editprofile";
  } else if (roleName === "Member") {
    editProfilePath = "/member/profile/editprofile"; // optional
  }

  const handleEdit = () => {
    if (profile?.profile_id && editProfilePath) {
      router.push({
        pathname: editProfilePath,
        params: {
          profileId: profile.profile_id,
          firstName: profile.first_name || "",
          middleName: profile.middle_name || "",
          lastName: profile.last_name || "",
          email: profile.email || "",
          mobile: profile.mobile_number || "",
          address: profile.address || "",
          birthdate: profile.birthdate || "",
          sex: profile.sex || "",
        },
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#2563C7", "#3b82f6"]} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <FontAwesome6 name="arrow-left" size={18} color="#fff" />
        </TouchableOpacity>
        <View style={styles.avatarWrapper}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <FontAwesome6 name="user" size={40} color="#fff" />
            </View>
          )}
          <TouchableOpacity style={styles.cameraBtn} disabled>
            <FontAwesome6 name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>{roleName} Profile</Text>
      </LinearGradient>

      {/* Personal Details */}
      <View style={styles.card}>
        <View style={[styles.sectionHeader, { gap: 8 }]}>
          <FontAwesome6 name="user" size={16} color="#2563C7" />
          <Text style={styles.sectionTitle}>Personal Details</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>FIRST NAME</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="user" size={14} color="#2563C7" />
            <Text style={styles.displayValue}>
              {profile?.first_name || "—"}
            </Text>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>MIDDLE NAME</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="user" size={14} color="#2563C7" />
            <Text style={styles.displayValue}>
              {profile?.middle_name || "—"}
            </Text>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>LAST NAME</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="user" size={14} color="#2563C7" />
            <Text style={styles.displayValue}>{profile?.last_name || "—"}</Text>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>SEX</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="venus-mars" size={14} color="#2563C7" />
            <Text style={styles.displayValue}>{profile?.sex || "—"}</Text>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>BIRTHDATE</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="cake-candle" size={14} color="#2563C7" />
            <Text style={styles.displayValue}>{profile?.birthdate || "—"}</Text>
          </View>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.card}>
        <View style={[styles.sectionHeader, { gap: 8 }]}>
          <FontAwesome6 name="address-card" size={16} color="#22c55e" />
          <Text style={styles.sectionTitle}>Contact Information</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="envelope" size={14} color="#22c55e" />
            <Text style={styles.displayValue}>{profile?.email || "—"}</Text>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>MOBILE NUMBER</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="phone" size={14} color="#f97316" />
            <Text style={styles.displayValue}>
              {profile?.mobile_number || "—"}
            </Text>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>RESIDENTIAL ADDRESS</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="house" size={14} color="#9333ea" />
            <Text
              style={[styles.displayValue, styles.multiLine]}
              numberOfLines={3}
            >
              {profile?.address || "—"}
            </Text>
          </View>
        </View>
      </View>

      {/* Username, Coop ID, Role */}
      <View style={styles.card}>
        <View style={styles.field}>
          <Text style={styles.label}>USERNAME</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="at" size={14} color="#ef4444" />
            <Text style={styles.displayValue}>{user?.username || "—"}</Text>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>COOP ID</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="id-badge" size={14} color="#10b981" />
            <Text style={styles.displayValue}>{user?.coop_id || "—"}</Text>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>ROLE</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="shield-check" size={14} color="#8b5cf6" />
            <Text style={styles.displayValue}>{roleName}</Text>
          </View>
        </View>
      </View>

      {/* Edit Button */}
      {(roleName === "Loan Officer" || roleName === "Account Officer") &&
        editProfilePath && (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <FontAwesome6 name="pen-to-square" size={16} color="#fff" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
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
    alignItems: "center",
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    left: 20,
    top: 54,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarWrapper: {
    position: "relative",
    marginTop: -30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#fff",
  },
  avatarFallback: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2563C7",
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  headerTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
    marginLeft: 8,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    color: "#64748b",
    marginBottom: 6,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  displayValue: {
    flex: 1,
    fontSize: 15,
    color: "#1e293b",
    fontWeight: "500",
    marginLeft: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
  },
  multiLine: {
    lineHeight: 22,
    paddingVertical: 12,
  },
  editButton: {
    marginHorizontal: 70,
    marginTop: 10,
    marginBottom: 100,
    backgroundColor: "#2563C7",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
