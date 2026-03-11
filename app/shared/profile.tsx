import { useAuth } from "@/context/AuthContext";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const profile = session?.profile;
  const user = session?.user;
  const roleName = session?.role_name ?? "N/A";

  const fullName = profile
    ? `${profile.first_name} ${profile.middle_name ?? ""} ${profile.last_name}`
        .replace(/\s+/g, " ")
        .trim()
    : (user?.username ?? "User");

  const avatarUrl = user?.avatar ?? null;

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
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={BLUE} />
        </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Avatar + Name ── */}
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

        {/* ── Info Fields ── */}
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
          )}
        </View>

        {/* ── Edit Profile Button ── */}
        {roleName === "Loan Officer" && (
          <TouchableOpacity
            disabled={!profile}
            style={{
              margin: 16,
              backgroundColor: profile ? "#2563eb" : "#a5b4fc",
              padding: 12,
              borderRadius: 8,
            }}
            onPress={() => {
              if (!profile) return;
              router.push({
                pathname: "/loan-officer/profile/editprofile",
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

const BLUE = "#2563C7";
const ACTIVE_BG = "#EEF3FB";
const CARD = "#FFFFFF";
const BG = "#F5F6FA";
const BORDER = "#E8EAF0";
const TEXT = "#1C1C2E";
const MUTED = "#8890A4";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  /* ── Header ── */
  header: {
    paddingTop: 16,
    paddingBottom: 52,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomLeftRadius: 42,
    borderBottomRightRadius: 42,
  },
  backBtn: {
    alignSelf: "flex-start",
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: ACTIVE_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarFallback: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#EEF3FB",
    alignItems: "center",
    justifyContent: "center",
  },

  /* ── Name Section ── */
  nameSection: {
    alignItems: "center",
    marginTop: -44,
    paddingTop: 52,
    paddingBottom: 20,
    gap: 8,
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
  roleBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: BLUE,
  },

  scroll: {
    paddingBottom: 40,
  },

  /* ── Section ── */
  section: {
    marginTop: 40,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 30
  },
  sectionHeader: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  sectionIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: ACTIVE_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: TEXT,
  },

  /* ── Card ── */
  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  /* ── Field Row ── */
  fieldRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 14,
    gap: 12,
  },
  fieldIcon: {
    marginTop: 2,
  },
  fieldText: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    color: MUTED,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  fieldValue: {
    fontSize: 15,
    color: TEXT,
    fontWeight: "500",
    lineHeight: 22,
  },
  fieldDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginLeft: 30,
  },

  /* ── Edit Button ── */
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 8,
    height: 54,
    borderRadius: 14,
    backgroundColor: BLUE,
    shadowColor: BLUE,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  editBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
