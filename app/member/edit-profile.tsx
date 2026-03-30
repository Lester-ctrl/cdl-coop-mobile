import { editProfile } from "@/api/edit-profile";
import { useAuth } from "@/context/AuthContext";
import {
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const GREEN = "#3A8E0D";
const BLUE = "#2563C7";
const ACTIVE_BG = "#EEF3FB";
const CARD = "#FFFFFF";
const BG = "#F5F6FA";
const BORDER = "#E5E7EB";
const TEXT = "#1C1C2E";
const MUTED = "#8890A4";

function formatBirthdate(raw: string | null | undefined): string {
  if (!raw) return "";
  const date = new Date(raw);
  if (isNaN(date.getTime())) return raw;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function EditProfilePage() {
  const { session, saveSession } = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const profile = session?.profile;
  const user = session?.user;

  const [firstName, setFirstName]       = useState(profile?.first_name    ?? "");
  const [middleName, setMiddleName]     = useState(profile?.middle_name   ?? "");
  const [lastName, setLastName]         = useState(profile?.last_name     ?? "");
  const [birthdate, setBirthdate]       = useState(formatBirthdate(profile?.birthdate));
  const [email, setEmail]               = useState(profile?.email         ?? "");
  const [mobileNumber, setMobileNumber] = useState(profile?.mobile_number ?? "");
  const [address, setAddress]           = useState(profile?.address       ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!fontsLoaded) return null;

  const handleSave = async () => {
    setError(null);
    setLoading(true);

    try {
        const res = await editProfile({
            profile_id: profile?.profile_id,
            first_name:    firstName,
            middle_name:   middleName,
            last_name:     lastName,
            birthdate,
            email,
            mobile_number: mobileNumber,
            address,
        });

        // await saveSession({
        //     ...session,
        //     profile: res.data,
        // });

        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            router.replace("/member/profile"); // adjust path to your profile page
        }, 1500);

    } catch (err: any) {
        setError(err.message ?? "Something went wrong.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <LinearGradient
        colors={["#51b61a", "#48a019", "#3A8E0D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.headerBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 34 }} />
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Personal Details */}
          <SectionHeader icon="person-outline" title="Personal Details" />
          <View style={styles.card}>
            <InputField
              label="First Name"
              icon="person-outline"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter first name"
            />
            <Divider />
            <InputField
              label="Middle Name"
              icon="person-outline"
              value={middleName}
              onChangeText={setMiddleName}
              placeholder="Enter middle name"
            />
            <Divider />
            <InputField
              label="Last Name"
              icon="person-outline"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter last name"
            />
            <Divider />
            <InputField
              label="Birthdate"
              icon="calendar-outline"
              value={birthdate}
              onChangeText={setBirthdate}
              placeholder="e.g. March 30, 2026"
            />
            <Divider />
          </View>

          {/* Contact Information */}
          <SectionHeader icon="call-outline" title="Contact Information" />
          <View style={styles.card}>
            <InputField
              label="Email Address"
              icon="mail-outline"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Divider />
            <InputField
              label="Mobile Number"
              icon="call-outline"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
            />
            <Divider />
            <InputField
              label="Residential Address"
              icon="home-outline"
              value={address}
              onChangeText={setAddress}
              placeholder="Enter address"
              multiline
            />
          </View>

          {/* Error message */}
          {error && (
            <View style={styles.errorBox}>
              <Ionicons name="close-circle" size={18} color="#dc2626" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Success message */}
          {success && (
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
              <Text style={styles.successText}>Profile updated successfully!</Text>
            </View>
          )}

          {/* Save Button */}
          <Pressable
            onPress={handleSave}
            disabled={loading}
            style={({ pressed }) => [
              styles.saveBtn,
              pressed && { opacity: 0.88 },
              loading && { opacity: 0.7 },
            ]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons name="checkmark-outline" size={20} color="#fff" />
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ── Reusable Components ───────────────────────────────────── */

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIconBox}>
        <Ionicons name={icon as any} size={20} color={BLUE} />
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function InputField({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
  multiline,
}: {
  label: string;
  icon: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: any;
  autoCapitalize?: any;
  multiline?: boolean;
}) {
  return (
    <View style={styles.fieldRow}>
      <Ionicons
        name={icon as any}
        size={18}
        color={BLUE}
        style={styles.fieldIcon}
      />
      <View style={styles.fieldText}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TextInput
          style={[styles.fieldInput, multiline && styles.fieldInputMultiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#C0C6D4"
          keyboardType={keyboardType ?? "default"}
          autoCapitalize={autoCapitalize ?? "words"}
          multiline={multiline}
        />
      </View>
    </View>
  );
}

function Divider() {
  return <View style={styles.fieldDivider} />;
}

/* ── Styles ────────────────────────────────────────────────── */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 48,
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    marginTop: 24,
    paddingHorizontal: 4,
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
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: TEXT,
  },
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
  fieldRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    gap: 12,
  },
  fieldIcon: {
    marginTop: 20,
  },
  fieldText: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    color: MUTED,
    fontFamily: "Poppins_400Regular",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  fieldInput: {
    fontSize: 15,
    color: TEXT,
    fontFamily: "Poppins_400Regular",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 6,
    paddingTop: 2,
  },
  fieldInputMultiline: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  fieldDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 30,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fef2f2",
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorText: {
    flex: 1,
    color: "#dc2626",
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  successBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f0fdf4",
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  successText: {
    flex: 1,
    color: "#16a34a",
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 28,
    height: 54,
    borderRadius: 14,
    backgroundColor: GREEN,
    shadowColor: GREEN,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
});