import { editAccountOfficers } from "@/api/account_officers";
import { useAuth } from "@/context/AuthContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfile() {
  const params = useLocalSearchParams();
  const { session, saveSession } = useAuth();
  const [profileId] = useState(params.profileId || "");
  const [firstName, setFirstName] = useState(params.firstName || "");
  const [middleName, setMiddleName] = useState(params.middleName || "");
  const [lastName, setLastName] = useState(params.lastName || "");
  const [email, setEmail] = useState(params.email || "");
  const [mobile, setMobile] = useState(params.mobile || "");
  const [address, setAddress] = useState(params.address || "");
  const [birthdate, setBirthdate] = useState(params.birthdate || "");
  const [sex, setSex] = useState(params.sex || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!profileId) {
      alert("Profile ID is missing. Cannot update profile.");
      return;
    }
    setLoading(true);
    const data = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email,
      mobile_number: mobile,
      address,
      birthdate,
      sex,
    };

    console.log("[EditProfile] sending update", { profileId, data });

    try {
      const result = await editAccountOfficers(profileId, data);

      // Update local session so the profile page reflects the new data immediately.
      if (session) {
        await saveSession({
          ...session,
          profile: {
            ...session.profile,
            ...data,
            profile_id: session.profile.profile_id,
          },
        });
      }

      // Use server's success message if provided
      const successMessage = result?.message || "Profile updated successfully!";
      alert(successMessage);
      router.back();
    } catch (error: any) {
      console.error("Edit profile failed", error);
      alert(error?.message ?? "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#2563C7", "#3b82f6"]} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <FontAwesome6 name="arrow-left" size={18} color="#fff" />
        </TouchableOpacity>
        <View style={styles.avatarWrapper}>
          <Image style={styles.avatar} />
          <TouchableOpacity style={styles.cameraBtn}>
            <FontAwesome6 name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Account Officer Profile</Text>
      </LinearGradient>

      {/* PERSONAL DETAILS */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <FontAwesome6 name="user" size={16} color="#2563C7" />
          <Text style={styles.sectionTitle}>Personal Details</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>FIRST NAME</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="user" size={14} color="#2563C7" />
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>MIDDLE NAME</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="user" size={14} color="#2563C7" />
            <TextInput
              style={styles.input}
              value={middleName}
              onChangeText={setMiddleName}
              placeholder="Middle Name"
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>LAST NAME</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="user" size={14} color="#2563C7" />
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
            />
          </View>
        </View>
      </View>

      {/* CONTACT INFORMATION */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <FontAwesome6 name="address-card" size={16} color="#22c55e" />
          <Text style={styles.sectionTitle}>Contact Information</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="envelope" size={14} color="#22c55e" />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
              keyboardType="email-address"
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>MOBILE NUMBER</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="phone" size={14} color="#f97316" />
            <TextInput
              style={styles.input}
              value={mobile}
              onChangeText={setMobile}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>RESIDENTIAL ADDRESS</Text>
          <View style={styles.inputRow}>
            <FontAwesome6 name="house" size={14} color="#9333ea" />
            <TextInput
              style={[styles.input, { height: 60 }]}
              value={address}
              onChangeText={setAddress}
              placeholder="Residential Address"
              multiline
            />
          </View>
        </View>
      </View>

      {/* SAVE BUTTON */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={loading}
      >
        <FontAwesome6 name="floppy-disk" size={16} color="#fff" />
        <Text style={styles.saveText}>
          {loading ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ── Styles (same as before, kept colors consistent with Account Officer theme) ──
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2f7" },
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
    zIndex: 2,
  },
  avatarWrapper: {
    alignItems: "center",
    marginTop: -45,
    marginBottom: 10,
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#ddd",
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
  headerTitle: { marginTop: 8, fontWeight: "700", fontSize: 18, color: "#fff" },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 15,
    color: "#334155",
  },
  field: { marginBottom: 16 },
  label: { fontSize: 11, color: "#64748b", marginBottom: 4, fontWeight: "600" },
  inputRow: { flexDirection: "row", alignItems: "center" },
  input: {
    marginLeft: 8,
    fontSize: 14,
    color: "#1e293b",
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  saveButton: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 40,
    backgroundColor: "#2563C7",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "700", marginLeft: 8 },
});
