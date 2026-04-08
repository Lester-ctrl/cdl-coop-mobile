import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────

interface LoanApplication {
  loan_application_id: string;
  status: string;
  collateral_status?: string;
  amount_requested?: number;
  term_months?: number;
  approved_at?: string | null;
  penalty_rule_id?: number | null;
  member?: {
    profile?: {
      first_name?: string;
      last_name?: string;
    };
  };
  loanAccount?: {
    loan_account_id?: string;
    balance?: number;
    principal_amount?: number;
    status?: string;
    is_overdue?: boolean;
  } | null;
}

interface PenaltyRule {
  id: number;
  name: string;
}

// ─── Custom Icons ────────────────────────────────────────────────────────────

function VerticalEllipsis({
  size = 20,
  color = "#64748b",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: color,
          marginVertical: 2,
        }}
      />
      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: color,
          marginVertical: 2,
        }}
      />
      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: color,
          marginVertical: 2,
        }}
      />
    </View>
  );
}

function ChevronRight({
  size = 16,
  color = "#cbd5e1",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 8,
          height: 2,
          backgroundColor: color,
          transform: [{ rotate: "45deg" }],
          position: "absolute",
          right: 2,
        }}
      />
      <View
        style={{
          width: 8,
          height: 2,
          backgroundColor: color,
          transform: [{ rotate: "-45deg" }],
          position: "absolute",
          right: 2,
          top: "auto",
        }}
      />
    </View>
  );
}

function CloseIcon({
  size = 20,
  color = "#64748b",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 12,
          height: 2,
          backgroundColor: color,
          transform: [{ rotate: "45deg" }],
          position: "absolute",
        }}
      />
      <View
        style={{
          width: 12,
          height: 2,
          backgroundColor: color,
          transform: [{ rotate: "-45deg" }],
          position: "absolute",
        }}
      />
    </View>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getMemberName = (loan: LoanApplication): string => {
  const { first_name, last_name } = loan.member?.profile ?? {};
  return first_name && last_name
    ? `${first_name} ${last_name}`
    : "Unknown Member";
};

const getBalance = (loan: LoanApplication): number =>
  loan.loanAccount?.balance ?? loan.amount_requested ?? 0;

const fmt = (n: number) =>
  n.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Pending: { bg: "#fef9c3", text: "#713f12" },
  "Under Review": { bg: "#dbeafe", text: "#1e3a8a" },
  Approved: { bg: "#dcfce7", text: "#14532d" },
  Rejected: { bg: "#fee2e2", text: "#7f1d1d" },
  Cancelled: { bg: "#f1f5f9", text: "#475569" },
};

// ─── API calls ────────────────────────────────────────────────────────────────

const api = async (
  method: string,
  path: string,
  body?: Record<string, unknown>,
): Promise<{ ok: boolean; data?: unknown; message?: string }> => {
  try {
    const res = await fetch(`${BASE_URL}/api${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok)
      return { ok: false, message: data?.message ?? "Request failed" };
    return { ok: true, data };
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : "Network error",
    };
  }
};

// ─── Action Menu ─────────────────────────────────────────────────────────────

interface ActionMenuProps {
  loan: LoanApplication;
  visible: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

function ActionMenu({ loan, visible, onClose, onRefresh }: ActionMenuProps) {
  const slideAnim = useRef(new Animated.Value(400)).current;
  const [subModal, setSubModal] = useState<
    | null
    | "reloan"
    | "reject"
    | "setPenalty"
    | "releaseConfirm"
    | "approveConfirm"
    | "cancelConfirm"
    | "underReviewConfirm"
    | "approveCollateralConfirm"
    | "requestCorrectionConfirm"
  >(null);

  // sub-form states
  const [reloanAmount, setReloanAmount] = useState("");
  const [reloanTerm, setReloanTerm] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [penaltyRules, setPenaltyRules] = useState<PenaltyRule[]>([]);
  const [selectedPenalty, setSelectedPenalty] = useState<number | null>(
    loan.penalty_rule_id ?? null,
  );
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 12,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const close = () => {
    setSubModal(null);
    onClose();
  };

  const act = async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };

  const doAction = async (
    method: string,
    path: string,
    body?: Record<string, unknown>,
    successMsg = "Done",
  ) => {
    const res = await api(method, path, body);
    if (res.ok) {
      Alert.alert("Success", successMsg);
      close();
      onRefresh();
    } else {
      Alert.alert("Error", res.message ?? "Something went wrong");
    }
  };

  // ── Visibility guards ──────────────────────────────────────────────────

  const id = loan.loan_application_id;
  const status = loan.status;
  const amount = parseFloat(String(loan.amount_requested ?? 0));
  const hasAccount = !!loan.loanAccount;
  const accountActive = loan.loanAccount?.status === "Active";
  const collStatus = loan.collateral_status;
  const pendingCoal = amount > 15000 && collStatus === "Pending Verification";

  const showReleaseNow = status === "Approved" && !hasAccount;
  const showReloan = hasAccount && accountActive;
  const showApproveCollateral = pendingCoal;
  const showRequestCorrection = pendingCoal;
  const showSetPenalty = ["Pending", "Under Review", "Approved"].includes(
    status,
  );
  const showUnderReview = status === "Pending";
  const showApprove = ["Pending", "Under Review"].includes(status);
  const showReject = ["Pending", "Under Review"].includes(status);
  const showCancel = ["Pending", "Under Review"].includes(status);

  // fetch penalty rules when needed
  const openSetPenalty = async () => {
    const res = await api("GET", "/penalty-rules?status=active");
    if (res.ok && Array.isArray((res.data as any)?.data)) {
      setPenaltyRules((res.data as any).data);
    }
    setSubModal("setPenalty");
  };

  // ── Action items list ─────────────────────────────────────────────────────

  const actions = [
    {
      label: "Release Now",
      color: "#059669",
      show: showReleaseNow,
      onPress: () => setSubModal("releaseConfirm"),
    },
    {
      label: "Reloan",
      color: "#d97706",
      show: showReloan,
      onPress: () => setSubModal("reloan"),
    },
    {
      label: "Approve Collateral",
      color: "#059669",
      show: showApproveCollateral,
      onPress: () => setSubModal("approveCollateralConfirm"),
    },
    {
      label: "Request Correction",
      color: "#dc2626",
      show: showRequestCorrection,
      onPress: () => setSubModal("requestCorrectionConfirm"),
    },
    {
      label: "Set Penalty Rule",
      color: "#d97706",
      show: showSetPenalty,
      onPress: openSetPenalty,
    },
    {
      label: "Mark Under Review",
      color: "#2563eb",
      show: showUnderReview,
      onPress: () => setSubModal("underReviewConfirm"),
    },
    {
      label: "Download Loan Form",
      color: "#059669",
      show: true,
      onPress: async () => {
        const res = await api("GET", `/loan-applications/${id}/download-form`);
        if (res.ok) {
          const url = (res.data as any)?.pdf_url;
          Alert.alert("PDF Ready", url ?? "URL not available");
        } else {
          Alert.alert("Error", res.message);
        }
      },
    },
    {
      label: "Approve",
      color: "#059669",
      show: showApprove,
      onPress: () => setSubModal("approveConfirm"),
    },
    {
      label: "Reject",
      color: "#dc2626",
      show: showReject,
      onPress: () => setSubModal("reject"),
    },
    {
      label: "Cancel",
      color: "#64748b",
      show: showCancel,
      onPress: () => setSubModal("cancelConfirm"),
    },
  ].filter((a) => a.show);

  // ── Sub-modals ─────────────────────────────────────────────────────────────

  const renderSubModal = () => {
    if (!subModal) return null;

    // ── Release confirm ──────────────────────────────────────────────────────
    if (subModal === "releaseConfirm") {
      const releaseDate = new Date().toLocaleDateString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const maturity = new Date();
      maturity.setMonth(maturity.getMonth() + (loan.term_months ?? 0));
      const maturityDate = maturity.toLocaleDateString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return (
        <SubModal title="Release Now" onClose={() => setSubModal(null)}>
          <Text style={sub.body}>Set release date to:</Text>
          <Text style={sub.highlight}>{releaseDate}</Text>
          <Text style={[sub.body, { marginTop: 8 }]}>Maturity date:</Text>
          <Text style={sub.highlight}>{maturityDate}</Text>
          <ConfirmRow
            busy={busy}
            onCancel={() => setSubModal(null)}
            onConfirm={() =>
              act(() =>
                doAction(
                  "POST",
                  `/loan-applications/${id}/release`,
                  undefined,
                  "Loan account created and released successfully.",
                ),
              )
            }
          />
        </SubModal>
      );
    }

    // ── Reloan form ──────────────────────────────────────────────────────────
    if (subModal === "reloan") {
      const acct = loan.loanAccount;
      const paid = (acct?.principal_amount ?? 0) - (acct?.balance ?? 0);
      const required = (acct?.principal_amount ?? 0) * 0.5;

      return (
        <SubModal title="Reloan Application" onClose={() => setSubModal(null)}>
          <View style={sub.infoBox}>
            <Text style={sub.infoLine}>
              Paid: <Text style={sub.infoVal}>₱{fmt(paid)}</Text>
            </Text>
            <Text style={sub.infoLine}>
              Required (50%): <Text style={sub.infoVal}>₱{fmt(required)}</Text>
            </Text>
            <Text style={sub.infoLine}>
              Remaining balance:{" "}
              <Text style={sub.infoVal}>₱{fmt(acct?.balance ?? 0)}</Text>
            </Text>
          </View>
          <Text style={sub.label}>Loan Amount (₱)</Text>
          <TextInput
            style={sub.input}
            keyboardType="numeric"
            placeholder="Enter amount"
            value={reloanAmount}
            onChangeText={setReloanAmount}
          />
          <Text style={sub.label}>Term (Months)</Text>
          <TextInput
            style={sub.input}
            keyboardType="numeric"
            placeholder="Enter term"
            value={reloanTerm}
            onChangeText={setReloanTerm}
          />
          <ConfirmRow
            busy={busy}
            label="Submit Reloan"
            onCancel={() => setSubModal(null)}
            onConfirm={() => {
              if (!reloanAmount || !reloanTerm) {
                Alert.alert("Validation", "Please fill in all fields.");
                return;
              }
              act(() =>
                doAction(
                  "POST",
                  `/loan-applications/${id}/reloan`,
                  {
                    amount_requested: parseFloat(reloanAmount),
                    term_months: parseInt(reloanTerm),
                  },
                  "Reloan released successfully.",
                ),
              );
            }}
          />
        </SubModal>
      );
    }

    // ── Approve Collateral confirm ────────────────────────────────────────────
    if (subModal === "approveCollateralConfirm") {
      return (
        <SubModal title="Approve Collateral" onClose={() => setSubModal(null)}>
          <Text style={sub.body}>
            Approve the collateral for loan application{" "}
            <Text style={sub.bold}>#{id}</Text>?
          </Text>
          <ConfirmRow
            busy={busy}
            label="Approve"
            confirmColor="#059669"
            onCancel={() => setSubModal(null)}
            onConfirm={() =>
              act(() =>
                doAction(
                  "POST",
                  `/loan-applications/${id}/approve-collateral`,
                  undefined,
                  "Collateral approved.",
                ),
              )
            }
          />
        </SubModal>
      );
    }

    // ── Request Correction confirm ────────────────────────────────────────────
    if (subModal === "requestCorrectionConfirm") {
      return (
        <SubModal title="Request Correction" onClose={() => setSubModal(null)}>
          <Text style={sub.body}>
            Mark the collateral for loan <Text style={sub.bold}>#{id}</Text> as
            requiring correction?
          </Text>
          <ConfirmRow
            busy={busy}
            label="Confirm"
            confirmColor="#dc2626"
            onCancel={() => setSubModal(null)}
            onConfirm={() =>
              act(() =>
                doAction(
                  "POST",
                  `/loan-applications/${id}/request-correction`,
                  undefined,
                  "Collateral marked for correction.",
                ),
              )
            }
          />
        </SubModal>
      );
    }

    // ── Set Penalty Rule ─────────────────────────────────────────────────────
    if (subModal === "setPenalty") {
      return (
        <SubModal title="Set Penalty Rule" onClose={() => setSubModal(null)}>
          {penaltyRules.length === 0 ? (
            <Text style={sub.body}>No active penalty rules found.</Text>
          ) : (
            penaltyRules.map((rule) => (
              <TouchableOpacity
                key={rule.id}
                style={[
                  sub.ruleRow,
                  selectedPenalty === rule.id && sub.ruleRowSelected,
                ]}
                onPress={() => setSelectedPenalty(rule.id)}
              >
                <View
                  style={[
                    sub.radio,
                    selectedPenalty === rule.id && sub.radioSelected,
                  ]}
                />
                <Text style={sub.ruleLabel}>{rule.name}</Text>
              </TouchableOpacity>
            ))
          )}
          <ConfirmRow
            busy={busy}
            label="Save"
            onCancel={() => setSubModal(null)}
            onConfirm={() => {
              if (!selectedPenalty) {
                Alert.alert("Validation", "Please select a penalty rule.");
                return;
              }
              act(() =>
                doAction(
                  "POST",
                  `/loan-applications/${id}/set-penalty-rule`,
                  { penalty_rule_id: selectedPenalty },
                  "Penalty rule updated.",
                ),
              );
            }}
          />
        </SubModal>
      );
    }

    // ── Mark Under Review confirm ─────────────────────────────────────────────
    if (subModal === "underReviewConfirm") {
      return (
        <SubModal title="Mark Under Review" onClose={() => setSubModal(null)}>
          <Text style={sub.body}>
            Move loan application <Text style={sub.bold}>#{id}</Text> to Under
            Review?
          </Text>
          <ConfirmRow
            busy={busy}
            label="Confirm"
            confirmColor="#2563eb"
            onCancel={() => setSubModal(null)}
            onConfirm={() =>
              act(() =>
                doAction(
                  "POST",
                  `/loan-applications/${id}/under-review`,
                  undefined,
                  "Moved to Under Review.",
                ),
              )
            }
          />
        </SubModal>
      );
    }

    // ── Approve confirm ───────────────────────────────────────────────────────
    if (subModal === "approveConfirm") {
      return (
        <SubModal title="Approve Application" onClose={() => setSubModal(null)}>
          <Text style={sub.body}>
            Approve loan application <Text style={sub.bold}>#{id}</Text>?
          </Text>
          <ConfirmRow
            busy={busy}
            label="Approve"
            confirmColor="#059669"
            onCancel={() => setSubModal(null)}
            onConfirm={() =>
              act(() =>
                doAction(
                  "POST",
                  `/loan-applications/${id}/approve`,
                  undefined,
                  "Application approved.",
                ),
              )
            }
          />
        </SubModal>
      );
    }

    // ── Reject form ───────────────────────────────────────────────────────────
    if (subModal === "reject") {
      return (
        <SubModal title="Reject Application" onClose={() => setSubModal(null)}>
          <Text style={sub.label}>Reason (required)</Text>
          <TextInput
            style={[sub.input, { height: 90, textAlignVertical: "top" }]}
            multiline
            placeholder="Enter rejection reason..."
            value={rejectReason}
            onChangeText={setRejectReason}
          />
          <ConfirmRow
            busy={busy}
            label="Reject"
            confirmColor="#dc2626"
            onCancel={() => setSubModal(null)}
            onConfirm={() => {
              if (!rejectReason.trim()) {
                Alert.alert("Validation", "Please enter a reason.");
                return;
              }
              act(() =>
                doAction(
                  "POST",
                  `/loan-applications/${id}/reject`,
                  { reason: rejectReason },
                  "Application rejected.",
                ),
              );
            }}
          />
        </SubModal>
      );
    }

    // ── Cancel confirm ────────────────────────────────────────────────────────
    if (subModal === "cancelConfirm") {
      return (
        <SubModal title="Cancel Application" onClose={() => setSubModal(null)}>
          <Text style={sub.body}>
            Cancel loan application <Text style={sub.bold}>#{id}</Text>? This
            cannot be undone.
          </Text>
          <ConfirmRow
            busy={busy}
            label="Cancel Application"
            confirmColor="#64748b"
            onCancel={() => setSubModal(null)}
            onConfirm={() =>
              act(() =>
                doAction(
                  "POST",
                  `/loan-applications/${id}/cancel`,
                  undefined,
                  "Application cancelled.",
                ),
              )
            }
          />
        </SubModal>
      );
    }

    return null;
  };

  // ── Bottom sheet ─────────────────────────────────────────────────────────

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={close}
    >
      <Pressable style={styles.overlay} onPress={close} />
      <Animated.View
        style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
      >
        {/* drag handle */}
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>{getMemberName(loan)}</Text>
        <Text style={styles.sheetSubtitle}>#{loan.loan_application_id}</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: SCREEN_HEIGHT * 0.55 }}
        >
          {actions.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.actionRow}
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.actionDot,
                  { backgroundColor: action.color + "18" },
                ]}
              >
                <View
                  style={[
                    styles.actionDotInner,
                    { backgroundColor: action.color },
                  ]}
                />
              </View>
              <Text style={[styles.actionLabel, { color: action.color }]}>
                {action.label}
              </Text>
              <ChevronRight size={16} color="#cbd5e1" />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.closeBtn} onPress={close}>
          <Text style={styles.closeBtnText}>Close</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Sub-modal overlay */}
      {subModal && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={StyleSheet.absoluteFill}
          pointerEvents="box-none"
        >
          <View style={styles.subOverlay}>{renderSubModal()}</View>
        </KeyboardAvoidingView>
      )}
    </Modal>
  );
}

// ─── Reusable sub-components ─────────────────────────────────────────────────

function SubModal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={sub.container}>
      <View style={sub.header}>
        <Text style={sub.title}>{title}</Text>
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <CloseIcon size={20} color="#64748b" />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}

function ConfirmRow({
  busy,
  label = "Confirm",
  confirmColor = "#059669",
  onCancel,
  onConfirm,
}: {
  busy: boolean;
  label?: string;
  confirmColor?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <View style={sub.btnRow}>
      <TouchableOpacity
        style={sub.cancelBtn}
        onPress={onCancel}
        disabled={busy}
      >
        <Text style={sub.cancelText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[sub.confirmBtn, { backgroundColor: confirmColor }]}
        onPress={onConfirm}
        disabled={busy}
      >
        {busy ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={sub.confirmText}>{label}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function Loans() {
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [loans, setLoans] = useState<LoanApplication[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [activeMenu, setActiveMenu] = useState<LoanApplication | null>(null);

  const fetchLoans = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/api/loan-applications?per_page=50`);
      if (!res.ok) throw new Error("Failed to fetch loan applications");
      const data = await res.json();
      const loansData = data.data || [];
      setLoans(loansData);
      setFilteredLoans(loansData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchLoans();
    setRefreshing(false);
  };

  useEffect(() => {
    let result = [...loans];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((l) => {
        const name =
          `${l.member?.profile?.first_name ?? ""} ${l.member?.profile?.last_name ?? ""}`.toLowerCase();
        return name.includes(q);
      });
    }
    const minVal = min ? parseFloat(min) : 0;
    const maxVal = max ? parseFloat(max) : Infinity;
    result = result.filter((l) => {
      const bal = getBalance(l);
      return bal >= minVal && bal <= maxVal;
    });
    setFilteredLoans(result);
  }, [search, min, max, loans]);

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <LinearGradient
          colors={["#065f46", "#10b981", "#6ee7b7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Loan Applications</Text>
          <Text style={styles.headerSubtitle}>
            Search and manage member loan applications
          </Text>
        </LinearGradient>

        <View style={styles.filterCard}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search member name..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#94a3b8"
          />
          <View style={styles.rangeRow}>
            <TextInput
              style={styles.rangeInput}
              placeholder="Min ₱"
              keyboardType="numeric"
              value={min}
              onChangeText={setMin}
              placeholderTextColor="#94a3b8"
            />
            <TextInput
              style={[styles.rangeInput, { marginRight: 0 }]}
              placeholder="Max ₱"
              keyboardType="numeric"
              value={max}
              onChangeText={setMax}
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        <View style={styles.loanList}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#059669"
              style={{ marginTop: 40 }}
            />
          ) : error ? (
            <Text style={[styles.noResult, styles.errorText]}>{error}</Text>
          ) : filteredLoans.length === 0 ? (
            <Text style={styles.noResult}>No loan applications found</Text>
          ) : (
            filteredLoans.map((loan) => {
              const sc = STATUS_COLORS[loan.status] ?? STATUS_COLORS.Pending;
              return (
                <View key={loan.loan_application_id} style={styles.loanCard}>
                  {/* header row */}
                  <View style={styles.loanHeader}>
                    <Text style={styles.memberName} numberOfLines={1}>
                      {getMemberName(loan)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setActiveMenu(loan)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      style={styles.menuBtn}
                    >
                      <VerticalEllipsis size={20} color="#64748b" />
                    </TouchableOpacity>
                  </View>

                  {/* ID row */}
                  <Text style={styles.loanId}>#{loan.loan_application_id}</Text>

                  {/* amount + balance */}
                  <View style={styles.amountRow}>
                    <View style={styles.amountBox}>
                      <Text style={styles.amountLabel}>Requested</Text>
                      <Text style={styles.amountValue}>
                        ₱{fmt(loan.amount_requested ?? 0)}
                      </Text>
                    </View>
                    {loan.loanAccount && (
                      <View
                        style={[styles.amountBox, { alignItems: "flex-end" }]}
                      >
                        <Text style={styles.amountLabel}>Balance</Text>
                        <Text
                          style={[styles.amountValue, { color: "#065f46" }]}
                        >
                          ₱{fmt(loan.loanAccount.balance ?? 0)}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* status badge */}
                  <View style={styles.badgeRow}>
                    <View style={[styles.badge, { backgroundColor: sc.bg }]}>
                      <Text style={[styles.badgeText, { color: sc.text }]}>
                        {loan.status}
                      </Text>
                    </View>
                    {loan.loanAccount?.is_overdue && (
                      <View
                        style={[
                          styles.badge,
                          { backgroundColor: "#fee2e2", marginLeft: 6 },
                        ]}
                      >
                        <Text style={[styles.badgeText, { color: "#7f1d1d" }]}>
                          Overdue
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Action menu */}
      {activeMenu && (
        <ActionMenu
          loan={activeMenu}
          visible={!!activeMenu}
          onClose={() => setActiveMenu(null)}
          onRefresh={handleRefresh}
        />
      )}
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { backgroundColor: "#f4f7ff", flex: 1 },
  header: {
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: { fontSize: 26, fontWeight: "800", color: "#fff" },
  headerSubtitle: { color: "#dbeafe", marginTop: 6, fontSize: 14 },
  filterCard: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginTop: -25,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  searchInput: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  rangeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  rangeInput: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 8,
    fontSize: 14,
  },
  loanList: { paddingHorizontal: 18, marginTop: 18, paddingBottom: 30 },
  noResult: {
    textAlign: "center",
    marginTop: 40,
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 14,
  },
  errorText: { color: "#dc2626" },

  loanCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  loanHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  memberName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e293b",
    flex: 1,
    marginRight: 8,
  },
  menuBtn: { padding: 4 },
  loanId: { fontSize: 11, color: "#94a3b8", marginTop: 2, marginBottom: 8 },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  amountBox: {},
  amountLabel: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  amountValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1e293b",
    marginTop: 2,
  },
  badgeRow: { flexDirection: "row", flexWrap: "wrap" },
  badge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 11, fontWeight: "700" },

  // ── Bottom sheet ──────────────────────────────────────────────────────────
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#e2e8f0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetTitle: { fontSize: 17, fontWeight: "700", color: "#1e293b" },
  sheetSubtitle: { fontSize: 12, color: "#94a3b8", marginBottom: 16 },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f1f5f9",
  },
  actionDot: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  actionDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  actionLabel: { flex: 1, fontSize: 15, fontWeight: "600" },
  closeBtn: {
    marginTop: 16,
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },
  closeBtnText: { fontSize: 15, fontWeight: "700", color: "#64748b" },

  // ── Sub-modal overlay ─────────────────────────────────────────────────────
  subOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

const sub = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 16, fontWeight: "700", color: "#1e293b" },
  body: { fontSize: 14, color: "#475569", lineHeight: 20 },
  bold: { fontWeight: "700", color: "#1e293b" },
  highlight: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: "#059669",
    backgroundColor: "#dcfce7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#1e293b",
  },
  infoBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    gap: 4,
  },
  infoLine: { fontSize: 13, color: "#64748b" },
  infoVal: { fontWeight: "700", color: "#1e293b" },
  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: "#f8fafc",
    gap: 10,
  },
  ruleRowSelected: {
    backgroundColor: "#dcfce7",
    borderWidth: 1,
    borderColor: "#86efac",
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#cbd5e1",
  },
  radioSelected: { borderColor: "#059669", backgroundColor: "#059669" },
  ruleLabel: { fontSize: 14, color: "#1e293b", flex: 1 },
  btnRow: { flexDirection: "row", gap: 10, marginTop: 20 },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: { fontSize: 14, fontWeight: "700", color: "#64748b" },
  confirmBtn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmText: { fontSize: 14, fontWeight: "700", color: "#fff" },
});
