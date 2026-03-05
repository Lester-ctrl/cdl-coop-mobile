import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="member" />
      <Stack.Screen name="account-officer" />
      <Stack.Screen name="loan-officer" />
    </Stack>
  );
}
