import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  avatar: string;
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function InfoRow({
  label,
  value,
  icon,
  last = false,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  last?: boolean;
}) {
  return (
    <View style={[styles.infoRow, !last && styles.infoRowBorder]}>
      <View style={styles.infoIconWrap}>
        <Ionicons name={icon} size={15} color={GREEN} />
      </View>
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LoanOfficerProfile() {
  const { session, isLoading } = useAuth() as AuthContextType;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={GREEN} />
      </View>
    );
  }

  const profile = session?.profile;
  const user = session?.user;

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Profile not found.</Text>
      </View>
    );
  }

  const fullName = [profile.first_name, profile.middle_name, profile.last_name]
    .filter(Boolean)
    .join(" ");

  const initials =
    `${profile.first_name?.[0] ?? ""}${profile.last_name?.[0] ?? ""}`.toUpperCase();

  const avatarUri =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0d7a5f&color=fff`;

  const handleEdit = () => {
    router.push({
      pathname: "/loan-officer/profiles/editprofile",
      params: {
        profileId: profile.profile_id,
        firstName: profile.first_name,
        middleName: profile.middle_name ?? "",
        lastName: profile.last_name,
        email: profile.email,
        mobile: profile.mobile_number ?? "",
        address: profile.address ?? "",
        birthdate: profile.birthdate ?? "",
        sex: profile.sex ?? "",
      },
    });
  };

  return (
    <View style={styles.screen}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEdit}
          activeOpacity={0.8}
        >
          <Ionicons name="create-outline" size={15} color={DARK} />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero card */}
        <View style={styles.heroCard}>
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: avatarUri }}
              style={styles.avatar}
              defaultSource={{
                uri: `https://ui-avatars.com/api/?name=${initials}&background=0d7a5f&color=fff`,
              }}
            />
            {/* Active indicator */}
            {user?.is_active && <View style={styles.activeDot} />}
          </View>

          <Text style={styles.heroName}>{fullName || "Loan Officer"}</Text>
          <Text style={styles.heroEmail}>{profile.email || "No email"}</Text>

          <View style={styles.heroBadge}>
            <View style={styles.heroBadgeDot} />
            <Text style={styles.heroBadgeText}>
              {session?.role ?? "Loan Officer"}
            </Text>
          </View>
        </View>

        {/* Account info */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>ACCOUNT</Text>
        </View>
        <View style={styles.card}>
          <InfoRow
            icon="person-outline"
            label="Username"
            value={user?.username || "Not set"}
          />
          <InfoRow
            icon="business-outline"
            label="Coop ID"
            value={user?.coop_id || "Not assigned"}
            last
          />
        </View>

        {/* Contact info */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>CONTACT</Text>
        </View>
        <View style={styles.card}>
          <InfoRow
            icon="call-outline"
            label="Mobile Number"
            value={profile.mobile_number || "Not provided"}
          />
          <InfoRow
            icon="location-outline"
            label="Address"
            value={profile.address || "Not provided"}
            last
          />
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const GREEN = "#0d7a5f";
const DARK = "#1a1a18";
const SURFACE = "#f8f7f4";
const WHITE = "#ffffff";
const BORDER = "#e2e0d8";
const MUTED = "#8a8a82";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: SURFACE,
  },

  // ── Top bar ──
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 56,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: SURFACE,
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: DARK,
    letterSpacing: -0.3,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: WHITE,
    borderWidth: 0.5,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: DARK,
  },

  // ── Scroll ──
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  // ── Hero card ──
  heroCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: BORDER,
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avatarWrap: {
    position: "relative",
    marginBottom: 14,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: WHITE,
    backgroundColor: GREEN,
  },
  activeDot: {
    position: "absolute",
    bottom: 3,
    right: 3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: WHITE,
  },
  heroName: {
    fontSize: 20,
    fontWeight: "600",
    color: DARK,
    letterSpacing: -0.2,
    textAlign: "center",
  },
  heroEmail: {
    fontSize: 13,
    color: MUTED,
    marginTop: 4,
    textAlign: "center",
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#f0faf6",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 12,
  },
  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GREEN,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: GREEN,
  },

  // ── Sections ──
  sectionHeader: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: MUTED,
    letterSpacing: 0.08 * 11,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: BORDER,
    paddingHorizontal: 16,
    marginBottom: 20,
    overflow: "hidden",
  },

  // ── Info rows ──
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  infoRowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
  },
  infoIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f0faf6",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: MUTED,
    letterSpacing: 0.06 * 10,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "400",
    color: DARK,
  },

  // ── Misc ──
  bottomPad: {
    height: 32,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: SURFACE,
  },
  errorText: {
    fontSize: 14,
    color: MUTED,
  },
});
