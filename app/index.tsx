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
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get("window");
const isTablet = width >= 768;
const isSmallPhone = width < 375;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [role, setRole] = useState<
    "member" | "account-officer" | "loan-officer" | null
  >(null);

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
    if (email && password) {
      handleRoleRedirect("member");
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

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <FontAwesome name="group" size={isTablet ? 32 : 24} color="white" />
          <Text style={styles.brand}>
            {isTablet
              ? "Community\nCo-op Something"
              : "Community Co-op\nSomething"}
          </Text>
          <Text style={styles.tag}>Together we thrive</Text>
        </View>

        {/* CARD */}
        <BlurView
          intensity={50}
          style={[styles.card, isTablet && styles.cardTablet]}
        >
          <Text style={styles.cardTitle}>Member Login</Text>

          {/* EMAIL */}
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWrap}>
            <FontAwesome
              name="envelope-o"
              size={isSmallPhone ? 14 : 16}
              color="#888"
            />
            <TextInput
              placeholder="email@example.com"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
            />
          </View>

          {/* PASSWORD */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrap}>
            <FontAwesome
              name="lock"
              size={isSmallPhone ? 14 : 16}
              color="#888"
            />
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#999"
            />
          </View>

          {/* OPTIONS */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.remember}
              onPress={() => setRemember(!remember)}
            >
              <View style={[styles.checkbox, remember && styles.checked]} />
              <Text style={styles.checkboxText}>Remember me</Text>
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
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerTextWrapper}>
              <Text style={styles.dividerText}>OR</Text>
            </View>
            <View style={styles.dividerLine} />
          </View>

          {/* SSO BUTTON */}
          <TouchableOpacity
            style={styles.ssoButton}
            onPress={() => promptAsync()}
            disabled={!request}
          >
            <FontAwesome
              name="google"
              size={isSmallPhone ? 16 : 18}
              color="#fff"
            />
            <Text style={styles.ssoButtonText}>Sign in with Google</Text>
          </TouchableOpacity>

          {/* ROLE SELECTION */}
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>Or login as:</Text>
            <View
              style={[
                styles.roleButtonsRow,
                isSmallPhone && styles.roleButtonsColumn,
              ]}
            >
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
                  numberOfLines={1}
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
                  numberOfLines={1}
                >
                  {isSmallPhone ? "Acc. Officer" : "Account Officer"}
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
                  numberOfLines={1}
                >
                  {isSmallPhone ? "Loan Off." : "Loan Officer"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* APPLY */}
          <Text style={styles.applyText}>
            Not a member yet?{" "}
            <Text style={styles.linkGreen}>Apply for Membership</Text>
          </Text>

          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
        </BlurView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c3faa",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: isTablet ? 40 : isSmallPhone ? 12 : 20,
    paddingVertical: isTablet ? 30 : 20,
  },

  header: {
    alignItems: "center",
    marginBottom: isTablet ? 40 : 20,
  },
  brand: {
    textAlign: "center",
    fontSize: isTablet ? 36 : isSmallPhone ? 22 : 28,
    fontWeight: "700",
    color: "#fff",
    marginTop: 12,
    lineHeight: isTablet ? 44 : isSmallPhone ? 28 : 34,
  },
  tag: {
    color: "#dff7ec",
    marginTop: isSmallPhone ? 6 : 8,
    fontSize: isSmallPhone ? 12 : 14,
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: isTablet ? 24 : 20,
    padding: isTablet ? 40 : isSmallPhone ? 16 : 20,
  },
  cardTablet: {
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
  },

  cardTitle: {
    fontSize: isTablet ? 28 : isSmallPhone ? 18 : 22,
    fontWeight: "700",
    marginBottom: isTablet ? 25 : isSmallPhone ? 12 : 15,
    textAlign: "center",
    color: "#1f2937",
  },

  label: {
    marginTop: isSmallPhone ? 8 : 10,
    marginBottom: isSmallPhone ? 4 : 5,
    fontWeight: "600",
    fontSize: isSmallPhone ? 12 : 14,
    color: "#374151",
  },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    borderRadius: isTablet ? 14 : 12,
    paddingHorizontal: isSmallPhone ? 10 : 12,
    marginBottom: isSmallPhone ? 8 : 10,
    height: isSmallPhone ? 44 : isTablet ? 52 : 48,
  },
  input: {
    flex: 1,
    paddingHorizontal: isSmallPhone ? 8 : 12,
    fontSize: isSmallPhone ? 13 : 14,
    color: "#1f2937",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: isSmallPhone ? 8 : 10,
    flexWrap: "wrap",
  },

  remember: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: isSmallPhone ? 14 : 16,
    height: isSmallPhone ? 14 : 16,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 2,
  },
  checked: {
    backgroundColor: "#1c3faa",
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: isSmallPhone ? 12 : 13,
    color: "#374151",
  },

  loginBtn: {
    backgroundColor: "#1c3faa",
    padding: isSmallPhone ? 12 : isTablet ? 16 : 14,
    borderRadius: isTablet ? 14 : 12,
    alignItems: "center",
    marginTop: isSmallPhone ? 8 : 10,
    height: isSmallPhone ? 44 : isTablet ? 52 : 48,
    justifyContent: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: isSmallPhone ? 14 : isTablet ? 16 : 15,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: isSmallPhone ? 12 : 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerTextWrapper: {
    marginHorizontal: 10,
  },
  dividerText: {
    fontSize: isSmallPhone ? 12 : 13,
    color: "#6b7280",
    fontWeight: "600",
  },

  ssoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ea4335",
    padding: isSmallPhone ? 12 : isTablet ? 16 : 14,
    borderRadius: isTablet ? 14 : 12,
    justifyContent: "center",
    marginBottom: isSmallPhone ? 12 : 10,
    height: isSmallPhone ? 44 : isTablet ? 52 : 48,
  },
  ssoButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: isSmallPhone ? 13 : isTablet ? 16 : 15,
    marginLeft: 8,
  },

  roleContainer: {
    marginVertical: isSmallPhone ? 12 : 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingTop: isSmallPhone ? 12 : 15,
  },
  roleLabel: {
    fontSize: isSmallPhone ? 11 : 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: isSmallPhone ? 8 : 10,
    textAlign: "center",
  },
  roleButtonsRow: {
    flexDirection: "row",
    gap: isSmallPhone ? 6 : 8,
  },
  roleButtonsColumn: {
    flexDirection: "column",
    gap: 8,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: isSmallPhone ? 8 : 10,
    paddingHorizontal: isSmallPhone ? 6 : 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#1c3faa",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    minHeight: isSmallPhone ? 40 : 44,
  },
  roleActive: {
    backgroundColor: "#1c3faa",
  },
  roleBtnText: {
    fontSize: isSmallPhone ? 10 : 11,
    fontWeight: "600",
    color: "#1c3faa",
  },
  roleBtnTextActive: {
    color: "#fff",
  },

  applyText: {
    textAlign: "center",
    marginTop: isSmallPhone ? 12 : 15,
    fontSize: isSmallPhone ? 12 : 13,
    color: "#6b7280",
  },

  linkGreen: {
    color: "#1c3faa",
    fontWeight: "600",
  },

  errorText: {
    color: "#ef4444",
    marginTop: 12,
    textAlign: "center",
    fontSize: isSmallPhone ? 12 : 13,
  },
});
