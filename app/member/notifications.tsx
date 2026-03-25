import { deleteNotification, fetchNotifications } from "@/api/notification";
import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { Trash2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

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

    const confirmDelete = async () => {
        if (deleteTargetId === null) return;
        try {
            await deleteNotification(deleteTargetId);
            setNotifications((prev) => prev.filter((n) => n.id !== deleteTargetId));
        } catch (err) {
            console.log("Error", "Failed to delete notification. Please try again.");
        } finally {
            setDeleteTargetId(null);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#3A8E0D" }} edges={["top"]}>
            <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={["#51b61a", "#48a019", "#3A8E0D"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.hero}
                >
                    <Text style={styles.heroTitle}>Notifications</Text>
                </LinearGradient>

                <View style={styles.content}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#3A8E0D" style={styles.loader} />
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
                                <View style={styles.notifFooter}>
                                    <Text style={styles.notifDescription}>{item.description}</Text>
                                    <TouchableOpacity
                                        onPress={() => setDeleteTargetId(item.id)}
                                        style={styles.deleteButton}
                                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    >
                                        <Trash2 size={22} color="#ef4444" strokeWidth={2} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>

            {/* Delete Confirmation Modal */}
            <Modal
                visible={deleteTargetId !== null}
                transparent
                animationType="fade"
                onRequestClose={() => setDeleteTargetId(null)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setDeleteTargetId(null)}>
                    <Pressable style={styles.modalCard} onPress={() => {}}>
                        <View style={styles.modalIconWrapper}>
                            <Trash2 size={28} color="#ef4444" strokeWidth={2} />
                        </View>
                        <Text style={styles.modalTitle}>Delete Notification</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to delete this notification? This action cannot be undone.
                        </Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setDeleteTargetId(null)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={confirmDelete}
                            >
                                <Text style={styles.confirmButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
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
        marginBottom: 12,
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
    notifFooter: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    notifDescription: {
        fontSize: 16,
        color: "#64748b",
        lineHeight: 19,
        flex: 1,
        marginRight: 12,
    },
    deleteButton: {
        padding: 4,
    },

    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        justifyContent: "center",
        alignItems: "center",
        padding: 28,
    },
    modalCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 28,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 10,
    },
    modalIconWrapper: {
        backgroundColor: "#fef2f2",
        borderRadius: 50,
        padding: 16,
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 10,
        textAlign: "center",
    },
    modalMessage: {
        fontSize: 15,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 24,
    },
    modalActions: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 13,
        borderRadius: 12,
        backgroundColor: "#f1f5f9",
        alignItems: "center",
    },
    cancelButtonText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#64748b",
    },
    confirmButton: {
        flex: 1,
        paddingVertical: 13,
        borderRadius: 12,
        backgroundColor: "#ef4444",
        alignItems: "center",
    },
    confirmButtonText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#ffffff",
    },
});