import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: string;
  color: string;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Loan Application Approved",
    message: "Your loan application has been approved. Amount: 10,000",
    timestamp: "2 hours ago",
    read: false,
    icon: "checkmark-circle",
    color: "#22c55e",
  },
  {
    id: "2",
    title: "Payment Received",
    message: "Payment of 50,000 has been received from John Doe",
    timestamp: "5 hours ago",
    read: false,
    icon: "download",
    color: "#10b981",
  },
  // {
  //   id: "3",
  //   title: "Loan Disbursed",
  //   message: "Loan of 30,000 has been disbursed to your account",
  //   timestamp: "1 day ago",
  //   read: true,
  //   icon: "cash",
  //   color: "#f59e0b",
  // },
  {
    id: "4",
    title: "Account Update",
    message: "Your profile has been updated successfully",
    timestamp: "2 days ago",
    read: true,
    icon: "person",
    color: "#8b5cf6",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !item.read && styles.notificationCardUnread,
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: item.color + "20" }]}
      >
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>

      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.timestamp}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteNotification(item.id)}
      >
        <Ionicons name="close" size={18} color="#9ca3af" />
      </TouchableOpacity>

      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadBadge}>
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </Text>
          )}
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.badgeText}>{notifications.length}</Text>
        </View>
      </View>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons
            name="notifications-off-outline"
            size={64}
            color="#cbd5e1"
          />
          <Text style={styles.emptyText}>No notifications</Text>
          <Text style={styles.emptySubtext}>
            Youre all caught up! Check back later.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f7",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2563eb",
  },
  unreadBadge: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: 4,
    fontWeight: "600",
  },
  headerBadge: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: "#2563eb",
    fontWeight: "700",
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  notificationCardUnread: {
    backgroundColor: "#f0f7ff",
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 6,
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
  deleteBtn: {
    padding: 4,
    marginLeft: 8,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563eb",
    position: "absolute",
    top: 12,
    right: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
    textAlign: "center",
  },
});
