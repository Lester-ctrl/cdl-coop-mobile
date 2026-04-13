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
import { Ionicons } from "@expo/vector-icons";

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
      console.log("FETCHING MEMBER ID:", id);

      const res = await viewMember(id);

      console.log("API RESULT:", res);

      setMember(res?.data || res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* 🔹 reusable */
  const Info = ({ label, value }: any) => (
    <Text style={styles.label}>
      {label}: {value || "-"}
    </Text>
  );

  /* ================= PERSONAL ================= */
  const renderPersonal = () => {
    const profile = member?.profile || {};
    const branch = member?.branch || {};
    const membership = member?.membership_type || {};

    return (
      <>
        <Text style={styles.sectionTitle}>Personal Information</Text>
       <Info
            label="Fullname"
            value={`${profile.first_name || ""} ${profile.middle_name || ""} ${profile.last_name || ""}`}
            />
        <Info label="Email" value={profile.email} />
        <Info label="Mobile" value={profile.mobile_number} />
        <Info label="Occupation" value={member.occupation} />
        <Info label="Employer" value={member.employer_name} />

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Membership</Text>
        <Info label="Type" value={membership.name} />
        <Info label="Years in Coop" value={member.years_in_coop} />
        <Info label="Branch" value={branch.name} />

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Financial</Text>
        <Info
          label="Monthly Income"
          value={`₱ ${Number(member.monthly_income || 0).toLocaleString()}`}
        />
        <Info
          label="Share Capital"
          value={`₱ ${Number(
            member.share_capital_balance || 0
          ).toLocaleString()}`}
        />

      

       
      </>
    );
  };

  /* ================= SPOUSE ================= */
  const renderSpouse = () => {
    const spouse = member?.spouse;
    const coMakers = member?.co_makers ?? member?.coMakers ?? [];

    return (
      <>
        {/* SPOUSE */}
        <View style={styles.innerCard}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Spouse</Text>
          </View>

          {spouse ? (
            <>
              <Info label="Full Name" value={spouse.full_name} />
              <Info
                label="Birthdate"
                value={
                    spouse?.birthdate
                    ? new Date(spouse.birthdate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        })
                    : "-"
                }
                />
              <Info label="Occupation" value={spouse.occupation} />
              <Info label="Employer" value={spouse.employer_name} />
              <Info label="source_of_income" value={spouse.source_of_income} />
              <Info label="TIN" value={spouse.tin} />
            </>
          ) : (
            <Text style={styles.empty}>
              No spouse record (check member ID)
            </Text>
          )}
        </View>

        {/* CO-MAKERS */}
        <View style={styles.innerCard}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Co-Makers</Text>
          </View>

          {coMakers.length > 0 ? (
            coMakers.map((item: any, index: number) => (
              <View key={index} style={styles.subCard}>
                <Text style={styles.name}>
                 {item.full_name}
                </Text>
                <Info label="Relation" value={item.relationship} />
                <Info label="Contact" value={item.contact_number} />
                <Info label="Address" value={item.address} />
                <Info label="relationship" value={item.relationship} />
                <Info label="occupation" value={item.occupation} />
                <Info label="monthly_income" value={item.monthly_income} />
                <Info label="employer_name" value={item.employer_name} />
                <Info
                  label="Income"
                  value={`₱ ${Number(
                    item.monthly_income || 0
                  ).toLocaleString()}`}
                />
              </View>
            ))
          ) : (
            <Text style={styles.empty}>
              No co-makers (check member ID)
            </Text>
          )}
        </View>
      </>
    );
  };

  /* ================= EMPLOYMENT ================= */
  const renderEmployment = () => (
    <>
      <Text style={styles.sectionTitle}>Employment</Text>
      <Info label="Employment Info" value={member.employment_info} />
      <Info label="Employer" value={member.employer_name} />
      <Info label="Income Range" value={member.monthly_income_range} />

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Identification</Text>
      <Info label="ID Type" value={member.id_type} />
      <Info label="ID Number" value={member.id_number} />

       <View style={styles.divider} />

       <Text style={styles.sectionTitle}>Emergency Contact</Text>
        <Info label="Name" value={member.emergency_full_name} />
        <Info label="Phone" value={member.emergency_phone} />
    </>
  );

  /* ================= SHARE ================= */
  const renderShareCapital = () => (
    <>
      <Text style={styles.sectionTitle}>Share Capital</Text>
      <Info
        label="Balance"
        value={`₱ ${Number(
          member.share_capital_balance || 0
        ).toLocaleString()}`}
      />

       <Info label="Phone" value={member.} />

    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonal();
      case "spouse":
        return renderSpouse();
      case "employment":
        return renderEmployment();
      case "share":
        return renderShareCapital();
      default:
        return null;
    }
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0B5D1E" />
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

  if (!member) {
    return (
      <View style={styles.center}>
        <Text>No member found</Text>
      </View>
    );
  }

  const profile = member?.profile || {};

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Member Details</Text>
        </View>

        {/* NAME */}
        <View style={styles.card}>
          <Text style={styles.name}>
            {profile.first_name} {profile.last_name}
          </Text>
          <Text style={styles.subText}>
            Member No: {member.member_no}
          </Text>
        </View>

        {/* NAV */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navbar}>
          {[
            { key: "personal", label: "Personal" },
            { key: "spouse", label: "Spouse & Co-Maker" },
            { key: "employment", label: "Employment & ID" },
            { key: "share", label: "Share Capital" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                styles.navBtn,
                activeTab === tab.key && styles.activeNav,
              ]}
            >
              <Text
                style={[
                  styles.navText,
                  activeTab === tab.key && styles.activeNavText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* CONTENT */}
        <View style={styles.card}>{renderContent()}</View>

      </ScrollView>
    </View>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: { flexDirection: "row", padding: 20, backgroundColor: "#fff" },
  backText: { fontSize: 24, marginRight: 10, color: "#099a1c" },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#0B5D1E" },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 12,
  },

  innerCard: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  name: { fontSize: 18, fontWeight: "700" },
  subText: { color: "#555", marginTop: 5 },

  navbar: { marginHorizontal: 10, marginTop: 10 },

  navBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    marginRight: 10,
  },

  activeNav: { backgroundColor: "#0B5D1E" },
  navText: { fontSize: 12 },
  activeNavText: { color: "#fff", fontWeight: "600" },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 8,
    color: "#099a1c",
  },

  label: { fontSize: 13, marginBottom: 5 },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 10 },

  empty: { color: "#888", fontStyle: "italic" },

  subCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
});