import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface ReportCardProps {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
  accentColor: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  label,
  value,
  icon,
  color,
  bg,
  accentColor,
}) => {
  return (
    <View style={styles.card}>
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default function Reports() {
  const reportData = [
    {
      label: "Total Members",
      value: 120,
      icon: "people-outline",
      color: "#16a34a",
      bg: "#dcfce7",
      accentColor: "#16a34a",
    },
    {
      label: "Total Loans",
      value: 85,
      icon: "cash-outline",
      color: "#16a34a",
      bg: "#dcfce7",
      accentColor: "#16a34a",
    },
    {
      label: "Total Payments",
      value: 60,
      icon: "wallet-outline",
      color: "#16a34a",
      bg: "#dcfce7",
      accentColor: "#16a34a",
    },
    {
      label: "Pending Loans",
      value: 25,
      icon: "time-outline",
      color: "#b45309",
      bg: "#fef3c7",
      accentColor: "#f59e0b",
    },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports & Summary</Text>
        <Text style={styles.headerSub}>
          Overview of system performance
        </Text>
      </View>

      {/* GRID */}
      <View style={styles.grid}>
        {reportData.map((item, index) => (
          <ReportCard
            key={index}
            label={item.label}
            value={item.value}
            icon={item.icon}
            color={item.color}
            bg={item.bg}
            accentColor={item.accentColor}
          />
        ))}
      </View>

      {/* SUMMARY SECTION */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Monthly Summary</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Total Loan Released</Text>
          <Text style={styles.rowValue}>₱250,000</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Total Collected</Text>
          <Text style={styles.rowValue}>₱180,000</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Remaining Balance</Text>
          <Text style={styles.rowValue}>₱70,000</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },

  content: {
    paddingBottom: 40,
  },

  /* HEADER */
  header: {
    backgroundColor: "#099a1c",
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  headerSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    marginTop: 4,
  },

  /* GRID */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 10,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    position: "relative",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  accentBar: {
    position: "absolute",
    top: 0,
    left: 6,
    right: 6,
    height: 3,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  value: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1a1a1a",
  },

  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  /* SUMMARY */
  summaryCard: {
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
    color: "#1a1a1a",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },

  rowLabel: {
    fontSize: 13,
    color: "#555",
  },

  rowValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1a1a1a",
  },
});