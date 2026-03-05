import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface LoanTransaction {
  id: string;
  name: string;
  employeeId: string;
  loanType: string;
  principal: number;
  interestRate: number;
  monthlyPayment: number;
  remainingBalance: number;
  status: string;
}

const loanTransactionData: LoanTransaction[] = [
  {
    id: "1",
    name: "John Doe",
    employeeId: "123456",
    loanType: "Emergency Loan",
    principal: 50000,
    interestRate: 5.5,
    monthlyPayment: 2500,
    remainingBalance: 35000,
    status: "Active",
  },
];

export default function TransactionScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = loanTransactionData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeId.includes(searchQuery),
  );

  const getStatusColor = (status: string) => {
    return status === "Active" ? "#10b981" : "#8b5cf6";
  };

  const getStatusIcon = (status: string) => {
    return status === "Active" ? "check-circle" : "done-all";
  };

  const getLoanTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "Emergency Loan": "#f59e0b",
      "Educational Loan": "#3b82f6",
      "Housing Loan": "#8b5cf6",
      "Personal Loan": "#ec4899",
      "Medical Loan": "#ef4444",
    };
    return colors[type] || "#6b7280";
  };

  const renderLoanCard = ({ item }: { item: LoanTransaction }) => (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.userInfo}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: getLoanTypeColor(item.loanType) },
              ]}
            >
              <ThemedText style={styles.avatarText}>
                {item.name.charAt(0)}
              </ThemedText>
            </View>
            <View style={styles.userDetails}>
              <ThemedText style={styles.userName}>{item.name}</ThemedText>
              <ThemedText style={styles.userId}>
                ID: {item.employeeId}
              </ThemedText>
            </View>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${getStatusColor(item.status)}20` },
            ]}
          >
            <MaterialIcons
              name={getStatusIcon(item.status)}
              size={16}
              color={getStatusColor(item.status)}
            />
            <ThemedText
              style={[
                styles.statusText,
                { color: getStatusColor(item.status) },
              ]}
            >
              {item.status}
            </ThemedText>
          </View>
        </View>

        {/* Loan Type Badge */}
        <View
          style={[
            styles.loanTypeBadge,
            { backgroundColor: `${getLoanTypeColor(item.loanType)}15` },
          ]}
        >
          <ThemedText
            style={[
              styles.loanTypeText,
              { color: getLoanTypeColor(item.loanType) },
            ]}
          >
            {item.loanType}
          </ThemedText>
        </View>

        {/* Main Balance Display */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceItem}>
            <ThemedText style={styles.balanceLabel}>
              Remaining Balance
            </ThemedText>
            <ThemedText style={styles.balanceAmount}>
              ₱{item.remainingBalance.toLocaleString()}
            </ThemedText>
          </View>
          <View style={styles.divider} />
          <View style={styles.balanceItem}>
            <ThemedText style={styles.balanceLabel}>Monthly Payment</ThemedText>
            <ThemedText style={[styles.balanceAmount, { fontSize: 16 }]}>
              ₱{item.monthlyPayment.toLocaleString()}
            </ThemedText>
          </View>
        </View>

        {/* Details Grid */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <ThemedText style={styles.detailLabel}>Principal</ThemedText>
            <ThemedText style={styles.detailValue}>
              ₱{item.principal.toLocaleString()}
            </ThemedText>
          </View>
          <View style={styles.detailItem}>
            <ThemedText style={styles.detailLabel}>Interest Rate</ThemedText>
            <ThemedText style={styles.detailValue}>
              {item.interestRate}%
            </ThemedText>
          </View>
        </View>

        {/* Progress Bar */}
        {item.status === "Active" && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <ThemedText style={styles.progressLabel}>
                Loan Progress
              </ThemedText>
              <ThemedText style={styles.progressPercent}>
                {Math.round((1 - item.remainingBalance / item.principal) * 100)}
                %
              </ThemedText>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.round((1 - item.remainingBalance / item.principal) * 100)}%`,
                    backgroundColor: getLoanTypeColor(item.loanType),
                  },
                ]}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.headerSection}>
        <ThemedText style={styles.title}>Loan Transactions</ThemedText>
        <ThemedText style={styles.subtitle}>
          {filteredData.length} loan
        </ThemedText>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#9ca3af" />
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name or ID"
          placeholderTextColor="#d1d5db"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== "" && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <MaterialIcons name="close" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        renderItem={renderLoanCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="search-off" size={48} color="#d1d5db" />
            <ThemedText style={styles.emptyText}>No loans found</ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchBar: {
    flex: 1,
    fontSize: 14,
    color: "#1f2937",
    marginHorizontal: 10,
    paddingVertical: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 2,
  },
  userId: {
    fontSize: 12,
    color: "#9ca3af",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  loanTypeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  loanTypeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  balanceContainer: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  balanceItem: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
    fontWeight: "500",
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
  },
  divider: {
    width: 1,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 12,
  },
  detailsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  detailItem: {
    flex: 1,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 11,
    color: "#9ca3af",
    marginBottom: 4,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f2937",
  },
  progressSection: {
    marginTop: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
  },
  progressPercent: {
    fontSize: 12,
    color: "#1f2937",
    fontWeight: "700",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 12,
    fontWeight: "500",
  },
});
