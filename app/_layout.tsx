import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

function RootNavigator() {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (session?.token) {
      // Active session exists — skip login, go straight to PIN
      router.replace("/pin");
    } else {
      // No session — show login
      router.replace("/");
    }
  }, [isLoading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="pin" />
      <Stack.Screen name="setuppin" />
      <Stack.Screen name="member" />
      <Stack.Screen name="account-officer" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}