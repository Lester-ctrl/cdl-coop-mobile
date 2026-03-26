import { fetchNotifications } from "@/api/notification"; // ✏️ same path as your notifications screen
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useAuth();
  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    if (!isLoading && (!session || session.role_name !== "Account Officer")) {
      router.replace("../");
    }
  }, [session, isLoading]);

  // Fetch notifications to determine if badge should show
  useEffect(() => {
    const profileId = session?.profile?.profile_id;
    if (!profileId) return;

    const checkNotifications = async () => {
      try {
        const data = await fetchNotifications(profileId);
        setHasNotifications((data.notifications ?? []).length > 0);
      } catch {
        // Silently fail — badge just won't show
      }
    };

    checkNotifications();
  }, [session?.profile?.profile_id]);

  if (isLoading || !session) return null;

  const activeColor = "#3A8E0D";
  const inactiveColor = "#9ca3af";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: "#ffffffe3",
          borderTopWidth: 1,
          borderTopColor: "#f1f5f9",
          borderRadius: 15,
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 28 : 12,
          paddingTop: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      {/* ── Visible Tabs ── */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Accounts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="product/products-services"
        options={{
          title: "products",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/settings"
        options={{
          title: "settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size ?? 24} color={color} />
          ),
        }}
      />

      {/* ── Hidden Screens ── */}
      <Tabs.Screen name="members" options={{ href: null }} />
      <Tabs.Screen name="payments-collections" options={{ href: null }} />
      <Tabs.Screen name="news-events-promos" options={{ href: null }} />
      <Tabs.Screen name="reports-statement" options={{ href: null }} />
      <Tabs.Screen name="loan-management" options={{ href: null }} />
      <Tabs.Screen name="profile/editprofile" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    borderWidth: 1.5,
    borderColor: "#ffffff",
  },
});
