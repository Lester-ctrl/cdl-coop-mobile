import { useAuth } from "@/context/AuthContext";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function SharedLayout() {
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/auth/login");
    }
  }, [session, isLoading]);

  if (isLoading || !session) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" />
    </Stack>
  );
}