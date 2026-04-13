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
        return "green";
      case "Pending":
        return "orange";
      case "Inactive":
        return "red";
      default:
        return "black";
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

      {/* LIST */}
      <View style={styles.card}>
        <Text style={[styles.title, { color: "#099a1c", fontSize: 18 }]}>
          Active Members
        </Text>

        {/* HEADER ROW */}
        <View style={styles.tableRowHeader}>
          <Text style={[styles.cell, styles.headerCell]}>Full Name</Text>
          <Text style={[styles.cell, styles.headerCell]}>Branch</Text>
          <Text style={[styles.cell, styles.headerCell]}>Status</Text>
        </View>

        {/* DATA */}
        {filteredMembers.map((member) => (
          <TouchableOpacity
            key={member.id}
            style={styles.tableRow}
            onPress={() => handleOpenMember(member.id)}
          >
            <Text style={[styles.cell, { color: "#0638cd", fontWeight: "600" }]}>
              {member.full_name || "N/A"}
            </Text>

            <Text style={styles.cell}>
              {member.branch_name || "N/A"}
            </Text>

            <Text
              style={[
                styles.cell,
                {
                  color: getStatusColor(member.status),
                  fontWeight: "600",
                },
              ]}
            >
              {member.status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
    textAlign: "center",
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
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 15,
  },

  searchInput: {
    fontSize: 16,
    padding: 10,
  },

  card: {
    width: "92%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    elevation: 5,
  },

  tableRowHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 6,
    marginTop: 10,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
  },

  headerCell: {
    fontWeight: "700",
    color: "#08420d",
  },
});