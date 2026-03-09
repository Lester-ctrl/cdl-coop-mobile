import {
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { ComponentProps } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const BLUE = "#2952CC";
const BLUE_DARK = "#1a3aab";
const BLUE_LIGHT = "#EEF2FF";
const PURPLE = "#A855F7";
const ORANGE = "#FFA500";
const YELLOWGREEN = "#9ACD32";
const GREEN = "#22C55E";

const historyData = [
    {
        year: "2001",
        title: "Foundation",
        desc: "Community Cooperative was founded by 50 visionary members who believed in the power of cooperation to transform lives and strengthen communities.",
    },
    {
        year: "2010",
        title: "Growth & Expansion",
        desc: "Reached 5,000 members and opened our second branch, expanding our services to serve more communities and offering new financial products.",
    },
    {
        year: "2020",
        title: "Digital Transformation",
        desc: "Launched digital banking services and mobile app, making it easier than ever for members to access their accounts and manage their finances.",
    },
    {
        year: "2026",
        title: "Today",
        desc: "Proudly serving over 10,000 members with $50M+ in assets, continuing our mission to empower our community through cooperative banking.",
    },
];

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

const coreValues: { icon: IoniconsName; color: string; title: string; desc: string }[] = [
    {
        icon: "shield-checkmark-outline",
        color: BLUE,
        title: "Integrity",
        desc: "We uphold the highest standards of honesty and transparency",
    },
    {
        icon: "people-outline",
        color: BLUE,
        title: "Community",
        desc: "We strengthen our community through mutual support",
    },
    {
        icon: "trending-up-outline",
        color: BLUE,
        title: "Growth",
        desc: "We foster financial growth for all our members",
    },
    {
        icon: "trophy-outline",
        color: BLUE,
        title: "Excellence",
        desc: "We deliver exceptional service and value",
    },
];

const BoardOfDirectors = [
    { position: "Chairman", name: "Example Name", pfpUrl: "" },
    { position: "Vice Chairman", name: "Example Name", pfpUrl: "" },
    { position: "Treasurer", name: "Example Name", pfpUrl: "" },
    { position: "Secretary", name: "Example Name", pfpUrl: "" },
];

export default function AboutUs() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });
    
      if (!fontsLoaded) return null;
    return (
        <>
            <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={["#1A56DB", "#2563C7", "#3B82F6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.hero}
                >
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Our Story</Text>
                    </View>
                    <Text style={styles.heroTitle}>About Us</Text>
                    <Text style={styles.heroDesc}>
                        Building a stronger community through cooperative
                        banking since 2001
                    </Text>
                </LinearGradient>

                <View style={styles.cardsWrapper}>
                    <View style={styles.card}>
                        <View style={styles.cardTopRow}>
                            <View style={styles.iconBox}>
                                <Ionicons name="eye-outline" size={28} color={BLUE} />
                            </View>
                            <Text style={styles.cardTitle}>Our Vision</Text>
                        </View>
                        <Text style={styles.cardDesc}>
                            To be the leading community cooperative,
                            empowering members through innovative
                            financial solutions and fostering sustainable
                            economic development for generations to come.
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardTopRow}>
                            <View style={styles.iconBox}>
                                <Ionicons name="locate-outline" size={28} color={PURPLE} />
                            </View>
                            <Text style={styles.cardTitle}>Our Mission</Text>
                        </View>
                        <Text style={styles.cardDesc}>
                            To provide accessible, member-focused
                            financial services that promote economic
                            well-being, strengthen community bonds, and
                            create lasting value through cooperative
                            principles.
                        </Text>
                    </View>
                </View>

                {/* Our History Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.iconBox}>
                            <Ionicons name="time-outline" size={28} color={ORANGE} />
                        </View>
                        <Text style={styles.sectionTitle}>Our History</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.timeline}>
                            {historyData.map((item, index) => (
                                <View key={index} style={styles.timelineItem}>
                                    <View style={styles.timelineLeft}>
                                        <View style={styles.yearBadge}>
                                            <Text style={styles.yearText}>{item.year}</Text>
                                        </View>
                                        {index < historyData.length - 1 && (
                                            <View style={styles.connector} />
                                        )}
                                    </View>
                                    <View style={styles.timelineContent}>
                                        <Text style={styles.timelineTitle}>{item.title}</Text>
                                        <Text style={styles.timelineDesc}>{item.desc}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Our Core Values Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.iconBox}>
                            <Ionicons name="star" size={28} color={YELLOWGREEN} />
                        </View>
                        <Text style={styles.sectionTitle}>Our Core Values</Text>
                    </View>

                    <View style={styles.valuesGrid}>
                        {coreValues.map((item, index) => (
                            <View key={index} style={styles.valueCard}>
                                <View style={styles.checkBadge}>
                                    <Ionicons name="checkmark-circle" size={20} color={GREEN} />
                                </View>
                                <View style={styles.valueIconBox}>
                                    <Ionicons name={item.icon} size={28} color={BLUE} />
                                </View>
                                <Text style={styles.valueTitle}>{item.title}</Text>
                                <Text style={styles.valueDesc}>{item.desc}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Board of Directors Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Board of Directors</Text>
                    </View>

                    <View style={styles.valuesGrid}>
                        {BoardOfDirectors.map((item, index) => (
                            <View key={index} style={styles.boardCard}>
                                {/* Profile picture or fallback avatar */}
                                {item.pfpUrl ? (
                                    <Image
                                        source={{ uri: item.pfpUrl }}
                                        style={styles.boardAvatar}
                                    />
                                ) : (
                                    <View style={styles.boardAvatarFallback}>
                                        <Ionicons name="person" size={36} color={BLUE} />
                                    </View>
                                )}
                                <Text style={styles.boardName}>{item.name}</Text>
                                <Text style={styles.boardPosition}>{item.position}</Text>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F5F6FA",
    },
    hero: {
        padding: 28,
        paddingBottom: 36,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    tag: {
        alignSelf: "center",
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
    heroTitle: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 30,
        fontFamily: "Poppins_700Bold",
        lineHeight: 38,
        marginBottom: 14,
        letterSpacing: -0.3,
    },
    heroDesc: {
        textAlign: "center",
        color: "rgba(255,255,255,0.82)",
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        lineHeight: 22,
    },
    cardsWrapper: {
        paddingHorizontal: 20,
        paddingTop: 24,
        gap: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    cardTopRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 15,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: BLUE_LIGHT,
        alignItems: "center",
        justifyContent: "center",
    },
    cardTitle: {
        color: "#111827",
        fontSize: 24,
        fontFamily: "Poppins_700Bold",
        marginBottom: 6,
    },
    cardDesc: {
        color: "#6B7280",
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        lineHeight: 20,
        marginBottom: 16,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
    },
    section: {
        padding: 20,
        paddingBottom: 32,
        alignItems: "center",
    },
    sectionHeader: {
        alignItems: "center",
        marginBottom: 24,
        marginTop: 8,
        flexDirection: "row",
        gap: 15,
    },
    sectionTitle: {
        fontSize: 26,
        fontFamily: "Poppins_700Bold",
        color: "#000000",
        marginBottom: 6,
        textAlign: "center",
    },

    // ── Timeline styles ──────────────────────────────────────────
    timeline: {
        paddingLeft: 4,
    },
    timelineItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 16,
    },
    timelineLeft: {
        alignItems: "center",
        width: 64,
    },
    yearBadge: {
        backgroundColor: BLUE,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
        width: 64,
    },
    yearText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "Poppins_700Bold",
        letterSpacing: 0.2,
    },
    connector: {
        width: 2,
        flex: 1,
        minHeight: 32,
        backgroundColor: "#D1D5DB",
        marginVertical: 4,
    },
    timelineContent: {
        flex: 1,
        paddingBottom: 28,
        paddingTop: 4,
    },
    timelineTitle: {
        fontSize: 17,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
        marginBottom: 6,
    },
    timelineDesc: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
        lineHeight: 21,
    },

    // ── Core Values styles ───────────────────────────────────────
    valuesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 14,
        justifyContent: "center",
        width: "100%",
    },
    valueCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 18,
        width: "47%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        position: "relative",
    },
    checkBadge: {
        position: "absolute",
        top: 12,
        right: 12,
    },
    valueIconBox: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: BLUE_LIGHT,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        marginTop: 8,
    },
    valueTitle: {
        fontSize: 16,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
        marginBottom: 6,
        textAlign: "center",
    },
    valueDesc: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
        lineHeight: 19,
        textAlign: "center",
    },

    // ── Board of Directors styles ────────────────────────────────
    boardCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 18,
        width: "47%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        gap: 6,
    },
    boardAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
    },
    boardAvatarFallback: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: BLUE_LIGHT,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    boardName: {
        fontSize: 15,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
        textAlign: "center",
    },
    boardPosition: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: BLUE,
        textAlign: "center",
    },
});