import { StyleSheet, Text, View } from "react-native";

export default function Loans() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loans Management</Text>
      <Text style={styles.subtitle}>Manage member loans</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
});
