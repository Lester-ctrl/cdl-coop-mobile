import { editProfile } from "@/api/Loanofficer/EditLOProfile";
import { useAuth } from "@/context/AuthContext";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import type { SessionData } from "@/context/AuthContext";

// ─── Field Config ────────────────────────────────────────────────────────────

type FieldKey =
  | "firstName"
  | "middleName"
  | "lastName"
  | "email"
  | "mobile"
  | "address";

interface FieldConfig {
  key: FieldKey;
  label: string;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  multiline?: boolean;
  flex?: number;
}

const SECTIONS: { title: string; fields: FieldConfig[] }[] = [
  {
    title: "NAME",
    fields: [
      {
        key: "firstName",
        label: "First Name",
        placeholder: "First name",
        flex: 1,
      },
      {
        key: "middleName",
        label: "Middle",
        placeholder: "M.I.",
        flex: 0.6,
      },
      {
        key: "lastName",
        label: "Last Name",
        placeholder: "Last name",
        flex: 1,
      },
    ],
  },
  {
    title: "CONTACT",
    fields: [
      {
        key: "email",
        label: "Email Address",
        placeholder: "you@example.com",
        keyboardType: "email-address",
      },
      {
        key: "mobile",
        label: "Mobile Number",
        placeholder: "+63 9XX XXX XXXX",
        keyboardType: "phone-pad",
      },
    ],
  },
  {
    title: "ADDRESS",
    fields: [
      {
        key: "address",
        label: "Home Address",
        placeholder: "Street, City, Province",
        multiline: true,
      },
    ],
  },
];

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "?";
  return (
    <View style={styles.avatarContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <View style={styles.avatarEditBadge}>
        <Text style={styles.avatarEditIcon}>✎</Text>
      </View>
    </View>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({
  config,
  value,
  onChange,
  style,
}: {
  config: FieldConfig;
  value: string;
  onChange: (text: string) => void;
  style?: object;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.fieldWrapper,
        config.multiline && styles.fieldWrapperMultiline,
        focused && styles.fieldWrapperFocused,
        style,
      ]}
    >
      <Text style={styles.fieldLabel}>{config.label}</Text>
      <TextInput
        style={[
          styles.fieldInput,
          config.multiline && styles.fieldInputMultiline,
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={config.placeholder}
        placeholderTextColor="#c4c4bc"
        keyboardType={config.keyboardType ?? "default"}
        multiline={config.multiline}
        numberOfLines={config.multiline ? 3 : 1}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoCapitalize={
          config.keyboardType === "email-address" ? "none" : "words"
        }
      />
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function EditProfile() {
  const { session, saveSession } = useAuth();
  const params = useLocalSearchParams();

  const getParam = (value: string | string[] | undefined): string =>
    (Array.isArray(value) ? value[0] : value) || "";

  const profileId = getParam(params.profileId);

  const [form, setForm] = useState<Record<FieldKey, string>>({
    firstName: getParam(params.firstName),
    middleName: getParam(params.middleName),
    lastName: getParam(params.lastName),
    email: getParam(params.email),
    mobile: getParam(params.mobile),
    address: getParam(params.address),
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (key: FieldKey, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (!profileId) {
      Alert.alert("Error", "Profile ID missing");
      return;
    }
    setSaving(true);
    try {
      const response = await editProfile(profileId, {
        first_name: form.firstName,
        middle_name: form.middleName,
        last_name: form.lastName,
        email: form.email,
        mobile_number: form.mobile,
        address: form.address,
      });

      if (response.profile) {
        await saveSession({
          ...session,
          profile: response.profile,
          user: response.user || session?.user,
        } as SessionData);
      }

      router.back();
    } catch {
      Alert.alert("Error", "Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <Text style={styles.headerSubtitle}>Personal information</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarRow}>
          <Avatar firstName={form.firstName} lastName={form.lastName} />
          <View style={styles.avatarInfo}>
            <Text style={styles.avatarName}>
              {[form.firstName, form.lastName].filter(Boolean).join(" ") ||
                "Your Name"}
            </Text>
            <Text style={styles.avatarHint}>Tap avatar to change photo</Text>
          </View>
        </View>

        {/* Form sections */}
        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionLabel}>{section.title}</Text>

            {/* Name row: first + middle + last on one line */}
            {section.title === "NAME" ? (
              <View style={styles.nameRow}>
                {section.fields.map((field) => (
                  <Field
                    key={field.key}
                    config={field}
                    value={form[field.key]}
                    onChange={(v) => handleChange(field.key, v)}
                    style={{ flex: field.flex ?? 1 }}
                  />
                ))}
              </View>
            ) : (
              section.fields.map((field) => (
                <Field
                  key={field.key}
                  config={field}
                  value={form[field.key]}
                  onChange={(v) => handleChange(field.key, v)}
                  style={styles.fullField}
                />
              ))
            )}
          </View>
        ))}

        <View style={styles.bottomPad} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.85}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>Save Changes</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.discardText}>Discard changes</Text>
        </TouchableOpacity>
      </View>
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
const PLACEHOLDER = "#c4c4bc";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: SURFACE,
  },

  // ── Header ──
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
    backgroundColor: SURFACE,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: WHITE,
    borderWidth: 0.5,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 26,
    color: DARK,
    lineHeight: 30,
    marginTop: -2,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: DARK,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: MUTED,
    marginTop: 1,
  },

  // ── Scroll ──
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  // ── Avatar ──
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
    marginTop: 8,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 26,
    fontWeight: "600",
    color: WHITE,
    letterSpacing: 1,
  },
  avatarEditBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: DARK,
    borderWidth: 2,
    borderColor: SURFACE,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEditIcon: {
    fontSize: 11,
    color: WHITE,
    lineHeight: 14,
  },
  avatarInfo: {
    flex: 1,
  },
  avatarName: {
    fontSize: 16,
    fontWeight: "500",
    color: DARK,
  },
  avatarHint: {
    fontSize: 12,
    color: MUTED,
    marginTop: 2,
  },

  // ── Sections ──
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: MUTED,
    letterSpacing: 0.08 * 11,
    marginBottom: 10,
  },
  nameRow: {
    flexDirection: "row",
    gap: 8,
  },
  fullField: {
    marginBottom: 8,
  },

  // ── Field ──
  fieldWrapper: {
    backgroundColor: WHITE,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: BORDER,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: 58,
    justifyContent: "center",
  },
  fieldWrapperMultiline: {
    minHeight: 90,
    justifyContent: "flex-start",
  },
  fieldWrapperFocused: {
    borderColor: GREEN,
    borderWidth: 1,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: PLACEHOLDER,
    letterSpacing: 0.06 * 10,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  fieldInput: {
    fontSize: 14,
    fontWeight: "400",
    color: DARK,
    padding: 0,
    margin: 0,
  },
  fieldInputMultiline: {
    height: 60,
    textAlignVertical: "top",
  },

  // ── Footer ──
  bottomPad: {
    height: 12,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 36,
    paddingTop: 12,
    backgroundColor: SURFACE,
    borderTopWidth: 0.5,
    borderTopColor: BORDER,
    gap: 12,
  },
  saveButton: {
    height: 52,
    backgroundColor: DARK,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveText: {
    fontSize: 15,
    fontWeight: "600",
    color: WHITE,
    letterSpacing: 0.2,
  },
  discardText: {
    fontSize: 13,
    color: MUTED,
    textAlign: "center",
  },
});
