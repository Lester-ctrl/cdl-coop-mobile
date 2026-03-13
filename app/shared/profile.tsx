import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  SafeAreaView,
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
    ? `${profile.first_name} ${profile.middle_name ?? ""} ${profile.last_name}`
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

  const fields = [
    {
      label: "First Name",
      value: profile?.first_name ?? "—",
      icon: "person-outline",
    },
    {
      label: "Middle Name",
      value: profile?.middle_name ?? "—",
      icon: "person-outline",
    },
    {
      label: "Last Name",
      value: profile?.last_name ?? "—",
      icon: "person-outline",
    },
    { label: "Email", value: profile?.email ?? "—", icon: "mail-outline" },
    {
      label: "Mobile Number",
      value: profile?.mobile_number ?? "—",
      icon: "call-outline",
    },
    {
      label: "Birthdate",
      value: profile?.birthdate ?? "—",
      icon: "calendar-outline",
    },
    { label: "Sex", value: profile?.sex ?? "—", icon: "transgender-outline" },
    {
      label: "Address",
      value: profile?.address ?? "—",
      icon: "location-outline",
    },
    { label: "Username", value: user?.username ?? "—", icon: "at-outline" },
    { label: "Coop ID", value: user?.coop_id ?? "—", icon: "id-card-outline" },
    { label: "Role", value: roleName, icon: "shield-checkmark-outline" },
  ];

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={BLUE} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar + Name */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarFallback}>
                <Ionicons name="person" size={40} color={BLUE} />
              </View>
            )}
          </View>
          <Text style={styles.fullName}>{fullName}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>{roleName}</Text>
          </View>
        </View>

        {/* Info Fields */}
        <View style={styles.card}>
          {fields.map((field, index) => (
            <View key={field.label}>
              <View style={styles.fieldRow}>
                <View style={styles.fieldIconBox}>
                  <Ionicons name={field.icon as any} size={18} color={BLUE} />
                </View>
                <View style={styles.fieldText}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <Text style={styles.fieldValue}>{field.value}</Text>
                </View>
              </View>
              {index < fields.length - 1 && (
                <View style={styles.fieldDivider} />
              )}
            </View>
          ))}
        </View>

        {/* Edit Profile Button */}
        {(roleName === "Loan Officer" || roleName === "Account Officer") &&
          profile && (
            <TouchableOpacity
              style={{
                margin: 16,
                backgroundColor: "#2563eb",
                padding: 12,
                borderRadius: 8,
              }}
              onPress={() => {
                router.push({
                  pathname: editProfilePath,
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
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles & Colors
const BLUE = "#2563C7";
const ACTIVE_BG = "#EEF3FB";
const CARD = "#FFFFFF";
const BG = "#F5F6FA";
const BORDER = "#E8EAF0";
const TEXT = "#1C1C2E";
const MUTED = "#8890A4";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: CARD,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: ACTIVE_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 17, fontWeight: "700", color: TEXT },
  scroll: { paddingBottom: 40 },
  avatarSection: { alignItems: "center", paddingVertical: 32, gap: 10 },
  avatarWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: BLUE,
    backgroundColor: ACTIVE_BG,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  avatarImage: { width: 90, height: 90, borderRadius: 45 },
  avatarFallback: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: ACTIVE_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  fullName: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT,
    textAlign: "center",
  },
  roleBadge: {
    backgroundColor: ACTIVE_BG,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  roleBadgeText: { fontSize: 13, fontWeight: "600", color: BLUE },
  card: {
    marginHorizontal: 16,
    backgroundColor: CARD,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    fieldRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      gap: 14,
    },
    fieldIconBox: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: ACTIVE_BG,
      alignItems: "center",
      justifyContent: "center",
    },
    fieldText: { flex: 1 },
    fieldLabel: {
      fontSize: 12,
      color: MUTED,
      fontWeight: "500",
      marginBottom: 2,
    },
    fieldValue: { fontSize: 15, color: TEXT, fontWeight: "600" },
    fieldDivider: { height: 1, backgroundColor: BORDER, marginLeft: 50 },
  });
