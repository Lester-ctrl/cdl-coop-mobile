import { fetchNotifications } from "@/api/notification"; // ✏️ update path to match your api file location
import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

type Notification = {
    id: number;
    title: string;
    description: string;
    created_at: string;
};

export default function NotificationsScreen() {
    const { session } = useAuth();
    const profile = session?.profile;

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!profile?.profile_id) return;

        const loadNotifications = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchNotifications(profile.profile_id);
                setNotifications(data.notifications ?? []);
            } catch (err) {
                setError("Failed to load notifications.");
            } finally {
                setLoading(false);
            }
        };

        loadNotifications();
    }, [profile?.profile_id]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-PH", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={["#1A56DB", "#2563C7", "#3B82F6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.hero}
            >
                <Text style={styles.heroTitle}>Notifications</Text>
            </LinearGradient>

            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="large" color="#1A56DB" style={styles.loader} />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : notifications.length === 0 ? (
                    <Text style={styles.emptyText}>No notifications yet.</Text>
                ) : (
                    notifications.map((item) => (
                        <View key={item.id} style={styles.notifCard}>
                            <View style={styles.notifHeader}>
                                <Text style={styles.notifTitle}>{item.title}</Text>
                                <Text style={styles.notifDate}>{formatDate(item.created_at)}</Text>
                            </View>
                            <Text style={styles.notifDescription}>{item.description}</Text>
                        </View>
                    ))
                )}
            </View>
        </ScrollView>
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
    heroTitle: {
        color: "#FFFFFF",
        fontSize: 28,
        fontFamily: "Poppins_700Bold",
        lineHeight: 38,
        marginBottom: 14,
        letterSpacing: -0.3,
        textAlign: "center",
    },
    content: {
        padding: 20,
    },
    loader: {
        marginTop: 40,
    },
    errorText: {
        textAlign: "center",
        color: "#ef4444",
        marginTop: 40,
        fontSize: 14,
        fontWeight: "600",
    },
    emptyText: {
        textAlign: "center",
        color: "#94a3b8",
        marginTop: 40,
        fontSize: 18,
        fontWeight: "600",
    },
    notifCard: {
        backgroundColor: "#ffffff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    notifHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    notifTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1e293b",
        flex: 1,
        marginRight: 8,
    },
    notifDate: {
        fontSize: 14,
        color: "#94a3b8",
        fontWeight: "500",
    },
    notifDescription: {
        fontSize: 16,
        color: "#64748b",
        lineHeight: 19,
    },
});