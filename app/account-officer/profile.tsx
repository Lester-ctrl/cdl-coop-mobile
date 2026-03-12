import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const officer = {
    name: "Juan Dela Cruz",
    position: "Account Officer",
    email: "juan@email.com",
    phone: "09123456789",
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{officer.name}</Text>
        <Text style={styles.position}>{officer.position}</Text>
      </View>

      {/* Info Section */}
      <View style={styles.infoBox}>
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={20} color="#1c3faa" />
          <Text style={styles.infoText}>{officer.email}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="call-outline" size={20} color="#1c3faa" />
          <Text style={styles.infoText}>{officer.phone}</Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.editBtn}>
        <Ionicons name="create-outline" size={20} color="#fff" />
        <Text style={styles.btnText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 20,
  },

  profileSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
  },

  position: {
    fontSize: 16,
    color: "#64748b",
  },

  infoBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },

  editBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c3faa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
