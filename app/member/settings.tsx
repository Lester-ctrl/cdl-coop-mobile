import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Settings() {
    const insets = useSafeAreaInsets();
    const [faceRecognition, setFaceRecognition] = useState(false);

    const handleFaceRecognitionToggle = (value: boolean) => {
        if (value) {
            Alert.alert(
                "Enable Face Recognition",
                "This will allow you to unlock the app using your face. Do you want to continue?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Enable",
                        onPress: () => setFaceRecognition(true),
                    },
                ]
            );
        } else {
            setFaceRecognition(false);
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <LinearGradient
                    colors={["#51b61a", "#48a019", "#3A8E0D"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.header}
                >
                    <Text style={styles.heroTitle}>Settings</Text>
                </LinearGradient>

                {/* Security Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIconBox}>
                            <Ionicons name="shield-checkmark-outline" size={18} color="#3A8E0D" />
                        </View>
                        <Text style={styles.sectionTitle}>Security</Text>
                    </View>

                    <View style={styles.card}>
                        {/* Change PIN */}
                        <TouchableOpacity
                            style={styles.row}
                            activeOpacity={0.7}
                            // onPress={() => router.push("/change-pin")}
                        >
                            <View style={styles.rowLeft}>
                                <View style={[styles.rowIconBox, { backgroundColor: "#EAF3DE" }]}>
                                    <Ionicons name="keypad-outline" size={20} color="#3A8E0D" />
                                </View>
                                <View style={styles.rowText}>
                                    <Text style={styles.rowTitle}>Change PIN</Text>
                                    <Text style={styles.rowSubtitle}>Update your 4-digit security PIN</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#C0C4CE" />
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        {/* Face Recognition */}
                        <View style={styles.row}>
                            <View style={styles.rowLeft}>
                                <View style={[styles.rowIconBox, { backgroundColor: "#EEF3FB" }]}>
                                    <Ionicons name="scan-outline" size={20} color="#2563C7" />
                                </View>
                                <View style={styles.rowText}>
                                    <Text style={styles.rowTitle}>Face Recognition</Text>
                                    <Text style={styles.rowSubtitle}>Unlock app with your face</Text>
                                </View>
                            </View>
                            <Switch
                                value={faceRecognition}
                                onValueChange={handleFaceRecognitionToggle}
                                trackColor={{ false: "#E5E7EB", true: "#86C864" }}
                                thumbColor={faceRecognition ? "#3A8E0D" : "#f4f3f4"}
                                ios_backgroundColor="#E5E7EB"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f5f9",
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 14,
        paddingBottom: 32,
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

    /* Section */
    section: {
        marginTop: 28,
        marginHorizontal: 16,
        marginBottom: 8,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
        paddingHorizontal: 4,
    },
    sectionIconBox: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: "#EAF3DE",
        alignItems: "center",
        justifyContent: "center",
    },
    sectionTitle: {
        fontSize: 15,
        fontFamily: "Poppins_600SemiBold",
        color: "#1C1C2E",
        letterSpacing: 0.1,
    },

    /* Card */
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 4,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },

    /* Row */
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
    },
    rowLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },
    rowIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    rowText: {
        flex: 1,
    },
    rowTitle: {
        fontSize: 15,
        fontFamily: "Poppins_600SemiBold",
        color: "#1C1C2E",
        marginBottom: 2,
    },
    rowSubtitle: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: "#8890A4",
    },
    divider: {
        height: 1,
        backgroundColor: "#F1F3F7",
        marginLeft: 52,
    },
});