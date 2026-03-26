// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function SimpleNavbar() {
//   const router = useRouter();

//   return (
//     <View style={styles.navbar}>
//       <TouchableOpacity onPress={() => router.push("/account-officer/home")}>
//         <Ionicons name="home-outline" size={24} color="#fff" />
//         <Text style={styles.item}>Home</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => router.push("/account-officer/accounts/accounts")}
//       >
//         <Ionicons name="card-outline" size={24} color="#fff" />
//         <Text style={styles.item}>Accounts</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() =>
//           router.push("/account-officer/product/products-services")
//         }
//       >
//         <Ionicons name="grid" size={24} color="#fff" />
//         <Text style={styles.item}>Products</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => router.push("/account-officer/settings/settings")}
//       >
//         <Ionicons name="settings" size={24} color="#fff" />
//         <Text style={styles.item}>Settings</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   navbar: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 60,
//     backgroundColor: "#107b25",
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     elevation: 12,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -4,
//     },
//     shadowOpacity: 0.35,
//     shadowRadius: 8,
//     zIndex: 1000,
//   },
//   item: {
//     fontSize: 10,
//     fontWeight: "700",
//     color: "#fff",
//     marginTop: 2,
//     textAlign: "center",
//     flex: 1,
//   },
// });
