import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar, StyleSheet, Text } from "react-native";
import "react/compiler-runtime";

export default function LoanOfficerLayout() {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"light-content"}
      />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: "#3498db",
          tabBarInactiveTintColor: "#A0A0A0",
        }}
      >
        {/* ✅ Visible Tabs */}
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
                Home
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home-outline"
                color={focused ? "#3498db" : "#A0A0A0"}
                size={24}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="loan-management/applications"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
                Applications
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="document-text-outline"
                color={focused ? "#3498db" : "#A0A0A0"}
                size={24}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings/setting"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
                Settings
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="settings-outline"
                color={focused ? "#3498db" : "#A0A0A0"}
                size={24}
              />
            ),
          }}
        />

        {/*  Hidden Tabs */}
        <Tabs.Screen
          name="loan-management/active-loans"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="loan-management/partial-payments"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="productandservices/loan-products"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="productandservices/savings-products"
          options={{ href: null }}
        />
        <Tabs.Screen name="profiles/profile" options={{ href: null }} />
        <Tabs.Screen name="profiles/editprofile" options={{ href: null }} />
        <Tabs.Screen name="newsandevents" options={{ href: null }} />
        <Tabs.Screen name="paymentsandcollections" options={{ href: null }} />
        <Tabs.Screen name="reportandstatements" options={{ href: null }} />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#A0A0A0",
    marginTop: 4,
  },
  tabLabelActive: {
    color: "#3498db",
    fontWeight: "600",
  },
});
