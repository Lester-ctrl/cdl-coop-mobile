import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const news = [
  {
    id: 1,
    title: "New Loan Product Launch",
    date: "2026-03-05",
    description: "We are excited to announce a new loan product for members.",
  },
  {
    id: 2,
    title: "Annual General Meeting",
    date: "2026-04-10",
    description: "Join us for the AGM to discuss cooperative progress.",
  },
];

const events = [
  {
    id: 1,
    title: "Financial Literacy Seminar",
    date: "2026-03-15",
    location: "Main Hall",
  },
  {
    id: 2,
    title: "Member Appreciation Day",
    date: "2026-04-20",
    location: "Coop Grounds",
  },
];

export default function NewsAndEvent() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={["#1e3a8a", "#2563eb", "#3b82f6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>News & Events</Text>
        <Text style={styles.headerSubtitle}>
          Stay updated with the latest news and upcoming events.
        </Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        {news.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDate}>{item.date}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {events.map((event) => (
          <View key={event.id} style={styles.card}>
            <Text style={styles.cardTitle}>{event.title}</Text>
            <Text style={styles.cardDate}>{event.date}</Text>
            <Text style={styles.cardDesc}>Location: {event.location}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtitle: { fontSize: 16, color: "#e0e7ef" },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#2563eb" },
  cardDate: { fontSize: 14, color: "#64748b", marginBottom: 4 },
  cardDesc: { fontSize: 14, color: "#334155" },
});
