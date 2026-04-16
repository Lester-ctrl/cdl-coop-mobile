import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { getActiveMembers } from "@/api/accountofficer/member";

export default function LoanOfficerLoanManagement() {
  const router = useRouter();

  const [members, setMembers] = useState<any[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "#16a34a";
      case "Pending":
        return "#f59e0b";
      case "Inactive":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  };

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await getActiveMembers();
        setMembers(data.active_members || []);
        setFilteredMembers(data.active_members || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter((m) =>
        m.full_name?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  }, [searchText, members]);

  const handleOpenMember = (memberId: number) => {
    router.push({
      pathname: "/account-officer/view_member",
      params: { id: memberId },
    });
  };

  // ✅ FIXED: 1 LETTER ONLY
  const getInitial = (name: string) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#099a1c" />
        <Text>Loading members...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Accounts Management</Text>
        <Text style={styles.subtitle}>
          View, update, and manage member accounts.
        </Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by full name..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* MEMBER CARDS */}
      {filteredMembers.map((member) => (
        <TouchableOpacity
          key={member.id}
          style={styles.memberCard}
          onPress={() => handleOpenMember(member.id)}
          activeOpacity={0.8}
        >
          {/* AVATAR */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitial(member.full_name)}
            </Text>
          </View>

          {/* INFO */}
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>
              {member.full_name || "N/A"}
            </Text>

            <Text style={styles.branch}>
              {member.branch_name || "No Branch"}
            </Text>

            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(member.status) },
              ]}
            >
              <Text style={styles.statusText}>
                {member.status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#f3f6fb",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: "#099a1c",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },

  subtitle: {
    fontSize: 13,
    color: "#e9f5ea",
    marginTop: 5,
    textAlign: "center",
  },

  searchContainer: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 15,
  },

  searchInput: {
    fontSize: 16,
    padding: 12,
  },

  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    borderRadius: 16,
    elevation: 4,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#099a1c",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  branch: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },

  statusBadge: {
    marginTop: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },

  statusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
});