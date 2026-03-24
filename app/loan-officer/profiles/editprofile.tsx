import { editProfile } from "@/api/Loanofficer/EditLOProfile";
import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
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

export default function EditProfile() {
  const { session, saveSession } = useAuth();
  const params = useLocalSearchParams();

  const getParam = (value: string | string[] | undefined): string => {
    return (Array.isArray(value) ? value[0] : value) || "";
  };

  const profileId = getParam(params.profileId);

  const [form, setForm] = useState({
    firstName: getParam(params.firstName),
    middleName: getParam(params.middleName),
    lastName: getParam(params.lastName),
    email: getParam(params.email),
    mobile: getParam(params.mobile),
    address: getParam(params.address),
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

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

      // Update session with the response data immediately
      if (response.profile) {
        await saveSession({
          ...session,
          profile: response.profile,
          user: response.user || session?.user,
        } as SessionData);
      }

      // Then go back
      router.back();
    } catch (e) {
      Alert.alert("Error", "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#2563eb", "#3b82f6"]} style={styles.header}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </LinearGradient>

      <View style={styles.card}>
        {Object.entries(form).map(([key, value]) => (
          <TextInput
            key={key}
            style={styles.input}
            value={value}
            onChangeText={(text) =>
              handleChange(key as keyof typeof form, text)
            }
            placeholder={key}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Save</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20 },
  headerTitle: { color: "#fff", fontSize: 18 },
  card: { padding: 20 },
  input: {
    backgroundColor: "#f1f5f9",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: { color: "#fff" },
});
