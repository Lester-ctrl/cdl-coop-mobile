import { login } from "@/api/auth";
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
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const BLUE = "#2952CC";
const BLUE_MID = "#2563C7";
const BLUE_LIGHT_BG = "#EEF2FF";

export default function Login() {
    const { saveSession } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    if (!fontsLoaded) return null;

    const handleLogin = async () => {
        setError(null);
        try {
            if (!email.trim() || !password.trim()) {
                setError("Please enter both email and password.");
                return;
            }

            const result = await login(email, password);
            await saveSession(result.data);

            const role = result.data.role_name;

            switch (role) {
                case 'Member':
                    router.replace('/member/home');
                    break;
                case 'Loan Officer':
                    router.replace('/loan-officer/home');
                    break;
                case 'Account Officer':
                    router.replace('/account-officer/home');
                    break;
                default:
                    setError("Unknown role. Please contact support.");
                    break;
            }
        } catch (error: any) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {/* Blue header */}
            <LinearGradient
                colors={["#51b61a", "#48a019", "#3A8E0D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.logoWrapper}>
                    <Image
                        source={require('@/assets/images/hilongos-logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.appName}>Hilongos Multi-Purpose Cooperative</Text>
            </LinearGradient>

            {/* White card body */}
            <View style={styles.body}>
                <Text style={styles.welcomeTitle}>Welcome Back</Text>

                {error && (
                    <View style={styles.errorBox}>
                        <Ionicons name="alert-circle-outline" size={16} color="#EF4444" style={{ marginRight: 8 }} />
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                {/* Email input */}
                <View style={styles.inputWrapper}>
                    <Ionicons
                        name="person-outline"
                        size={20}
                        color="#9CA3AF"
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="#9CA3AF"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                {/* Password input */}
                <View style={styles.inputWrapper}>
                    <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#9CA3AF"
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#9CA3AF"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                    />
                    <Pressable
                        onPress={() => setShowPassword((prev) => !prev)}
                        style={styles.eyeIcon}
                        hitSlop={8}
                    >
                        <Ionicons
                            name={showPassword ? "eye-outline" : "eye-off-outline"}
                            size={20}
                            color="#9CA3AF"
                        />
                    </Pressable>
                </View>

                {/* Login button */}
                <Pressable
                    onPress={handleLogin}
                    style={({ pressed }) => [
                        styles.loginBtn,
                        pressed && styles.loginBtnPressed,
                    ]}
                >
                    <LinearGradient
                        colors={["#48a019", "#3A8E0D"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.loginBtnGradient}
                    >
                        <Text style={styles.loginBtnText}>Login</Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
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
        backgroundColor: "rgba(255,255,255,0.95)",   // keep light white for contrast
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
        // This helps with transparency issues
        backgroundColor: 'transparent',
    },
    logoBg: {
        width: 68,
        height: 68,
        alignItems: "center",
        justifyContent: "center",
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
        marginBottom: 32,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        paddingHorizontal: 14,
        marginBottom: 16,
        height: 54,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: "#111827",
        height: "100%",
    },
    eyeIcon: {
        padding: 4,
    },
    loginBtn: {
        borderRadius: 14,
        overflow: "hidden",
        marginTop: 8,
        marginBottom: 24,
        shadowColor: BLUE,
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
    registerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 48,
        alignSelf: "center",
        left: 0,
        right: 0,
    },
    registerText: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
    },
    registerLink: {
        fontSize: 14,
        fontFamily: "Poppins_600SemiBold",
        color: "#3A8E0D",
    },
    errorBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEF2F2",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FECACA",
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 12,
    },
    errorText: {
        flex: 1,
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#EF4444",
        lineHeight: 18,
    },
});