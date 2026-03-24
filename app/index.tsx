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
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      if (!email.trim() || !password.trim()) {
        setError("Please enter both email and password.");
        setLoading(false);
        return;
      }

      const result = await login(email, password);
      await saveSession(result.data);

      // Redirect based on role
      const role = result.data.role_name;
      switch (role) {
        case "Member":
          router.replace("/member/home");
          break;
        case "Loan Officer":
          router.replace("/loan-officer/home");
          break;
        case "Account Officer":
          router.replace("/account-officer/home");
          break;
        default:
          setError("Unknown role: " + role);
          break;
      }
    } catch (error: any) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Blue header */}
      <LinearGradient
        colors={["#1A56DB", "#2563C7", "#3B82F6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.logoWrapper}>
          <View style={styles.logoBg}>
            <Ionicons name="business" size={30} color={BLUE_MID} />
          </View>
        </View>
        <Text style={styles.appName}>Community Cooperative</Text>
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* White card body with inputs and login button */}
        <View style={styles.body}>
          <Text style={styles.welcomeTitle}>Welcome Back</Text>

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
            disabled={loading}
            style={({ pressed }) => [
              styles.loginBtn,
              pressed && styles.loginBtnPressed,
              loading && { opacity: 0.7 },
            ]}
          >
            <LinearGradient
              colors={["#1A56DB", "#3B82F6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginBtnGradient}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginBtnText}>Login</Text>
              )}
            </LinearGradient>
          </Pressable>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <View style={styles.emptyView} />
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Register link absolutely positioned at the bottom */}
      <View style={styles.registerRow}>
        <Text style={styles.registerText}>Not a member yet? </Text>
        <Pressable hitSlop={6} onPress={() => router.push("/guest/apply-now")}>
          <Text style={styles.registerLink}>Apply now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  logoBg: {
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    letterSpacing: 0.2,
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
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginBottom: 12,
  },
  emptyView: {
    height: 20,
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 48,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  registerText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#6B7280",
  },
  registerLink: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: BLUE,
  },
});
