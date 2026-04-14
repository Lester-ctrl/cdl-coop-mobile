import { useAuth } from "@/context/AuthContext";
import {
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function ChangePin() {
    const { session, saveSession } = useAuth();
    const [pin, setPin] = useState(["", "", "", ""]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const inputs = useRef<(TextInput | null)[]>([]);
    const router = useRouter();

    const profile = session?.profile;

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    if (!fontsLoaded) return null;

    const handlePinChange = (text: string, index: number) => {
        const digit = text.replace(/[^0-9]/g, "").slice(-1);
        const newPin = [...pin];
        newPin[index] = digit;
        setPin(newPin);

        if (digit && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === "Backspace" && !pin[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const fullPin = pin.join("");
        if (fullPin.length < 4) {
            setError("Please enter all 4 digits.");
            return;
        }

        setLoading(true);
        setError(null);

        // try {
        //     await setPinVal(fullPin, session!.token);
        //     // Update session so has_pin is no longer empty
        //     await saveSession({ ...session!, has_pin: fullPin });

        //     const role = session?.role_name;

        //     switch (role) {
        //       case "Member":
        //         router.replace("/member/home");
        //         break;
        //       case "Loan Officer":
        //         router.replace("/loan-officer/home");
        //         break;
        //       case "Account Officer":
        //         router.replace("/account-officer/home");
        //         break;
        //       default:
        //         setError("Unknown role. Please contact support.");
        //         break;
        //     }
        // } catch (err: any) {
        //     setError("Failed to save PIN. Please try again.");
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={["#51b61a", "#48a019", "#3A8E0D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.logoWrapper}>
                    <Image
                        source={require("@/assets/images/hilongos-logo.png")}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.appName}>Hilongos Multi-Purpose Cooperative</Text>
            </LinearGradient>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.body}>
                    <Text style={styles.welcomeTitle}>Enter new 4-digit PIN</Text>
                    <Text style={styles.pinSubtitle}>
                        This PIN will be used to secure your account
                    </Text>

                    {/* PIN boxes */}
                    <View style={styles.pinRow}>
                        {pin.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => { inputs.current[index] = ref; }}
                                style={[
                                    styles.pinBox,
                                    digit ? styles.pinBoxFilled : null,
                                ]}
                                value={digit ? "•" : ""}
                                onChangeText={(text) => handlePinChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                caretHidden
                                selectTextOnFocus
                                textAlign="center"
                            />
                        ))}
                    </View>

                    {/* Continue button */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.loginBtn,
                            pressed && styles.loginBtnPressed,
                        ]}
                        onPress={handleSubmit}
                    >
                        <LinearGradient
                            colors={["#51b61a", "#3A8E0D"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.loginBtnGradient}
                        >
                            <Text style={styles.loginBtnText}>Continue</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingCard}>
                        <View style={styles.loaderSpinner}>
                            <ActivityIndicator size={48} color="#2563eb" />
                        </View>
                        <Text style={styles.loadingTitle}>Setting Up PIN</Text>
                        <Text style={styles.loadingSubtext}>Please wait a moment...</Text>
                    </View>
                </View>
            )}

            {error && (
                <View style={styles.errorToast}>
                    <View style={styles.errorContent}>
                        <View style={[styles.errorIconBox, { backgroundColor: "#fee2e2" }]}>
                            <Ionicons name="close-circle" size={24} color="#dc2626" />
                        </View>
                        <View style={styles.errorMessageBox}>
                            <Text style={styles.errorTitle}>Error</Text>
                            <Text style={styles.errorMessage}>{error}</Text>
                        </View>
                        <Pressable
                            onPress={() => setError(null)}
                            hitSlop={8}
                            style={styles.errorCloseBtn}
                        >
                            <Ionicons name="close" size={20} color="#9ca3af" />
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F5F6FA",
    },
    header: {
        paddingTop: 64,
        paddingBottom: 48,
        alignItems: "center",
        gap: 14,
    },
    logoWrapper: {
        width: 85,
        height: 85,
        borderRadius: 42.5,
        backgroundColor: "rgba(255,255,255,0.95)",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 5 },
        elevation: 8,
    },
    logoImage: {
        width: 72,
        height: 72,
        backgroundColor: "transparent",
    },
    appName: {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "Poppins_700Bold",
        letterSpacing: 0.2,
        textAlign: "center",
    },
    body: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -24,
        paddingHorizontal: 28,
        paddingTop: 40,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: -4 },
        elevation: 8,
    },
    welcomeTitle: {
        fontSize: 26,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
        textAlign: "center",
        marginBottom: 8,
    },
    pinSubtitle: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 36,
    },
    pinRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 14,
        marginBottom: 36,
    },
    pinBox: {
        width: 62,
        height: 70,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        backgroundColor: "#F9FAFB",
        fontSize: 32,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
        textAlign: "center",
    },
    pinBoxFilled: {
        borderColor: "#3A8E0D",
        backgroundColor: "#EAF3DE",
        color: "#3A8E0D",
    },
    loginBtn: {
        borderRadius: 14,
        overflow: "hidden",
        marginTop: 8,
        marginBottom: 24,
        shadowColor: "blue",
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    loginBtnPressed: {
        opacity: 0.88,
    },
    loginBtnGradient: {
        height: 54,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
    },
    loginBtnText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontFamily: "Poppins_700Bold",
        letterSpacing: 0.3,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
    },
    loadingCard: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        paddingVertical: 48,
        paddingHorizontal: 40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
        width: "80%",
        maxWidth: 280,
    },
    loaderSpinner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#f0f9ff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    loadingTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 8,
        fontFamily: "Poppins_700Bold",
    },
    loadingSubtext: {
        fontSize: 13,
        color: "#64748b",
        fontFamily: "Poppins_400Regular",
        textAlign: "center",
    },
    errorToast: {
        position: "absolute",
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: "#ffffff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
        zIndex: 100,
        overflow: "hidden",
    },
    errorContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 12,
    },
    errorIconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
    },
    errorMessageBox: {
        flex: 1,
    },
    errorTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 2,
        fontFamily: "Poppins_700Bold",
    },
    errorMessage: {
        fontSize: 13,
        color: "#64748b",
        fontFamily: "Poppins_400Regular",
    },
    errorCloseBtn: {
        padding: 6,
        flexShrink: 0,
    },
});