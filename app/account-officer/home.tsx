import {
  getActiveMembers,
  getCollections,
  getLoanDisbursement,
  getActiveLoans,
  getPendingLoanApplications,
  getDelinquentMembers,
} from "@/api/accountofficer/widgets";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

/* ---------------- TYPES ---------------- */
interface StatCardProps {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
  accentColor: string;
  trend?: string;
  trendUp?: boolean;
  onPress?: () => void;
}

interface QuickActionProps {
  label: string;
  sublabel: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
  onPress: () => void;
}

/* ---------------- STAT CARD ---------------- */
const StatCard: React.FC<StatCardProps> = ({label,
  value,
  icon,
  color,
  bg,
  accentColor,
  trend,
  trendUp,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={{ width: "48%" }}>
      <View style={[styles.card]}>
        <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

        <View style={[styles.iconWrap, { backgroundColor: bg }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>

        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>

        {trend ? (
          <View style={styles.trendRow}>
            <Ionicons
              name={trendUp ? "arrow-up-outline" : "remove-outline"}
              size={11}
              color={trendUp ? "#16a34a" : "#888"}
            />
            <Text
              style={[
                styles.trendText,
                { color: trendUp ? "#16a34a" : "#888" },
              ]}
            >
              {trend}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

/* ---------------- QUICK ACTION ---------------- */
const QuickAction: React.FC<QuickActionProps> = ({
  label,
  sublabel,
  icon,
  color,
  bg,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.quickAction}>
      <View style={[styles.quickActionIconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>

      <View style={styles.quickActionText}>
        <Text style={styles.quickActionLabel}>{label}</Text>
        <Text style={styles.quickActionSublabel}>{sublabel}</Text>
      </View>

      <Ionicons name="chevron-forward" size={16} color="#bbb" />
    </Pressable>
  );
};

/* ---------------- MAIN ---------------- */
export default function AccountOfficerDashboard() {
  const router = useRouter();
  const { session } = useAuth();

  const [activeMembers, setActiveMembers] = useState<number | null>(null);
  const [loanDisbursement, setLoanDisbursements] = useState<number | null>(null);
  const [collections, setCollections] = useState<number | null>(null);
  const [activeLoans, setActiveLoans] = useState<number | null>(null);
  const [pendingApplications, setPendingApplications] = useState<number | null>(null);
  const [delinquentMembers, setDelinquentMembers] = useState<number | null>(null);

  useEffect(() => {
    getActiveMembers().then((d) => setActiveMembers(d.active_members));
    getLoanDisbursement().then((d) => setLoanDisbursements(d.disbursed_this_period));
    getCollections().then((d) => setCollections(d.collected_this_period));
    getActiveLoans().then((d) => setActiveLoans(d.active_loans));
    getPendingLoanApplications().then((d) => setPendingApplications(d.pending_loans));
    getDelinquentMembers().then((d) => setDelinquentMembers(d.delinquent_members));
  }, []);

  const userName = session?.profile?.first_name ?? "Account Officer";

  /* ---------------- STATS WITH ROUTES ---------------- */
  const stats: StatCardProps[] = [
    {
      label: "Active Members",
      value: activeMembers ?? "—",
      icon: "people-outline",
      color: "#16a34a",
      bg: "#dbfee7",
      accentColor: "#16a34a",
      trend: "This period",
      trendUp: true,
      onPress: () => router.push("/account-officer/overview/active_members"),
    },
    {
      label: "Active Loan Accounts",
      value: activeLoans ?? "—",
      icon: "card-outline",
      color: "#16a34a",
      bg: "#dcfce7",
      accentColor: "#16a34a",
      trend: "Open loans",
      trendUp: true,
      onPress: () =>
        router.push("/account-officer/overview/active_loan_accounts"),
    },
    {
      label: "Collections",
      value: collections ?? "—",
      icon: "cash-outline",
      color: "#16a34a",
      bg: "#dcfce7",
      accentColor: "#16a34a",
      trend: "This period",
      trendUp: true,
      onPress: () =>
        router.push("/account-officer/overview/collection"), 
    },
    {
      label: "Loans Disbursed",
      value:
        loanDisbursement != null
          ? `₱${loanDisbursement.toLocaleString()}`
          : "—",
      icon: "wallet-outline",
      color: "#16a34a",
      bg: "#dcfce7",
      accentColor: "#16a34a",
      trend: "This period",
      trendUp: true,
      onPress: () =>
        router.push("/account-officer/overview/loans_disbursed"),
    },
    {
      label: "Pending Applications",
      value: pendingApplications ?? "—",
      icon: "document-text-outline",
      color: "#b45309",
      bg: "#fef3c7",
      accentColor: "#f59e0b",
      trend: "Needs review",
      trendUp: false,
      onPress: () =>
        router.push("/account-officer/overview/pending_application"),
    },
    {
      label: "Delinquent Members",
      value: delinquentMembers ?? "—",
      icon: "alert-circle-outline",
      color: "#b91c1c",
      bg: "#fee2e2",
      accentColor: "#ef4444",
      trend: "Action needed",
      trendUp: false,
      onPress: () =>
        router.push("/account-officer/overview/delinquent_members"),
    },
  ];

  /* ---------------- QUICK ACTIONS ---------------- */
  const quickActions: QuickActionProps[] = [
    {
      label: "Loans",
      sublabel: "Manage loan applications",
      icon: "wallet-outline",
      color: "#16a34a",
      bg: "#dcfce7",
      onPress: () => router.push("/account-officer/loan-management"),
    },
    {
      label: "Reports",
      sublabel: "View summaries",
      icon: "bar-chart-outline",
      color: "#16a34a",
      bg: "#dcfce7",
      onPress: () => router.push("/account-officer/reports-statement"),
    },
    {
      label: "Payments",
      sublabel: "Track collections",
      icon: "cash-outline",
      color: "#16a34a",
      bg: "#dcfce7",
      onPress: () =>
        router.push("/account-officer/payments-collections"),
    },
  ];

  return (
    <ScrollView style={styles.screen}
    stickyHeaderIndices={[0]}
    >

 
      {/* HEADER */}  
      <View style={styles.header}>
        <Text style={styles.title}>Account Officer Dashboard</Text>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        {stats.map((item, idx) => (
          <StatCard key={idx} {...item} />
        ))}
      </View>

      {/* QUICK ACTIONS */}
      <View style={styles.quickActionsContainer}>
        {quickActions.map((item, idx) => (
          <QuickAction key={idx} {...item} />
        ))}
      </View>
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  /* HEADER */
  header: {
    backgroundColor: "#099a1c",
    padding: 38,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

  },

  greeting: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginBottom: 4,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 30,
  },

  /* STATS WRAPPER */
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  /* CARD */
 card: {
  width: "100%",
  backgroundColor: "#fff",
  padding: 14,
  borderRadius: 18,

  marginBottom: 14,

  elevation: 4,
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },

  borderWidth: 1,
  borderColor: "#f1f5f9",
  position: "relative",
},

accentBar: {
  position: "absolute",
  top: 0,
  left: 6,       
  right: 6,      
  height: 4,
  borderTopLeftRadius: 18,
  borderTopRightRadius: 18,
},

  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  value: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },

  label: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
    fontWeight: "600",
  },

  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 4,
  },

  trendText: {
    fontSize: 11,
    fontWeight: "600",
  },

  /* QUICK ACTIONS */
  quickActionsContainer: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 18,

    paddingVertical: 6,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },

  quickAction: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  quickActionIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  quickActionText: {
    flex: 1,
  },

  quickActionLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  quickActionSublabel: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
});