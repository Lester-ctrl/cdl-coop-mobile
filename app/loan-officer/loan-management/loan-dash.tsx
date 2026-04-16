import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const dashboardCards = [
  {
    label: "Loan Applications",
    icon: "document-text-outline",
    bg: "#F0FDF4",
    color: "#2D5016",
    route: "/loan-officer/loan-management/loans",
    description: "Review & process applications",
  },
];

interface LoanApplication {
  loan_application_id: string;
  status: string;
  amount_requested?: number;
  created_at?: string;
  member?: {
    profile?: {
      first_name?: string;
      last_name?: string;
    };
  };
  loanAccount?: {
    status?: string;
    principal_amount?: number;
  } | null;
}

const getToken = async (): Promise<string | null> => {
  try {
    const stored = await AsyncStorage.getItem("session");
    if (!stored) return null;
    return JSON.parse(stored)?.token ?? null;
  } catch {
    return null;
  }
};

const formatCompactPeso = (amount: number): string => {
  try {
    const formatted = new Intl.NumberFormat("en-PH", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
    return `₱${formatted}`;
  } catch {
    return `₱${amount.toFixed(0)}`;
  }
};

const formatRelativeTime = (value?: string): string => {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

const getMemberName = (loan: LoanApplication): string => {
  const { first_name, last_name } = loan.member?.profile ?? {};
  if (first_name && last_name) return `${first_name} ${last_name}`;
  return "Unknown Member";
};

const getActivityConfig = (status: string): { icon: string; color: string } => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus.includes("approved")) {
    return { icon: "checkmark-circle", color: "#2D5016" };
  }
  if (
    normalizedStatus.includes("pending") ||
    normalizedStatus.includes("review")
  ) {
    return { icon: "time", color: "#48a019" };
  }
  if (
    normalizedStatus.includes("reject") ||
    normalizedStatus.includes("cancel")
  ) {
    return { icon: "close-circle", color: "#dc2626" };
  }

  return { icon: "document-text", color: "#51b61a" };
};

export default function LoanManagementDashboard() {
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        setIsLoading(true);

        if (!BASE_URL) {
          setLoanApplications([]);
          return;
        }

        const token = await getToken();
        const res = await fetch(
          `${BASE_URL}/api/loan-applications?per_page=50`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch loan applications");

        const data = await res.json();
        setLoanApplications(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching dashboard loans:", error);
        setLoanApplications([]);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchLoanApplications();
  }, []);

  const stats = useMemo(() => {
    const activeLoansCount = loanApplications.filter((loan) => {
      const status = loan.loanAccount?.status?.toLowerCase();
      return status === "active";
    }).length;

    const pendingReviewsCount = loanApplications.filter((loan) => {
      const status = loan.status?.toLowerCase();
      return status === "pending" || status === "under review";
    }).length;

    const totalDisbursed = loanApplications.reduce((sum, loan) => {
      const status = loan.status?.toLowerCase();
      if (status !== "approved") return sum;
      return (
        sum + (loan.loanAccount?.principal_amount ?? loan.amount_requested ?? 0)
      );
    }, 0);

    return [
      {
        label: "Active Loans",
        value: activeLoansCount.toString(),
        icon: "briefcase-outline",
        color: "#2D5016",
      },
      {
        label: "Pending Reviews",
        value: pendingReviewsCount.toString(),
        icon: "time-outline",
        color: "#48a019",
      },
      {
        label: "Total Disbursed",
        value: formatCompactPeso(totalDisbursed),
        icon: "trending-up-outline",
        color: "#51b61a",
      },
    ];
  }, [loanApplications]);

  const recentActivity = useMemo(() => {
    const sortedLoans = [...loanApplications].sort((a, b) => {
      const aTime = new Date(a.created_at ?? 0).getTime();
      const bTime = new Date(b.created_at ?? 0).getTime();
      return bTime - aTime;
    });

    return sortedLoans.slice(0, 3).map((loan) => {
      const { icon, color } = getActivityConfig(loan.status);
      return {
        title: `${getMemberName(loan)} • ${loan.status}`,
        time: formatRelativeTime(loan.created_at),
        icon,
        color,
      };
    });
  }, [loanApplications]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* HEADER */}
      <LinearGradient
        colors={["#2D5016", "#48a019", "#51b61a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>Loan Officer</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>
          Manage loan applications and monitor recent activity
        </Text>
      </LinearGradient>

      {/* STATS SECTION */}
      <View style={styles.statsContainer}>
        {stats.map((stat, idx) => (
          <View key={idx} style={styles.statCard}>
            <View
              style={[
                styles.statIconBg,
                { backgroundColor: `${stat.color}10` },
              ]}
            >
              <Ionicons name={stat.icon as any} size={22} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* DASHBOARD CARDS */}
      <View style={styles.cardsGrid}>
        {dashboardCards.map((card, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.card,
              idx === dashboardCards.length - 1 &&
              dashboardCards.length % 2 !== 0
                ? styles.cardFullWidth
                : null,
              { backgroundColor: card.bg },
            ]}
            onPress={() => router.push(card.route)}
            activeOpacity={0.85}
          >
            <View
              style={[
                styles.cardIconWrapper,
                { backgroundColor: `${card.color}15` },
              ]}
            >
              <Ionicons name={card.icon as any} size={28} color={card.color} />
            </View>
            <Text style={styles.cardLabel}>{card.label}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* RECENT ACTIVITY */}
      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { color: "#2D5016" }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activityList}>
          {isLoading ? (
            <View style={styles.activityEmptyState}>
              <ActivityIndicator size="small" color="#48a019" />
            </View>
          ) : recentActivity.length === 0 ? (
            <Text style={styles.activityEmptyText}>No recent activity yet</Text>
          ) : (
            recentActivity.map((activity, idx) => (
              <View key={idx} style={styles.activityItem}>
                <View
                  style={[
                    styles.activityIcon,
                    { backgroundColor: `${activity.color}10` },
                  ]}
                >
                  <Ionicons
                    name={activity.icon as any}
                    size={20}
                    color={activity.color}
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 48,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    color: "#E8F5E9",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  userName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 2,
  },
  notificationBtn: {
    position: "relative",
    padding: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  headerSubtitle: {
    color: "#E8F5E9",
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.95,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: -28,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  statIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    rowGap: 14,
    marginTop: 18,
  },
  card: {
    width: "48%",
    borderRadius: 24,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardFullWidth: {
    width: "100%",
  },
  cardIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 0,
  },
  recentSection: {
    marginTop: 8,
    paddingHorizontal: 20,
  },
  activityList: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  activityEmptyState: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activityEmptyText: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 13,
    paddingVertical: 20,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: "#94A3B8",
  },
});
