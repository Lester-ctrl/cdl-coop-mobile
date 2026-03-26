import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Reports() {
  const reportData = [
    {
      title: "Total Members",
      value: 120,
      icon: "people-outline",
    },
    {
      title: "Total Loans",
      value: 85,
      icon: "cash-outline",
    },
    {
      title: "Total Payments",
      value: 60,
      icon: "wallet-outline",
    },
    {
      title: "Pending Loans",
      value: 25,
      icon: "time-outline",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Account Officer Reports</Text>

      <View style={styles.grid}>
        {reportData.map((item, index) => (
          <View key={index} style={styles.card}>
            <Ionicons name={item.icon} size={40} color="#1c3faa" />
            <Text style={styles.cardValue}>{item.value}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Monthly Summary</Text>

        <View style={styles.row}>
          <Text>Total Loan Released</Text>
          <Text>₱250,000</Text>
        </View>

        <View style={styles.row}>
          <Text>Total Collected</Text>
          <Text>₱180,000</Text>
        </View>

        <View style={styles.row}>
          <Text>Remaining Balance</Text>
          <Text>₱70,000</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },

  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  cardTitle: {
    fontSize: 14,
    color: "#555",
  },

  summary: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});
