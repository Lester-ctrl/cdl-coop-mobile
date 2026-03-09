import { HapticTab } from "@/components/haptic-tab";
import MemberNavbar from "@/components/navigations/memberNavbar";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs, router } from "expo-router";
import React, { useEffect } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!session || session.role_name !== 'Member')) {
      router.replace('/auth/login');
    }
  }, [session, isLoading]);

  if (isLoading || !session) return null;

  return (
    <>
      <MemberNavbar />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="transaction"
          options={{
            title: "Transactions",
            tabBarIcon: ({ color }) => (
              <Octicons name="credit-card" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}