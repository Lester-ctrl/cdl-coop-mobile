import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="member" />
        <Stack.Screen name="account-officer" />
        <Stack.Screen name="loan-officer" />
      </Stack>
    </AuthProvider>
  );
}