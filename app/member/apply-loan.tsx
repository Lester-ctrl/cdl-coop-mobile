import { SendLoanApplication } from "@/api/loan-application";
import { useAuth } from "@/context/AuthContext";
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const BLUE = "#2952CC";
const BLUE_LIGHT = "#EEF2FF";
const GREEN = "#22C55E";
const RED = "#EF4444";
const RED_LIGHT = "#FEF2F2";
const ORANGE = "#F59E0B";
const ORANGE_LIGHT = "#FFFBEB";

const COLLATERAL_THRESHOLD = 15000;

type LoanType = {
    label: string;
    value: string;
    maxInterest: number | null;
    maxTermMonths: number | null;
    maxAmount: number | null;
    hint: string;
};

const LOAN_TYPES: LoanType[] = [
    {
        label: "E-Cash Loan",
        value: "E-Cash Loan",
        maxInterest: 3,
        maxTermMonths: 24,
        maxAmount: null,
        hint: "No fixed limit · Max 3% interest · Max 2 years",
    },
    {
        label: "Guaranteed Loan",
        value: "Guaranteed Loan",
        maxInterest: 2,
        maxTermMonths: 24,
        maxAmount: null,
        hint: "Based on share capital × 2 · Max 2% interest · Max 2 years",
    },
    {
        label: "Instant/Emergency Loan",
        value: "Instant/Emergency Loan",
        maxInterest: null,
        maxTermMonths: 3,
        maxAmount: 15000,
        hint: "Max ₱15,000 · Max 3 months term",
    },
];

const COLLATERAL_TYPES = [
    { label: "Land Title", value: "Land Title" },
    { label: "Vehicle OR/CR", value: "Vehicle OR/CR" },
    { label: "Appliance", value: "Appliance" },
    { label: "Guarantor", value: "Guarantor" },
];

type ValidationHintProps = {
    message: string;
    type?: "error" | "info";
};

function ValidationHint({ message, type = "error" }: ValidationHintProps) {
    const isError = type === "error";
    return (
        <View style={[styles.hintRow, isError ? styles.hintRowError : styles.hintRowInfo]}>
            <Ionicons
                name={isError ? "alert-circle-outline" : "information-circle-outline"}
                size={14}
                color={isError ? RED : BLUE}
                style={{ marginRight: 5 }}
            />
            <Text style={[styles.hintText, isError ? styles.hintTextError : styles.hintTextInfo]}>
                {message}
            </Text>
        </View>
    );
}

export default function ApplyLoan() {
    const { session } = useAuth();
    const [amountRequested, setAmountRequested] = useState<string>("");
    const [term, setTerm] = useState<string>("");
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [selectedLoanType, setSelectedLoanType] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Collateral state
    const [selectedCollateralType, setSelectedCollateralType] = useState<string | null>(null);
    const [showCollateralDropdown, setShowCollateralDropdown] = useState<boolean>(false);
    const [collateralDocumentName, setCollateralDocumentName] = useState<string | null>(null);
    const [collateralDocumentUri, setCollateralDocumentUri] = useState<string | null>(null);

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
        Poppins_400Regular
      });
    
      if (!fontsLoaded) return null;

    const profile = session?.profile;
    const loanConfig = LOAN_TYPES.find((l) => l.value === selectedLoanType) ?? null;

    const amountNum = parseFloat(amountRequested) || 0;
    const termNum = parseInt(term);

    // Show collateral section when amount > 15,000
    const requiresCollateral = amountNum > COLLATERAL_THRESHOLD && amountRequested !== "";

    const amountError =
        loanConfig?.maxAmount && amountRequested && amountNum > loanConfig.maxAmount
            ? `Maximum loanable amount is ₱${loanConfig.maxAmount.toLocaleString()}`
            : null;

    const termError =
        loanConfig?.maxTermMonths && term && termNum > loanConfig.maxTermMonths
            ? `Maximum term is ${loanConfig.maxTermMonths} month${loanConfig.maxTermMonths > 1 ? "s" : ""}`
            : null;

    const handleSelectLoanType = (value: string) => {
        setSelectedLoanType(value);
        setShowDropdown(false);
        setAmountRequested("");
        setTerm("");
        setFieldErrors({});
        setSelectedCollateralType(null);
        setCollateralDocumentName(null);
        setCollateralDocumentUri(null);
    };

    const handleSelectCollateralType = (value: string) => {
        setSelectedCollateralType(value);
        setShowCollateralDropdown(false);
        setFieldErrors((prev) => ({ ...prev, collateralType: "" }));
    };

    const handlePickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                copyToCacheDirectory: true,
                multiple: false,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const file = result.assets[0];
                setCollateralDocumentName(file.name);
                setCollateralDocumentUri(file.uri);
                setFieldErrors((prev) => ({ ...prev, collateralDocument: "" }));
            }
        } catch (error) {
            setFieldErrors((prev) => ({
                ...prev,
                collateralDocument: "Failed to pick document. Please try again.",
            }));
        }
    };

    const resetForm = () => {
        setSelectedLoanType(null);
        setAmountRequested("");
        setTerm("");
        setFieldErrors({});
        setShowSuccess(false);
        setSelectedCollateralType(null);
        setCollateralDocumentName(null);
    };

    const validateFields = (): boolean => {
        const errors: Record<string, string> = {};
        if (!selectedLoanType) errors.loanType = "Please select a loan type.";
        if (!amountRequested.trim()) errors.amount = "Amount requested is required.";
        else if (amountError) errors.amount = amountError;
        if (!term.trim()) errors.term = "Term is required.";
        else if (termError) errors.term = termError;

        // Collateral validations
        if (requiresCollateral) {
            if (!selectedCollateralType) errors.collateralType = "Please select a collateral type.";
            if (!collateralDocumentName) errors.collateralDocument = "Please upload a collateral document.";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateFields()) return;
        setIsLoading(true);
        try {
            const payload = {
                profile_id: profile?.profile_id,
                loanType: selectedLoanType,
                loanTypeLabel: loanConfig?.label,
                amountRequested: parseFloat(amountRequested),
                termMonths: parseInt(term),
                interestRate: loanConfig?.maxInterest ?? null,
                ...(requiresCollateral && {
                    collateral: {
                        type: selectedCollateralType,
                        documentName: collateralDocumentName,
                        documentUri: collateralDocumentUri,
                    },
                }),
            };

            const result = await SendLoanApplication(payload);
            setShowSuccess(true);
        } catch (error) {
            setFieldErrors({ submit: "Submission failed. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Success Modal */}
            <Modal visible={showSuccess} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <View style={styles.modalIconWrapper}>
                            <Ionicons name="checkmark-circle" size={56} color={GREEN} />
                        </View>
                        <Text style={styles.modalTitle}>Application Submitted!</Text>
                        <Text style={styles.modalDesc}>
                            Your loan application has been received. We'll review it and get back to you shortly.
                        </Text>
                        <TouchableOpacity style={styles.modalButton} onPress={resetForm} activeOpacity={0.85}>
                            <LinearGradient
                                colors={["#1A56DB", "#3B82F6"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.modalButtonGradient}
                            >
                                <Text style={styles.modalButtonText}>Submit Another</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={["#1A56DB", "#2563C7", "#3B82F6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.hero}
                >
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Apply for Loan</Text>
                    </View>
                    <Text style={styles.heroTitle}>Loan Application</Text>
                    <Text style={styles.heroDesc}>Fill in the requirements below</Text>
                </LinearGradient>

                <View style={styles.cardsWrapper}>
                    {/* ── Loan Details Card ── */}
                    <View style={styles.card}>
                        <View style={styles.cardTopRow}>
                            <View style={styles.iconBox}>
                                <Ionicons name="document-text-outline" size={22} color={BLUE} />
                            </View>
                            <Text style={styles.cardTitle}>Loan Application Details</Text>
                        </View>

                        {/* Loan Type Dropdown */}
                        <View style={{ marginBottom: 16 }}>
                            <Text style={styles.fieldLabel}>Loan Type</Text>
                            <TouchableOpacity
                                style={[styles.dropdown, showDropdown && styles.dropdownOpen]}
                                activeOpacity={0.8}
                                onPress={() => setShowDropdown(!showDropdown)}
                            >
                                <Text style={[styles.dropdownValue, !selectedLoanType && { color: "#9CA3AF" }]}>
                                    {loanConfig?.label ?? "Select Loan Type"}
                                </Text>
                                <Ionicons
                                    name={showDropdown ? "chevron-up" : "chevron-down"}
                                    size={18}
                                    color="#6B7280"
                                />
                            </TouchableOpacity>

                            {showDropdown && (
                                <View style={styles.dropdownMenu}>
                                    {LOAN_TYPES.map((type, index) => {
                                        const isActive = selectedLoanType === type.value;
                                        return (
                                            <TouchableOpacity
                                                key={type.value}
                                                style={[
                                                    styles.dropdownItem,
                                                    isActive && styles.dropdownItemActive,
                                                    index < LOAN_TYPES.length - 1 && { borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
                                                ]}
                                                onPress={() => handleSelectLoanType(type.value)}
                                                activeOpacity={0.7}
                                            >
                                                <View style={{ flex: 1 }}>
                                                    <Text style={[styles.dropdownItemText, isActive && styles.dropdownItemTextActive]}>
                                                        {type.label}
                                                    </Text>
                                                    <Text style={styles.dropdownItemHint}>{type.hint}</Text>
                                                </View>
                                                {isActive && (
                                                    <Ionicons name="checkmark-circle" size={18} color={BLUE} />
                                                )}
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            )}

                            {loanConfig && (
                                <View style={styles.infoBanner}>
                                    <Ionicons name="information-circle-outline" size={16} color={BLUE} style={{ marginRight: 7, marginTop: 1 }} />
                                    <Text style={styles.infoBannerText}>{loanConfig.hint}</Text>
                                </View>
                            )}
                            {fieldErrors.loanType && <ValidationHint message={fieldErrors.loanType} type="error" />}
                        </View>

                        {/* Amount Requested */}
                        <Text style={styles.fieldLabel}>Amount Requested</Text>
                        <View style={[styles.inputWrapper, (amountError || fieldErrors.amount) ? styles.inputWrapperError : null]}>
                            <Ionicons
                                name="cash-outline"
                                size={20}
                                color={(amountError || fieldErrors.amount) ? RED : "#9CA3AF"}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={loanConfig?.maxAmount ? `Max ₱${loanConfig.maxAmount.toLocaleString()}` : "0.00"}
                                placeholderTextColor="#9CA3AF"
                                value={amountRequested}
                                onChangeText={(text: string) => {
                                    setAmountRequested(text.replace(/[^0-9.]/g, ""));
                                    // Reset collateral if amount drops back to or below threshold
                                    const num = parseFloat(text);
                                    if (num <= COLLATERAL_THRESHOLD) {
                                        setSelectedCollateralType(null);
                                        setCollateralDocumentName(null);
                                    }
                                }}
                                keyboardType="decimal-pad"
                                editable={!!loanConfig}
                            />
                            {loanConfig?.maxAmount && (
                                <Text style={styles.inputSuffix}>/ ₱{loanConfig.maxAmount.toLocaleString()}</Text>
                            )}
                        </View>
                        {(amountError || fieldErrors.amount) && (
                            <ValidationHint message={(amountError ?? fieldErrors.amount) as string} type="error" />
                        )}

                        {selectedLoanType === "guaranteed" && (
                            <ValidationHint
                                message="Max loanable = Share Capital × 2. Confirm your share capital with your branch."
                                type="info"
                            />
                        )}

                        {/* Term */}
                        <Text style={[styles.fieldLabel, { marginTop: 4 }]}>Term (Months)</Text>
                        <View style={[styles.inputWrapper, (termError || fieldErrors.term) ? styles.inputWrapperError : null]}>
                            <Ionicons
                                name="calendar-outline"
                                size={20}
                                color={(termError || fieldErrors.term) ? RED : "#9CA3AF"}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={
                                    loanConfig?.maxTermMonths
                                        ? `Max ${loanConfig.maxTermMonths} month${loanConfig.maxTermMonths > 1 ? "s" : ""}`
                                        : "e.g. 12"
                                }
                                placeholderTextColor="#9CA3AF"
                                value={term}
                                onChangeText={(text: string) => setTerm(text.replace(/[^0-9]/g, ""))}
                                keyboardType="number-pad"
                                editable={!!loanConfig}
                            />
                            {loanConfig?.maxTermMonths && (
                                <Text style={styles.inputSuffix}>/ {loanConfig.maxTermMonths} mo.</Text>
                            )}
                        </View>
                        {(termError || fieldErrors.term) && (
                            <ValidationHint message={(termError ?? fieldErrors.term) as string} type="error" />
                        )}

                        {/* Interest Rate */}
                        {selectedLoanType !== "emergency" && (
                            <>
                                <Text style={[styles.fieldLabel, { marginTop: 4 }]}>Interest Rate (%)</Text>
                                <View style={[styles.inputWrapper, styles.inputWrapperLocked]}>
                                    <Ionicons name="trending-up-outline" size={20} color={BLUE} style={styles.inputIcon} />
                                    <Text style={styles.lockedValue}>
                                        {loanConfig?.maxInterest != null ? `${loanConfig.maxInterest}%` : "—"}
                                    </Text>
                                    <View style={styles.lockedBadge}>
                                        <Ionicons name="lock-closed" size={11} color={BLUE} />
                                        <Text style={styles.lockedBadgeText}>Fixed</Text>
                                    </View>
                                </View>
                            </>
                        )}

                        {/* Submit API error */}
                        {fieldErrors.submit && <ValidationHint message={fieldErrors.submit} type="error" />}

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                            activeOpacity={0.85}
                            disabled={isLoading}
                            onPress={handleSubmit}
                        >
                            <LinearGradient
                                colors={isLoading ? ["#D1D5DB", "#D1D5DB"] : ["#1A56DB", "#3B82F6"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.submitGradient}
                            >
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
                                ) : (
                                    <Ionicons name="paper-plane-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
                                )}
                                <Text style={styles.submitText}>
                                    {isLoading ? "Submitting..." : "Submit Application"}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* ── Collateral Card (shown only when amount > ₱15,000) ── */}
                    {requiresCollateral && (
                        <View style={[styles.card, styles.collateralCard]}>
                            {/* Card Header */}
                            <View style={styles.cardTopRow}>
                                <View style={[styles.iconBox, styles.collateralIconBox]}>
                                    <Ionicons name="shield-checkmark-outline" size={22} color={ORANGE} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.cardTitle}>Loan Collateral</Text>
                                    <Text style={styles.collateralSubtitle}>
                                        Collateral verification (Required only for loans above ₱15,000)
                                    </Text>
                                </View>
                            </View>

                            {/* Collateral Warning Banner */}
                            <View style={styles.collateralWarningBanner}>
                                <View style={styles.collateralWarningHeader}>
                                    <Ionicons name="warning-outline" size={16} color={ORANGE} style={{ marginRight: 6 }} />
                                    <Text style={styles.collateralWarningTitle}>Collateral warning</Text>
                                </View>
                                <Text style={styles.collateralWarningText}>
                                    ⚠️ Collateral is <Text style={{ fontFamily: "Poppins_700Bold" }}>REQUIRED</Text> for loan amounts above ₱15,000. Please upload supporting documents.
                                </Text>
                            </View>

                            {/* Collateral Type Dropdown */}
                            <View style={{ marginBottom: 16 }}>
                                <Text style={styles.fieldLabel}>
                                    Collateral Type<Text style={styles.requiredStar}> *</Text>
                                </Text>
                                <TouchableOpacity
                                    style={[
                                        styles.dropdown,
                                        showCollateralDropdown && styles.dropdownOpen,
                                        fieldErrors.collateralType ? styles.dropdownError : null,
                                    ]}
                                    activeOpacity={0.8}
                                    onPress={() => setShowCollateralDropdown(!showCollateralDropdown)}
                                >
                                    <Text style={[styles.dropdownValue, !selectedCollateralType && { color: "#9CA3AF" }]}>
                                        {selectedCollateralType ?? "Select an option"}
                                    </Text>
                                    <Ionicons
                                        name={showCollateralDropdown ? "chevron-up" : "chevron-down"}
                                        size={18}
                                        color="#6B7280"
                                    />
                                </TouchableOpacity>

                                {showCollateralDropdown && (
                                    <View style={styles.dropdownMenu}>
                                        {COLLATERAL_TYPES.map((ct, index) => {
                                            const isActive = selectedCollateralType === ct.value;
                                            return (
                                                <TouchableOpacity
                                                    key={ct.value}
                                                    style={[
                                                        styles.dropdownItem,
                                                        isActive && styles.dropdownItemActive,
                                                        index < COLLATERAL_TYPES.length - 1 && {
                                                            borderBottomWidth: 1,
                                                            borderBottomColor: "#F3F4F6",
                                                        },
                                                    ]}
                                                    onPress={() => handleSelectCollateralType(ct.value)}
                                                    activeOpacity={0.7}
                                                >
                                                    <Text style={[styles.dropdownItemText, isActive && styles.dropdownItemTextActive]}>
                                                        {ct.label}
                                                    </Text>
                                                    {isActive && (
                                                        <Ionicons name="checkmark-circle" size={18} color={BLUE} />
                                                    )}
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                )}

                                {fieldErrors.collateralType && (
                                    <ValidationHint message={fieldErrors.collateralType} type="error" />
                                )}
                            </View>

                            {/* Collateral Document */}
                            <View>
                                <Text style={styles.fieldLabel}>
                                    Collateral Document<Text style={styles.requiredStar}> *</Text>
                                </Text>
                                <TouchableOpacity
                                    style={[
                                        styles.uploadBox,
                                        collateralDocumentName ? styles.uploadBoxFilled : null,
                                        fieldErrors.collateralDocument ? styles.uploadBoxError : null,
                                    ]}
                                    activeOpacity={0.75}
                                    onPress={handlePickDocument}
                                >
                                    {collateralDocumentName ? (
                                        <>
                                            <Ionicons name="document-attach" size={24} color={GREEN} style={{ marginBottom: 6 }} />
                                            <Text style={styles.uploadFileNameText} numberOfLines={2}>
                                                {collateralDocumentName}
                                            </Text>
                                            <Text style={styles.uploadChangeTap}>Tap to change</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Ionicons name="cloud-upload-outline" size={24} color="#9CA3AF" style={{ marginBottom: 6 }} />
                                            <Text style={styles.uploadPlaceholder}>
                                                Drag & Drop your files or{" "}
                                                <Text style={styles.uploadBrowse}>Browse</Text>
                                            </Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.uploadHint}>
                                    Upload land title, vehicle OR/CR, or other collateral proof.
                                </Text>
                                {fieldErrors.collateralDocument && (
                                    <ValidationHint message={fieldErrors.collateralDocument} type="error" />
                                )}
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F5F6FA",
    },
    hero: {
        padding: 28,
        paddingBottom: 36,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    tag: {
        alignSelf: "center",
        backgroundColor: "rgba(255,255,255,0.18)",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginBottom: 16,
    },
    tagText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        letterSpacing: 0.3,
    },
    heroTitle: {
        color: "#FFFFFF",
        fontSize: 28,
        fontFamily: "Poppins_700Bold",
        lineHeight: 38,
        marginBottom: 14,
        letterSpacing: -0.3,
        textAlign: "center",
    },
    heroDesc: {
        color: "rgba(255,255,255,0.82)",
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        lineHeight: 22,
        textAlign: "center",
    },
    cardsWrapper: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 32,
        gap: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    // ── Collateral card styles ──
    collateralCard: {
        borderWidth: 1.5,
        borderColor: "#FDE68A",
    },
    collateralIconBox: {
        backgroundColor: ORANGE_LIGHT,
    },
    collateralSubtitle: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
        lineHeight: 18,
    },
    collateralWarningBanner: {
        backgroundColor: ORANGE_LIGHT,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#FDE68A",
        padding: 14,
        marginBottom: 18,
    },
    collateralWarningHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    collateralWarningTitle: {
        fontSize: 13,
        fontFamily: "Poppins_600SemiBold",
        color: "#92400E",
    },
    collateralWarningText: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#92400E",
        lineHeight: 20,
    },
    collateralRow: {
        flexDirection: "row",
        gap: 12,
    },
    collateralColLeft: {
        flex: 1,
    },
    collateralColRight: {
        flex: 1,
    },
    uploadBox: {
        borderWidth: 1.5,
        borderStyle: "dashed",
        borderColor: "#D1D5DB",
        borderRadius: 14,
        backgroundColor: "#F9FAFB",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12,
        paddingVertical: 18,
        minHeight: 110,
        marginBottom: 6,
    },
    uploadBoxFilled: {
        borderColor: GREEN,
        backgroundColor: "#F0FDF4",
        borderStyle: "solid",
    },
    uploadBoxError: {
        borderColor: RED,
        backgroundColor: RED_LIGHT,
        borderStyle: "solid",
    },
    uploadPlaceholder: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
        textAlign: "center",
        lineHeight: 18,
    },
    uploadBrowse: {
        fontFamily: "Poppins_700Bold",
        color: "#111827",
    },
    uploadFileNameText: {
        fontSize: 11,
        fontFamily: "Poppins_500Medium",
        color: "#166534",
        textAlign: "center",
        marginBottom: 2,
    },
    uploadChangeTap: {
        fontSize: 10,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
    },
    uploadHint: {
        fontSize: 11,
        fontFamily: "Poppins_400Regular",
        color: "#9CA3AF",
        lineHeight: 16,
    },
    requiredStar: {
        color: RED,
    },
    dropdownError: {
        borderColor: RED,
        backgroundColor: RED_LIGHT,
    },
    // ── Shared / original styles ──
    cardTopRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 15,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: BLUE_LIGHT,
        alignItems: "center",
        justifyContent: "center",
    },
    cardTitle: {
        color: "#111827",
        fontSize: 20,
        fontFamily: "Poppins_700Bold",
        marginBottom: 2,
    },
    fieldLabel: {
        color: "#374151",
        fontSize: 14,
        fontFamily: "Poppins_600SemiBold",
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        paddingHorizontal: 14,
        marginBottom: 4,
        height: 54,
    },
    inputWrapperError: {
        borderColor: RED,
        backgroundColor: RED_LIGHT,
    },
    inputWrapperLocked: {
        backgroundColor: BLUE_LIGHT,
        borderColor: "#C7D7F9",
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: "#111827",
        height: "100%",
    },
    inputSuffix: {
        fontSize: 12,
        fontFamily: "Poppins_500Medium",
        color: "#9CA3AF",
        marginLeft: 4,
    },
    lockedValue: {
        flex: 1,
        fontSize: 15,
        fontFamily: "Poppins_600SemiBold",
        color: BLUE,
    },
    lockedBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#C7D7F9",
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 3,
        gap: 3,
    },
    lockedBadgeText: {
        fontSize: 11,
        fontFamily: "Poppins_600SemiBold",
        color: BLUE,
    },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 13,
        backgroundColor: "#FAFAFA",
    },
    dropdownOpen: {
        borderColor: BLUE,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: BLUE_LIGHT,
    },
    dropdownValue: {
        color: "#111827",
        fontSize: 14,
        fontFamily: "Poppins_500Medium",
    },
    dropdownMenu: {
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: BLUE,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: "#fff",
        overflow: "hidden",
        zIndex: 10,
    },
    dropdownItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    dropdownItemActive: {
        backgroundColor: BLUE_LIGHT,
    },
    dropdownItemText: {
        color: "#374151",
        fontSize: 14,
        fontFamily: "Poppins_500Medium",
    },
    dropdownItemTextActive: {
        color: BLUE,
        fontFamily: "Poppins_600SemiBold",
    },
    dropdownItemHint: {
        color: "#9CA3AF",
        fontSize: 11,
        fontFamily: "Poppins_400Regular",
        marginTop: 2,
    },
    infoBanner: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: BLUE_LIGHT,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 9,
        marginTop: 8,
    },
    infoBannerText: {
        flex: 1,
        color: BLUE,
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        lineHeight: 18,
    },
    hintRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginBottom: 12,
        marginTop: 2,
    },
    hintRowError: {
        backgroundColor: RED_LIGHT,
    },
    hintRowInfo: {
        backgroundColor: BLUE_LIGHT,
    },
    hintText: {
        flex: 1,
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        lineHeight: 18,
    },
    hintTextError: {
        color: RED,
    },
    hintTextInfo: {
        color: BLUE,
    },
    submitButton: {
        borderRadius: 16,
        marginTop: 15,
        overflow: "hidden",
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
    submitGradient: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 16,
    },
    submitText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold",
        letterSpacing: 0.3,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 28,
    },
    modalCard: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 32,
        alignItems: "center",
        width: "100%",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        elevation: 10,
    },
    modalIconWrapper: {
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 22,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
        marginBottom: 10,
        textAlign: "center",
    },
    modalDesc: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 24,
    },
    modalButton: {
        width: "100%",
        borderRadius: 14,
        overflow: "hidden",
    },
    modalButtonGradient: {
        paddingVertical: 14,
        alignItems: "center",
        borderRadius: 14,
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "Poppins_600SemiBold",
    },
});