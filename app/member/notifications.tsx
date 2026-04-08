// import { deleteNotification, fetchNotifications, markNotificationAsSeen } from "@/api/notification";
// import { useAuth } from "@/context/AuthContext";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useFocusEffect } from "expo-router";
// import { Trash2 } from "lucide-react-native";
// import React, { useCallback, useState } from "react";
// import {
//     ActivityIndicator,
//     Modal,
//     Pressable,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const GREEN = "#22C55E";
// const ITEMS_PER_PAGE = 5;

// type Notification = {
//     id: number;
//     title: string;
//     description: string;
//     created_at: string;
//     status: "seen" | "unseen";   // New field from database
// };

// export default function NotificationsScreen() {
//   const { session } = useAuth();
//   const profile = session?.profile;

//     const [notifications, setNotifications] = useState<Notification[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
//     const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
//     const [currentPage, setCurrentPage] = useState(1);

//     const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);
//     const paginatedNotifications = notifications.slice(
//         (currentPage - 1) * ITEMS_PER_PAGE,
//         currentPage * ITEMS_PER_PAGE
//     );

//     // Load notifications
//     useFocusEffect(
//         useCallback(()=>{
//             if (!profile?.profile_id) return;
//             const loadNotifications = async () => {
//                 try {
//                     setLoading(true);
//                     setError(null);
//                     const data = await fetchNotifications(profile.profile_id);
//                     setNotifications(data.notifications ?? []);
//                     setCurrentPage(1);
//                 } catch (err) {
//                     setError("Failed to load notifications.");
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             loadNotifications();
//         }, [profile?.profile_id])
//     );

//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-PH", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//     // Mark as seen and open modal
//     const handleNotificationPress = async (notif: Notification) => {
//         if (notif.status === "unseen") {
//             try {
//                 // Update backend
//                 await markNotificationAsSeen(notif.id);

//                 // Update local state
//                 setNotifications(prev =>
//                     prev.map(n =>
//                         n.id === notif.id ? { ...n, status: "seen" } : n
//                     )
//                 );
//             } catch (err) {
//                 console.log("Failed to mark notification as seen");
//             }
//         }

//         // Open modal
//         setSelectedNotification(notif);
//     };

//     const closeModal = () => {
//         setSelectedNotification(null);
//     };

//     const confirmDelete = async () => {
//         if (deleteTargetId === null) return;
//         try {
//             await deleteNotification(deleteTargetId);
//             const updated = notifications.filter((n) => n.id !== deleteTargetId);
//             setNotifications(updated);

//             const newTotalPages = Math.ceil(updated.length / ITEMS_PER_PAGE);
//             if (currentPage > newTotalPages && newTotalPages > 0) {
//                 setCurrentPage(newTotalPages);
//             }
//         } catch (err) {
//             console.log("Error deleting notification");
//         } finally {
//             setDeleteTargetId(null);
//         }
//     };

//   return (
//     <SafeAreaView
//       style={{ flex: 1, backgroundColor: "#3A8E0D" }}
//       edges={["top"]}
//     >
//       <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
//         <LinearGradient
//           colors={["#51b61a", "#48a019", "#3A8E0D"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.hero}
//         >
//           <Text style={styles.heroTitle}>Notifications</Text>
//         </LinearGradient>

//                 <View style={styles.content}>
//                     {loading ? (
//                         <ActivityIndicator size="large" color="#3A8E0D" style={styles.loader} />
//                     ) : error ? (
//                         <Text style={styles.errorText}>{error}</Text>
//                     ) : notifications.length === 0 ? (
//                         <Text style={styles.emptyText}>No notifications yet.</Text>
//                     ) : (
//                         <>
//                             {paginatedNotifications.map((item) => (
//                                 <TouchableOpacity
//                                     key={item.id}
//                                     style={[
//                                         styles.notifCard,
//                                         item.status === "unseen" && styles.unseenBorder
//                                     ]}
//                                     onPress={() => handleNotificationPress(item)}
//                                     activeOpacity={0.85}
//                                 >
//                                     <View style={styles.notifHeader}>
//                                         <Text style={styles.notifTitle}>{item.title}</Text>
//                                         <Text style={styles.notifDate}>{formatDate(item.created_at)}</Text>
//                                     </View>
//                                     <View style={styles.notifFooter}>
//                                         <Text
//                                             style={styles.notifDescription}
//                                             numberOfLines={2}
//                                         >
//                                             {item.description}
//                                         </Text>
//                                         <TouchableOpacity
//                                             onPress={(e) => {
//                                                 e.stopPropagation(); // Prevent opening modal when deleting
//                                                 setDeleteTargetId(item.id);
//                                             }}
//                                             style={styles.deleteButton}
//                                             hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
//                                         >
//                                             <Trash2 size={22} color="#ef4444" strokeWidth={2} />
//                                         </TouchableOpacity>
//                                     </View>
//                                 </TouchableOpacity>
//                             ))}

//                             {/* Pagination */}
//                             {totalPages > 1 && (
//                                 <View style={styles.pagination}>
//                                     <TouchableOpacity
//                                         style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
//                                         onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                                         disabled={currentPage === 1}
//                                     >
//                                         <Ionicons name="chevron-back" size={16} color={currentPage === 1 ? "#D1D5DB" : "#3A8E0D"} />
//                                     </TouchableOpacity>

//                                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                                         <TouchableOpacity
//                                             key={page}
//                                             style={[styles.pageButton, currentPage === page && styles.pageButtonActive]}
//                                             onPress={() => setCurrentPage(page)}
//                                         >
//                                             <Text style={[styles.pageButtonText, currentPage === page && styles.pageButtonTextActive]}>
//                                                 {page}
//                                             </Text>
//                                         </TouchableOpacity>
//                                     ))}

//                                     <TouchableOpacity
//                                         style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
//                                         onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//                                         disabled={currentPage === totalPages}
//                                     >
//                                         <Ionicons name="chevron-forward" size={16} color={currentPage === totalPages ? "#D1D5DB" : "#3A8E0D"} />
//                                     </TouchableOpacity>
//                                 </View>
//                             )}
//                         </>
//                     )}
//                 </View>
//               </View>
//             ))
//           )}
//         </View>
//       </ScrollView>

//             {/* Notification Detail Modal */}
//             <Modal
//                 visible={!!selectedNotification}
//                 transparent
//                 animationType="slide"
//                 onRequestClose={closeModal}
//             >
//                 <View style={styles.modalOverlay}>
//                     <Pressable style={styles.modalBackdrop} onPress={closeModal} />
//                     <View style={styles.detailModal}>
//                         <View style={styles.modalHandle} />

//                         {selectedNotification && (
//                             <>
//                                 <Text style={styles.detailTitle}>{selectedNotification.title}</Text>
//                                 <Text style={styles.detailDate}>
//                                     {formatDate(selectedNotification.created_at)}
//                                 </Text>
//                                 <ScrollView style={styles.detailContent}>
//                                     <Text style={styles.detailDescription}>
//                                         {selectedNotification.description}
//                                     </Text>
//                                 </ScrollView>

//                                 <TouchableOpacity
//                                     style={styles.closeDetailButton}
//                                     onPress={closeModal}
//                                 >
//                                     <Text style={styles.closeDetailButtonText}>Close</Text>
//                                 </TouchableOpacity>
//                             </>
//                         )}
//                     </View>
//                 </View>
//             </Modal>

//             {/* Delete Confirmation Modal */}
//             <Modal
//                 visible={deleteTargetId !== null}
//                 transparent
//                 animationType="fade"
//                 onRequestClose={() => setDeleteTargetId(null)}
//             >
//                 <Pressable style={styles.modalOverlay} onPress={() => setDeleteTargetId(null)}>
//                     <Pressable style={styles.modalCard} onPress={() => {}}>
//                         <View style={styles.modalIconWrapper}>
//                             <Trash2 size={28} color="#ef4444" strokeWidth={2} />
//                         </View>
//                         <Text style={styles.modalTitle}>Delete Notification</Text>
//                         <Text style={styles.modalMessage}>
//                             Are you sure you want to delete this notification? This action cannot be undone.
//                         </Text>
//                         <View style={styles.modalActions}>
//                             <TouchableOpacity
//                                 style={styles.cancelButton}
//                                 onPress={() => setDeleteTargetId(null)}
//                             >
//                                 <Text style={styles.cancelButtonText}>Cancel</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={styles.confirmButton}
//                                 onPress={confirmDelete}
//                             >
//                                 <Text style={styles.confirmButtonText}>Delete</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </Pressable>
//                 </Pressable>
//             </Modal>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     root: {
//         flex: 1,
//         backgroundColor: "#F5F6FA",
//     },
//     hero: {
//         padding: 28,
//         paddingBottom: 36,
//         borderBottomLeftRadius: 28,
//         borderBottomRightRadius: 28,
//     },
//     heroTitle: {
//         color: "#FFFFFF",
//         fontSize: 28,
//         fontFamily: "Poppins_700Bold",
//         lineHeight: 38,
//         marginBottom: 14,
//         letterSpacing: -0.3,
//         textAlign: "center",
//     },
//     content: {
//         padding: 20,
//     },
//     loader: { marginTop: 40 },
//     errorText: {
//         textAlign: "center",
//         color: "#ef4444",
//         marginTop: 40,
//         fontSize: 14,
//         fontWeight: "600",
//     },
//     emptyText: {
//         textAlign: "center",
//         color: "#94a3b8",
//         marginTop: 40,
//         fontSize: 18,
//         fontWeight: "600",
//     },

//     // Notification Card with Green Border for Unseen
//     notifCard: {
//         backgroundColor: "#ffffff",
//         borderRadius: 14,
//         padding: 16,
//         marginBottom: 12,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.05,
//         shadowRadius: 6,
//         elevation: 2,
//         borderLeftWidth: 4,
//         borderLeftColor: "transparent",
//     },
//     unseenBorder: {
//         borderLeftColor: GREEN,   // Green left border for unseen
//     },

//     notifHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 12,
//     },
//     notifTitle: {
//         fontSize: 18,
//         fontWeight: "700",
//         color: "#1e293b",
//         flex: 1,
//         marginRight: 8,
//     },
//     notifDate: {
//         fontSize: 14,
//         color: "#94a3b8",
//         fontWeight: "500",
//     },
//     notifFooter: {
//         flexDirection: "row",
//         alignItems: "flex-end",
//         justifyContent: "space-between",
//     },
//     notifDescription: {
//         fontSize: 16,
//         color: "#64748b",
//         lineHeight: 19,
//         flex: 1,
//         marginRight: 12,
//     },
//     deleteButton: {
//         padding: 4,
//     },

//     // Pagination (unchanged)
//     pagination: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: 6,
//         marginTop: 8,
//         paddingTop: 16,
//         borderTopWidth: 1,
//         borderTopColor: "#F1F5F9",
//     },
//     pageButton: {
//         width: 46,
//         height: 46,
//         borderRadius: 10,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#F1F5F9",
//     },
//     pageButtonActive: {
//         backgroundColor: "#3A8E0D",
//     },
//     pageButtonDisabled: {
//         backgroundColor: "#F8FAFC",
//     },
//     pageButtonText: {
//         fontSize: 16,
//         fontWeight: "700",
//         color: "#374151",
//     },
//     pageButtonTextActive: {
//         color: "#FFFFFF",
//     },

//     // Detail Modal
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: "rgba(0,0,0,0.45)",
//         justifyContent: "flex-end",
//     },
//     modalBackdrop: {
//         ...StyleSheet.absoluteFillObject,
//     },
//     detailModal: {
//         backgroundColor: "#FFFFFF",
//         borderTopLeftRadius: 28,
//         borderTopRightRadius: 28,
//         paddingHorizontal: 24,
//         paddingBottom: 36,
//         paddingTop: 12,
//         maxHeight: "85%",
//     },
//     modalHandle: {
//         width: 40,
//         height: 4,
//         backgroundColor: "#E2E8F0",
//         borderRadius: 2,
//         alignSelf: "center",
//         marginBottom: 20,
//     },
//     detailTitle: {
//         fontSize: 22,
//         fontWeight: "700",
//         color: "#1e293b",
//         marginBottom: 8,
//     },
//     detailDate: {
//         fontSize: 14,
//         color: "#94a3b8",
//         marginBottom: 20,
//     },
//     detailContent: {
//         maxHeight: 400,
//         marginBottom: 20,
//     },
//     detailDescription: {
//         fontSize: 16,
//         lineHeight: 24,
//         color: "#374151",
//     },
//     closeDetailButton: {
//         backgroundColor: "#3A8E0D",
//         borderRadius: 14,
//         paddingVertical: 15,
//         alignItems: "center",
//     },
//     closeDetailButtonText: {
//         color: "#FFFFFF",
//         fontSize: 16,
//         fontWeight: "600",
//     },

//     // Delete Modal (unchanged)
//     modalCard: {
//         backgroundColor: "#ffffff",
//         borderRadius: 20,
//         padding: 28,
//         width: "100%",
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 8 },
//         shadowOpacity: 0.12,
//         shadowRadius: 20,
//         elevation: 10,
//     },
//     modalIconWrapper: {
//         backgroundColor: "#fef2f2",
//         borderRadius: 50,
//         padding: 16,
//         marginBottom: 16,
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: "700",
//         color: "#1e293b",
//         marginBottom: 10,
//         textAlign: "center",
//     },
//     modalMessage: {
//         fontSize: 15,
//         color: "#64748b",
//         textAlign: "center",
//         lineHeight: 22,
//         marginBottom: 24,
//     },
//     modalActions: {
//         flexDirection: "row",
//         gap: 12,
//         width: "100%",
//     },
//     cancelButton: {
//         flex: 1,
//         paddingVertical: 13,
//         borderRadius: 12,
//         backgroundColor: "#f1f5f9",
//         alignItems: "center",
//     },
//     cancelButtonText: {
//         fontSize: 15,
//         fontWeight: "600",
//         color: "#64748b",
//     },
//     confirmButton: {
//         flex: 1,
//         paddingVertical: 13,
//         borderRadius: 12,
//         backgroundColor: "#ef4444",
//         alignItems: "center",
//     },
//     confirmButtonText: {
//         fontSize: 15,
//         fontWeight: "600",
//         color: "#ffffff",
//     },
// });
