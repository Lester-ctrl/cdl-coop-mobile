import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router"; // <-- use hook
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { getActiveMembers, getMemberDetails } from "@/api/accountofficer/member";

export default function LoanOfficerLoanManagement() {
  const router = useRouter(); // <-- initialize router

  // State
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberLoading, setMemberLoading] = useState(false);
  const [memberError, setMemberError] = useState(null);

  // Function to get status color
  const getStatusColor = (status) => {
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

  // Fetch members on mount
  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await getActiveMembers();
        setMembers(data.active_members);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  // Fetch member details when clicked
  const handleMemberPress = async (memberId) => {
    setModalVisible(true);
    setMemberLoading(true);
    setMemberError(null);

    try {
      const data = await getMemberDetails(memberId);
      setSelectedMember(data);
    } catch (err) {
      setMemberError(err.message);
    } finally {
      setMemberLoading(false);
    }
  };

  // Loading & Error States
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1c3faa" />
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

  // Main Render
  return (
    <ScrollView contentContainerStyle={styles.container}>
    

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Accounts Management</Text>
        <Text style={styles.subtitle}>
          View, update, and manage member accounts.
        </Text>
      
      </View>
        {/* BACK BUTTON */}
  
   <TouchableOpacity
  style={styles.backBtn}
  onPress={() => router.push("/account-officer/accounts")}
>
  <FontAwesome6 name="arrow-left" size={20} color="#fff" />
</TouchableOpacity>
      {/* Members Table */}
      <View style={styles.card}>
        
        <Text style={[styles.title, { color: "#0d942af7", textAlign: "center" }]}>
          Active Members
        </Text>
        

        <View style={styles.tableRowHeader}>
          <Text style={[styles.cell, styles.headerCell]}>ID</Text>
          <Text style={[styles.cell, styles.headerCell]}>Full Name</Text>
          <Text style={[styles.cell, styles.headerCell]}>Branch Name</Text>
          <Text style={[styles.cell, styles.headerCell]}>Status</Text>
        </View>

        {members.map((member) => (
          <View style={styles.tableRow} key={member.id}>
            <Text style={styles.cell}>{member.id}</Text>

            <TouchableOpacity
              style={styles.cell}
              onPress={() => handleMemberPress(member.id)}
            >
              <Text style={{ color: "#0638cd", fontWeight: "600" }}>
                {member.full_name || "N/A"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.cell}>{member.branch_name || "N/A"}</Text>
            <Text
              style={[
                styles.cell,
                { color: getStatusColor(member.status), fontWeight: "600" },
              ]}
            >
              {member.status}
            </Text>
          </View>
        ))}
      </View>

      {/* Modal for Member Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>Close</Text>
            </Pressable>

            {memberLoading && <Text>Loading details...</Text>}
            {memberError && <Text style={{ color: "red" }}>{memberError}</Text>}

            {selectedMember && !memberLoading && (
              <View>
                <Text style={styles.modalTitle}>{selectedMember.full_name}</Text>
                <Text>ID: {selectedMember.id}</Text>
                <Text>Member No: {selectedMember.member_no || "N/A"}</Text>
                <Text>Branch: {selectedMember.branch_name}</Text>
                <Text>Email: {selectedMember.email || "N/A"}</Text>
                <Text>Contact: {selectedMember.contact_no || "N/A"}</Text>
                <Text>Membership Type: {selectedMember.membership_type || "N/A"}</Text>
                <Text
                  style={{
                    color: getStatusColor(selectedMember.status),
                    fontWeight: "600",
                  }}
                >
                  Status: {selectedMember.status}
                </Text>
                <Text>
                  Share Capital Balance:{" "}
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(selectedMember.share_capital_balance)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { 
    padding: 0,
     backgroundColor: "#f3f6fb" 
    },
  backBtn: {
    position: "absolute",
    top: 120,
    left: 8,
    backgroundColor: "#141a2b73",
    padding: 10,
    borderRadius: 12,
    zIndex: 1000,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: "#099a1c",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 80,
    alignItems: "center",
  },
  card: {

     width: "90%",
     backgroundColor: "#fff", 
      alignSelf: "center",
     borderRadius: 20,
      padding: 20,
      shadowColor: "#1c3faa",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 8,
        marginBottom: 40,
    
     },
  title: {
    top: -15,
    fontSize: 30,
    fontWeight: "700",
    color: "#e9eaeb",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    top: -15,
    color: "#dfe1e4",
    marginBottom: 18,
    textAlign: "center",
  },
  tableRowHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#0f0303",
    paddingBottom: 6,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#090101",
  },
  cell: { flex: 1, textAlign: "center" },
  headerCell: { fontWeight: "700", color: "#08420d" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 40 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000000ce" },
  modalContent: { width: "90%", backgroundColor: "#fff", borderRadius: 20, padding: 20 },
  closeButton: { backgroundColor: "#1c3faa", padding: 10, borderRadius: 12, alignSelf: "flex-end", marginBottom: 15 },
  modalTitle: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
});