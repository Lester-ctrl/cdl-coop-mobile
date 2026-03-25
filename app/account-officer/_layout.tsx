import AccountOfficerNavbar from "@/components/navbar/account-officer";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountOfficerLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <Slot />
      <AccountOfficerNavbar />
    </SafeAreaView>
  );
}
