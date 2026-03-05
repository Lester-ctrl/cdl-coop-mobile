import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [role, setRole] = useState<
    "member" | "account-officer" | "loan-officer" | null
  >(null);

  // Google SSO setup
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "com.cdl.coopmobile",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig?.extra?.expoClientId,
    androidClientId: Constants.expoConfig?.extra?.androidClientId,
    webClientId: Constants.expoConfig?.extra?.webClientId,
    redirectUri,
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const token = response.authentication?.accessToken;

      if (token) {
        Alert.alert("SSO Success", "You are logged in with Google!");
        // Redirect based on role
        handleRoleRedirect("member");
      }
    }

    if (response?.type === "error") {
      setErrorMsg(response.error?.message || "Google login failed");
    }
  }, [response]);

  const handleRoleRedirect = (
    userRole: "member" | "account-officer" | "loan-officer",
  ) => {
    switch (userRole) {
      case "account-officer":
        router.replace("./account-officer");
        break;
      case "loan-officer":
        router.replace("./loan-officer");
        break;
      case "member":
      default:
        router.replace("./member");
        break;
    }
  };

  const handleLogin = () => {
    // Determine role based on email or add role selection UI
    // For now, defaulting to member
    const userRole: "member" | "account-officer" | "loan-officer" = "member";

    if (email && password) {
      handleRoleRedirect(userRole);
    } else {
      Alert.alert("Error", "Please enter email and password");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("@/assets/images/loginbg.png")}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      {/* HEADER */}
      <View style={styles.header}>
        <FontAwesome name="group" size={24} color="white" />
        <Text style={styles.brand}>Community Co-op Something</Text>
        <Text style={styles.tag}>Together we thrive</Text>
      </View>

      {/* CARD */}
      <BlurView intensity={50} style={styles.card}>
        <Text style={styles.cardTitle}>Member Login</Text>

        {/* EMAIL */}
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputWrap}>
          <FontAwesome name="envelope-o" size={16} color="#888" />
          <TextInput
            placeholder="email@example.com"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* PASSWORD */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrap}>
          <FontAwesome name="lock" size={16} color="#888" />
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* OPTIONS */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.remember}
            onPress={() => setRemember(!remember)}
          >
            <View style={[styles.checkbox, remember && styles.checked]} />
            <Text style={{ marginLeft: 8 }}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.linkGreen}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        {/* DIVIDER */}
        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={{ marginHorizontal: 10 }}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* SSO BUTTON */}
        <TouchableOpacity
          style={styles.ssoButton}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <FontAwesome
            name="google"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.ssoButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        {/* ROLE SELECTION (Optional for testing) */}
        <View style={styles.roleContainer}>
          <Text style={styles.roleLabel}>Or login as:</Text>
          <View style={styles.roleButtonsRow}>
            <TouchableOpacity
              style={[styles.roleBtn, role === "member" && styles.roleActive]}
              onPress={() => {
                setRole("member");
                handleRoleRedirect("member");
              }}
            >
              <Text
                style={[
                  styles.roleBtnText,
                  role === "member" && styles.roleBtnTextActive,
                ]}
              >
                Member
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleBtn,
                role === "account-officer" && styles.roleActive,
              ]}
              onPress={() => {
                setRole("account-officer");
                handleRoleRedirect("account-officer");
              }}
            >
              <Text
                style={[
                  styles.roleBtnText,
                  role === "account-officer" && styles.roleBtnTextActive,
                ]}
              >
                Account Officer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleBtn,
                role === "loan-officer" && styles.roleActive,
              ]}
              onPress={() => {
                setRole("loan-officer");
                handleRoleRedirect("loan-officer");
              }}
            >
              <Text
                style={[
                  styles.roleBtnText,
                  role === "loan-officer" && styles.roleBtnTextActive,
                ]}
              >
                Loan Officer
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* APPLY */}
        <Text style={styles.applyText}>
          Not a member yet?{" "}
          <Text style={styles.linkGreen}>Apply for Membership</Text>
        </Text>

        {errorMsg && (
          <Text style={{ color: "red", marginTop: 20 }}>
            Google SSO Error: {errorMsg}
          </Text>
        )}
      </BlurView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundImage: "@/assets/images/loginbg.png",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1.0,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  brand: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  tag: {
    color: "#dff7ec",
    marginTop: 4,
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "600",
  },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },

  remember: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#555",
  },
  checked: {
    backgroundColor: "#1c3faa",
  },

  loginBtn: {
    backgroundColor: "#1c3faa",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },

  ssoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ea4335",
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    marginBottom: 10,
  },
  ssoButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },

  roleContainer: {
    marginVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingTop: 15,
  },
  roleLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  roleButtonsRow: {
    flexDirection: "row",
    gap: 8,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#1c3faa",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  roleActive: {
    backgroundColor: "#1c3faa",
  },
  roleBtnText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#1c3faa",
  },
  roleBtnTextActive: {
    color: "#fff",
  },

  applyText: {
    textAlign: "center",
    marginTop: 15,
  },

  linkGreen: {
    color: "#1c3faa",
    fontWeight: "600",
  },
});
