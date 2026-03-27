import {
  getActiveMembers,
  getCollections,
  getLoanDisbursement,
} from "@/api/accountofficer/widgets";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  color,
  bg,
}) => {
  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <Ionicons name={icon} size={24} color={color} />
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default function AccountOfficerDashboard() {
  const router = useRouter();
  const { session, clearSession } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  // State for dynamic stats
  const [activeMembers, setActiveMembers] = useState<number | null>(null);
  const [loanDisbursement, setLoanDisbursements] = useState<number | null>(
    null,
  );
  const [collections, setCollections] = useState<number | null>(null);

  // Fetch Active Members
  useEffect(() => {
    const fetchActiveMembers = async () => {
      try {
        const data = await getActiveMembers();
        setActiveMembers(data.active_members);
      } catch (err) {
        console.error("Error fetching active members:", err);
        setActiveMembers(null);
      }
    };
    fetchActiveMembers();
  }, []);

  // Fetch Loan Disbursements
  useEffect(() => {
    const fetchLoanDisbursements = async () => {
      try {
        const data = await getLoanDisbursement();
        setLoanDisbursements(data.disbursed_this_period);
      } catch (err) {
        console.error("Error fetching loan disbursements:", err);
        setLoanDisbursements(null);
      }
    };
    fetchLoanDisbursements();
  }, []);

  //Fetch Collections
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollections();
        setCollections(data.collected_this_period);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setCollections(null);
      }
    };
    fetchCollections();
  }, []);

  const userName = session?.profile?.first_name ?? "Account Officer";

  const handleCloseMenu = () => setShowMenu(false);
  const handleProfile = () => {
    router.push("/account-officer/profile");
    handleCloseMenu();
  };
  const handleSettings = () => {
    alert("Settings page coming soon!");
    handleCloseMenu();
  };
  const handleLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Logout clear error:", e);
    }
    router.replace("/");
  };
  const handleOverlayPress = (e: any) => {
    if (e.target === e.currentTarget) handleCloseMenu();
  };

  // Stats array
  const stats = [
    {
      label: "Active Members",
      value: activeMembers ?? "…",
      icon: "people-outline",
      color: "#1c3faa",
      bg: "#dbeafe",
    },
    {
      label: "Loans Disbursed",
      value:
        loanDisbursement != null
          ? `₱${loanDisbursement.toLocaleString()}`
          : "…",
      icon: "wallet-outline",
      color: "#16a34a",
      bg: "#dcfce7",
    },
    {
      label: "Active Loan Accounts",
      value: "₱8,000",
      icon: "wallet-outline",
      color: "#1c3faa",
      bg: "#dbeafe",
    },
    {
      label: "Collections",
      value: collections != null ? `₱${collections.toLocaleString()}` : "…",
      icon: "cash-outline",
      color: "#16a34a",
      bg: "#dcfce7",
    },

    {
      label: "Pending Applications",
      value: "3",
      icon: "document-text-outline",
      color: "#f59e42",
      bg: "#fef9c3",
    },

    {
      label: "Delinquent Members",
      value: "5",
      icon: "alert-circle-outline",
      color: "#b4321e",
      bg: "#fc2d2664",
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {showMenu && (
        <Pressable style={styles.globalOverlay} onPress={handleOverlayPress} />
      )}

      {/* HEADER */}
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>Welcome, {userName} 👋</Text>
            <Text style={styles.title}>Account Officer Dashboard</Text>
            <Text style={styles.subtitle}>
              Manage member accounts, loan applications, and payments
              efficiently.
            </Text>
          </View>
        </View>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            bg={stat.bg}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  globalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: "#099a1c",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
    position: "relative",
    zIndex: 200,
  },
  greeting: {
    color: "#f8f8f8",
    fontSize: 15,
    fontWeight: "500",
    marginTop: -24,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 0,
  },
  subtitle: {
    color: "#e0e7ff",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    width: "49%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
});
