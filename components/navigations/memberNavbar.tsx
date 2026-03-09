import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.78;

type SubItem = {
  label: string;
  route: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

type NavItem = {
  id: number;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  route?: string;
  subItems?: SubItem[];
};

const NAV_ITEMS: NavItem[] = [
  { id: 1, label: "Home", icon: "home-outline", route: "/member/home" },
  {
    id: 2,
    label: "Products & Services",
    icon: "grid-outline",
    subItems: [
      {
        label: "Loan Products",
        route: "/member/loan-products",
        icon: "cash-outline",
      },
      {
        label: "Savings & Deposits",
        route: "/member/savings-and-deposits",
        icon: "wallet-outline",
      },
    ],
  },
  {
    id: 3,
    label: "Membership",
    icon: "card-outline",
    route: "/member/membership",
  },
  {
    id: 4,
    label: "What's New",
    icon: "newspaper-outline",
    route: "/member/whats-new",
  },
  {
    id: 5,
    label: "About Us",
    icon: "information-circle-outline",
    route: "/member/about-us",
  },
  {
    id: 6,
    label: "Contact Us",
    icon: "location-outline",
    route: "/member/contact-us",
  },
  {
    id: 7,
    label: "Loan Calculator",
    icon: "calculator-outline",
    route: "/member/loan-calculator",
  },
];

export default function MemberNavbar() {
  const { clearSession } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const pathname = usePathname();

  const activeItem =
    NAV_ITEMS.find(
      (item) =>
        item.route === pathname ||
        item.subItems?.some((sub) => sub.route === pathname),
    )?.id ?? 1;

  const activeSubRoute = pathname;

  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setIsOpen(true);
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 3,
        speed: 16,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => setIsOpen(false));
  };

  const handleSelect = (item: NavItem) => {
    if (item.subItems) {
      setExpandedId((prev) => (prev === item.id ? null : item.id));
      return;
    }
    closeMenu();
    if (item.route) router.push(item.route as any);
  };

  const handleSubSelect = (route: string) => {
    closeMenu();
    router.push(route as any);
  };

  const handleLogout = async () => {
    await clearSession();
    router.replace('/');  // back to index.tsx
  };

  return (
    <>
      {/* ── Top Navbar ── */}
      <SafeAreaView style={styles.root}>
        <View style={styles.navbar}>
          <View style={styles.logoBox}>
            <Ionicons name="business-outline" size={20} color={BLUE} />
          </View>
          <TouchableOpacity
            onPress={openMenu}
            style={styles.hamburger}
            activeOpacity={0.7}
          >
            <Ionicons name="menu-outline" size={28} color="#1C1C2E" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* ── Drawer inside Modal so it floats above all page content ── */}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
        statusBarTranslucent
      >
        {/* Dim overlay */}
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu} />
        </Animated.View>

        {/* Drawer panel */}
        <Animated.View
          style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
        >
          <SafeAreaView style={{ flex: 1 }}>
            {/* Drawer Header */}
            <View style={styles.drawerHeader}>
              <View style={styles.drawerLogoRow}>
                <View style={styles.drawerLogoBox}>
                  <Ionicons name="business-outline" size={20} color={BLUE} />
                </View>
                <Text style={styles.drawerBrand}>Community Co-op</Text>
              </View>
              <TouchableOpacity
                onPress={closeMenu}
                style={styles.closeBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={16} color={MUTED} />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Menu Items */}
            <View style={styles.menuList}>
              {NAV_ITEMS.map((item) => {
                const active = item.id === activeItem;
                const expanded = expandedId === item.id;
                const hasChildren = !!item.subItems;

                return (
                  <View key={item.id}>
                    <TouchableOpacity
                      onPress={() => handleSelect(item)}
                      style={[
                        styles.menuItem,
                        active && !hasChildren && styles.menuItemActive,
                      ]}
                      activeOpacity={0.75}
                    >
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={active && !hasChildren ? ACTIVE_TEXT : MUTED}
                        style={styles.menuIcon}
                      />
                      <Text
                        style={[
                          styles.menuLabel,
                          active && !hasChildren && styles.menuLabelActive,
                        ]}
                      >
                        {item.label}
                      </Text>
                      {hasChildren && (
                        <Ionicons
                          name={expanded ? "chevron-up" : "chevron-down"}
                          size={16}
                          color={MUTED}
                        />
                      )}
                    </TouchableOpacity>

                    {/* Sub-items dropdown */}
                    {hasChildren && expanded && (
                      <View style={styles.subList}>
                        {item.subItems!.map((sub) => {
                          const subActive = activeSubRoute === sub.route;
                          return (
                            <TouchableOpacity
                              key={sub.route}
                              onPress={() => handleSubSelect(sub.route)}
                              style={[
                                styles.subItem,
                                subActive && styles.subItemActive,
                              ]}
                              activeOpacity={0.75}
                            >
                              <View
                                style={[
                                  styles.subItemLine,
                                  subActive && styles.subItemLineActive,
                                ]}
                              />
                              <Ionicons
                                name={sub.icon}
                                size={18}
                                color={subActive ? ACTIVE_TEXT : MUTED}
                                style={styles.subIcon}
                              />
                              <Text
                                style={[
                                  styles.subLabel,
                                  subActive && styles.subLabelActive,
                                ]}
                              >
                                {sub.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            <View style={styles.drawerFooter}>
              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.75}
                onPress={handleLogout}  // ← was missing
              >
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  color={MUTED}
                  style={styles.menuIcon}
                />
                <Text style={[styles.menuLabel, styles.logoutLabel]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </Modal>
    </>
  );
}

const BLUE = "#2563C7";
const ACTIVE_BG = "#EEF3FB";
const ACTIVE_TEXT = "#2563C7";
const BG = "#F5F6FA";
const CARD = "#FFFFFF";
const BORDER = "#E8EAF0";
const TEXT = "#1C1C2E";
const MUTED = "#8890A4";

const styles = StyleSheet.create({
  root: { backgroundColor: CARD },

  /* ── Navbar ── */
  navbar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: CARD,
  },
  logoBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: ACTIVE_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  hamburger: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },

  /* ── Overlay ── */
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  /* ── Drawer ── */
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: CARD,
    shadowColor: "#000",
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 16,
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 16,
  },
  drawerLogoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  drawerLogoBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: ACTIVE_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerBrand: { fontSize: 16, fontWeight: "700", color: BLUE },
  closeBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#F0F1F5",
  },
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginHorizontal: 18,
    marginBottom: 8,
  },

  /* ── Menu ── */
  menuList: { flex: 1, paddingTop: 4 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 2,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  menuItemActive: { backgroundColor: ACTIVE_BG },
  menuIcon: { width: 30 },
  menuLabel: { fontSize: 14, fontWeight: "500", color: MUTED, flex: 1 },
  menuLabelActive: { color: ACTIVE_TEXT, fontWeight: "600" },

  /* ── Sub-items ── */
  subList: { marginLeft: 26, marginBottom: 4 },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 12,
    marginVertical: 1,
    backgroundColor: "#F5F6FA",
  },
  subItemActive: { backgroundColor: ACTIVE_BG },
  subItemLine: {
    width: 2,
    height: 18,
    borderRadius: 1,
    backgroundColor: BORDER,
    marginRight: 10,
  },
  subItemLineActive: { backgroundColor: BLUE },
  subIcon: { marginRight: 8 },
  subLabel: { fontSize: 13, fontWeight: "500", color: MUTED, flex: 1 },
  subLabelActive: { color: ACTIVE_TEXT, fontWeight: "600" },

  /* ── Footer ── */
  drawerFooter: { paddingBottom: 24 },
  logoutLabel: { color: TEXT, fontWeight: "500" },
});
