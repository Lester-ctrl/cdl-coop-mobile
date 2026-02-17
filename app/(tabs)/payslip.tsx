import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet, View } from "react-native";

export default function PayslipScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Payslip
      </ThemedText>
      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold" style={styles.name}>
          John Doe
        </ThemedText>
        <ThemedText style={styles.label}>Employee ID: 123456</ThemedText>
        <ThemedText style={styles.label}>Period: Jan 2026</ThemedText>
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Earnings
          </ThemedText>
          <View style={styles.row}>
            <ThemedText style={{ color: "black" }}>Basic Salary</ThemedText>
            <ThemedText style={{ color: "black" }}>₱30,000.00</ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText style={{ color: "black" }}>Allowance</ThemedText>
            <ThemedText style={{ color: "black" }}>₱5,000.00</ThemedText>
          </View>
        </View>
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Deductions
          </ThemedText>
          <View style={styles.row}>
            <ThemedText style={{ color: "black" }}>Tax</ThemedText>
            <ThemedText style={{ color: "black" }}>-₱2,500.00</ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText style={{ color: "black" }}>SSS/PhilHealth</ThemedText>
            <ThemedText style={{ color: "black" }}>-₱1,000.00</ThemedText>
          </View>
        </View>
        <View style={styles.totalRow}>
          <ThemedText type="defaultSemiBold" style={{ color: "black" }}>
            Net Pay
          </ThemedText>
          <ThemedText
            type="defaultSemiBold"
            style={[styles.netPay, { color: "black" }]}
          >
            ₱31,500.00
          </ThemedText>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#2845d6",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  name: {
    color: "black",
    fontSize: 20,
    marginBottom: 4,
  },
  label: {
    color: "black",
    marginBottom: 2,
  },
  section: {
    marginTop: 18,
    marginBottom: 8,
  },
  sectionTitle: {
    color: "black",
    fontSize: 16,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: "black",
    paddingTop: 12,
  },
  netPay: {
    color: "#1c3faa",
    fontSize: 18,
  },
});
