import { viewMember } from "@/api/accountofficer/view_member";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ViewMemberScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

  async function fetchMember() {
    try {
      const res = await viewMember(id);
      setMember(res?.data || res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const Info = ({ label, value }: any) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || "-"}</Text>
    </View>
  );

  const profile = member?.profile || {};
  const branch = member?.branch || {};
  const membership = member?.membership_type || {};

  const getInitial = (name: string) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#099a1c" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* HEADER (same style as your list screen) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Member Details</Text>
      </View>

      {/* PROFILE CARD */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitial(profile.first_name)}
          </Text>
        </View>

        <Text style={styles.name}>
          {profile.first_name} {profile.last_name}
        </Text>

        <Text style={styles.sub}>
          Member No: {member.member_no}
        </Text>
      </View>

      {/* TABS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        {[
          { key: "personal", label: "Personal" },
          { key: "spouse", label: "Spouse & Co-Maker" },
          { key: "employment", label: "Employment" },
          { key: "share", label: "Share Capital" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[
              styles.tabBtn,
              activeTab === tab.key && styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* CONTENT CARD */}
      <View style={styles.card}>

        {/* PERSONAL */}
        {activeTab === "personal" && (
          <>
            <Text style={styles.section}>Personal Information</Text>
            <Info
              label="Full Name"
              value={`${profile.first_name} ${profile.middle_name} ${profile.last_name}`}
            />
            <Info label="Email" value={profile.email} />
            <Info label="Mobile" value={profile.mobile_number} />
            <Info label="Occupation" value={member.occupation} />
            <Info label="Employer" value={member.employer_name} />

            <Text style={styles.section}>Membership</Text>
            <Info label="Type" value={membership.name} />
            <Info label="Branch" value={branch.name} />
            <Info label="Years in Coop" value={member.years_in_coop} />
          </>
        )}

        {/* SPOUSE */}
        {activeTab === "spouse" && (
          <>
            <Text style={styles.section}>Spouse</Text>
            <Info label="Name" value={member?.spouse?.full_name} />
            <Info label="Occupation" value={member?.spouse?.occupation} />

            <Text style={styles.section}>Co-Makers</Text>
            {member?.co_makers?.length ? (
              member.co_makers.map((c: any, i: number) => (
                <View key={i} style={styles.subCard}>
                  <Info label="Name" value={c.full_name} />
                  <Info label="Relation" value={c.relationship} />
                  <Info label="Contact" value={c.contact_number} />
                </View>
              ))
            ) : (
              <Text style={styles.empty}>No co-makers</Text>
            )}
          </>
        )}

        {/* EMPLOYMENT */}
        {activeTab === "employment" && (
          <>
            <Text style={styles.section}>Employment</Text>
            <Info label="Employer" value={member.employer_name} />
            <Info label="Income" value={member.monthly_income} />
            <Info label="ID Type" value={member.id_type} />
            <Info label="ID Number" value={member.id_number} />
          </>
        )}

        {/* SHARE CAPITAL */}
        {activeTab === "share" && (
          <>
            <Text style={styles.section}>Share Capital</Text>
            <Info
              label="Balance"
              value={`₱ ${Number(member.share_capital_balance || 0).toLocaleString()}`}
            />
          </>
        )}

      </View>
    </ScrollView>
  );
}

/* STYLES (MATCHED WITH YOUR LIST SCREEN) */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6fb",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#099a1c",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  back: {
    fontSize: 24,
    color: "#fff",
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },

  profileCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 3,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#099a1c",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  avatarText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  sub: {
    color: "#6b7280",
    marginTop: 5,
  },

  tabs: {
    marginHorizontal: 10,
  },

  tabBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    marginRight: 10,
  },

  tabActive: {
    backgroundColor: "#099a1c",
  },

  tabText: {
    fontSize: 12,
  },

  tabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 16,
  },

  section: {
    fontWeight: "700",
    color: "#099a1c",
    marginTop: 10,
    marginBottom: 8,
  },

  infoRow: {
    marginBottom: 8,
  },

  label: {
    fontSize: 12,
    color: "#6b7280",
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  subCard: {
    backgroundColor: "#f9fafb",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  empty: {
    color: "#888",
    fontStyle: "italic",
  },
});