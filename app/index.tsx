import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      router.replace("./(tabs)");
    } else {
      alert("Enter email & password");
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
        resizeMode="cover"
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

        {/* APPLY */}
        <Text style={styles.applyText}>
          Not a member yet?{" "}
          <Text style={styles.linkGreen}>Apply for Membership</Text>
        </Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.5)  ",
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

  demoBtn: {
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
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
