import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const news = [
  {
    id: 1,
    title: "New Loan Product Launch",
    date: "2026-03-05",
    description: "We are excited to announce a new loan product for members.",
    icon: "megaphone-outline" as const,
    color: "#3A8E0D",
    bg: "#DCFCE7",
  },
  {
    id: 2,
    title: "Annual General Meeting",
    date: "2026-04-10",
    description: "Join us for the AGM to discuss cooperative progress.",
    icon: "people-outline" as const,
    color: "#059669",
    bg: "#ECFDF5",
  },
];

const events = [
  {
    id: 1,
    title: "Financial Literacy Seminar",
    date: "2026-03-15",
    location: "Main Hall",
    icon: "school-outline" as const,
    color: "#9333EA",
    bg: "#F3E8FF",
  },
  {
    id: 2,
    title: "Member Appreciation Day",
    date: "2026-04-20",
    location: "Coop Grounds",
    icon: "heart-outline" as const,
    color: "#DC2626",
    bg: "#FEF2F2",
  },
];

export default function NewsAndEvent() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={["#2D5016", "#48a019", "#51b61a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.tag}>
          <Text style={styles.tagText}>Stay Informed</Text>
        </View>
        <Text style={styles.headerTitle}>News & Events</Text>
        <Text style={styles.headerSubtitle}>
          Stay updated with the latest cooperative news and upcoming events.
        </Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        <Text style={styles.sectionSubtitle}>
          Recent announcements and updates
        </Text>
        {news.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <View style={[styles.dateBadge, { backgroundColor: item.bg }]}>
                <Text style={[styles.dateBadgeText, { color: item.color }]}>
                  {item.date}
                </Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <Text style={styles.sectionSubtitle}>Don't miss these activities</Text>
        {events.map((event) => (
          <View key={event.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: event.bg }]}>
                <Ionicons name={event.icon} size={20} color={event.color} />
              </View>
              <View style={[styles.dateBadge, { backgroundColor: event.bg }]}>
                <Text style={[styles.dateBadgeText, { color: event.color }]}>
                  {event.date}
                </Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>{event.title}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color="#6B7280" />
              <Text style={styles.locationText}>{event.location}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const TEXT = "#1C1C2E";
const MUTED = "#6B7280";
const BORDER = "#E8EAF0";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  header: {
    padding: 28,
    paddingBottom: 36,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 16,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    letterSpacing: 0.3,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    color: "#fff",
    lineHeight: 38,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.82)",
    lineHeight: 22,
  },
  section: { paddingHorizontal: 20, marginBottom: 24, marginTop: 8 },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    color: TEXT,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: MUTED,
    marginBottom: 16,
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dateBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  dateBadgeText: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    color: TEXT,
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: MUTED,
    lineHeight: 20,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: MUTED,
  },
});
