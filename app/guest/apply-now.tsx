import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BLUE = "#2952CC";
const BLUE_DARK = "#1a3aab";
const BLUE_LIGHT = "#EEF2FF";

const MEMBERSHIP_TYPES = ["Regular Member", "Associate Member"];

const ID_TYPES = [
  "Philippine Passport",
  "SSS ID",
  "PhilHealth ID",
  "Postal ID",
  "Driver's License",
  "Voter's ID",
  "National ID (PhilSys)",
  "UMID",
];

export default function ApplyNow() {
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [showMembershipDropdown, setShowMembershipDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [idType, setIdType] = useState("");
  const [showIdTypeDropdown, setShowIdTypeDropdown] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

      {/* ── Hero ── */}
      <View style={styles.hero}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Application Form</Text>
        </View>
        <Text style={styles.heroTitle}>Membership{"\n"}Application</Text>
        <Text style={styles.heroSubtitle}>
          Complete the form below to begin your journey with us. All fields are
          required unless marked optional.
        </Text>
      </View>

      {/* ── Personal Information Card ── */}
      <View style={styles.card}>
        {/* Card Header */}
        <View style={styles.formHeader}>
          <View style={styles.iconBox}>
            <Ionicons name="person-outline" size={20} color={BLUE} />
          </View>
          <Text style={styles.formTitle}>Personal Information</Text>
        </View>

        <View style={styles.divider} />

        {/* First Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>First Name</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              placeholderTextColor="#9CA3AF"
              value={firstname}
              onChangeText={setFirstname}
            />
          </View>
        </View>

        {/* Middle Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Middle Name</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your middle name"
              placeholderTextColor="#9CA3AF"
              value={middlename}
              onChangeText={setMiddlename}
            />
          </View>
        </View>

        {/* Last Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Last Name</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              placeholderTextColor="#9CA3AF"
              value={lastname}
              onChangeText={setLastname}
            />
          </View>
        </View>

        {/* Date of Birth + Membership Type row */}
        <View style={[styles.rowGroup, { zIndex: 10 }]}>
          {/* Date of Birth */}
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>Date of Birth</Text>
            {Platform.OS === "web" ? (
              <View style={styles.inputWrapper}>
                <Ionicons name="calendar-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
                {/* @ts-ignore */}
                <input
                  type="date"
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: 14,
                    fontFamily: "inherit",
                    color: "#111827",
                    backgroundColor: "transparent",
                  }}
                  onChange={(e: any) => setDateOfBirth(e.target.value)}
                />
              </View>
            ) : (
              <View style={styles.inputWrapper}>
                <Ionicons name="calendar-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="mm/dd/yy"
                  placeholderTextColor="#9CA3AF"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  keyboardType="numbers-and-punctuation"
                />
              </View>
            )}
          </View>

          <View style={{ width: 10 }} />

          {/* Membership Type */}
          <View style={[styles.fieldGroup, { flex: 1, zIndex: 20 }]}>
            <Text style={styles.label}>Membership Type</Text>
            <TouchableOpacity
              style={styles.inputWrapper}
              activeOpacity={0.8}
              onPress={() => setShowMembershipDropdown(!showMembershipDropdown)}
            >
              <Text
                style={[
                  styles.input,
                  { flex: 1, color: membershipType ? "#111827" : "#9CA3AF" },
                ]}
                numberOfLines={1}
              >
                {membershipType || "Select type"}
              </Text>
              <Ionicons
                name={showMembershipDropdown ? "chevron-up" : "chevron-down"}
                size={16}
                color="#6B7280"
              />
            </TouchableOpacity>
            {showMembershipDropdown && (
              <View style={styles.dropdownMenu}>
                {MEMBERSHIP_TYPES.map((type, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.dropdownItem,
                      membershipType === type && styles.dropdownItemActive,
                    ]}
                    onPress={() => {
                      setMembershipType(type);
                      setShowMembershipDropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        membershipType === type && styles.dropdownItemTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Email Address */}
        <View style={[styles.fieldGroup, { zIndex: 1 }]}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Phone Number */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#9CA3AF"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Complete Address */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Complete Address</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="location-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your complete address"
              placeholderTextColor="#9CA3AF"
              value={address}
              onChangeText={setAddress}
            />
          </View>
        </View>

        {/* City + Zip Code row */}
        <View style={styles.rowGroup}>
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>City/Municipality</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="business-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor="#9CA3AF"
                value={city}
                onChangeText={setCity}
              />
            </View>
          </View>

          <View style={{ width: 10 }} />

          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>Zip Code</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { marginLeft: 0 }]}
                placeholder="0000"
                placeholderTextColor="#9CA3AF"
                value={zipCode}
                onChangeText={setZipCode}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      </View>

      {/* Identification Card */}
      <View style={[styles.card, { zIndex: 30, marginTop: 0 }]}>
        <View style={styles.formHeader}>
          <View style={[styles.iconBox, { backgroundColor: "#FFF1F2" }]}>
            <Ionicons name="card-outline" size={20} color="#E11D48" />
          </View>
          <Text style={styles.formTitle}>Identification</Text>
        </View>
        <View style={styles.divider} />

        <View style={[styles.fieldGroup, { zIndex: 20 }]}>
          <Text style={styles.label}>ID Type</Text>
          <TouchableOpacity
            style={styles.inputWrapper}
            activeOpacity={0.8}
            onPress={() => setShowIdTypeDropdown(!showIdTypeDropdown)}
          >
            <Text style={[styles.input, { flex: 1, color: idType ? "#111827" : "#9CA3AF" }]} numberOfLines={1}>
              {idType || "Select ID type"}
            </Text>
            <Ionicons name={showIdTypeDropdown ? "chevron-up" : "chevron-down"} size={16} color="#6B7280" />
          </TouchableOpacity>
          {showIdTypeDropdown && (
            <View style={styles.dropdownMenu}>
              {ID_TYPES.map((t, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.dropdownItem, idType === t && styles.dropdownItemActive]}
                  onPress={() => { setIdType(t); setShowIdTypeDropdown(false); }}
                >
                  <Text style={[styles.dropdownItemText, idType === t && styles.dropdownItemTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={[styles.fieldGroup, { zIndex: 1, marginBottom: 0 }]}>
          <Text style={styles.label}>ID Number</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="card-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your ID number"
              placeholderTextColor="#9CA3AF"
              value={idNumber}
              onChangeText={setIdNumber}
            />
          </View>
        </View>
      </View>

      {/* Emergency Contact Card */}
      <View style={[styles.card, { zIndex: 20 }]}>
        <View style={styles.formHeader}>
          <View style={[styles.iconBox, { backgroundColor: "#FFF7ED" }]}>
            <Ionicons name="heart-outline" size={20} color="#EA580C" />
          </View>
          <Text style={styles.formTitle}>Emergency Contact</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={18} color="#EA580C" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              placeholderTextColor="#9CA3AF"
              value={emergencyName}
              onChangeText={setEmergencyName}
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={18} color="#EA580C" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="#9CA3AF"
              value={emergencyPhone}
              onChangeText={setEmergencyPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={[styles.fieldGroup, { marginBottom: 0 }]}>
          <Text style={styles.label}>Relationship</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="people-outline" size={18} color="#EA580C" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Spouse, Parent, Sibling"
              placeholderTextColor="#9CA3AF"
              value={emergencyRelationship}
              onChangeText={setEmergencyRelationship}
            />
          </View>
        </View>
      </View>

      {/* Terms & Conditions Card */}
      <View style={[styles.card, { zIndex: 10 }]}>
        <View style={styles.formHeader}>
          <View style={[styles.iconBox, { backgroundColor: "#F0F9FF" }]}>
            <Ionicons name="document-text-outline" size={20} color="#0284C7" />
          </View>
          <Text style={styles.formTitle}>Terms & Conditions</Text>
        </View>
        <View style={styles.divider} />

        {/* Terms Summary */}
        <View style={styles.termsSummary}>
          <Text style={styles.termsSummaryTitle}>By submitting this application, you acknowledge that:</Text>

          {[
            "All information provided is true, accurate, and complete to the best of your knowledge.",
            "You authorize the cooperative to verify the information and conduct background checks as necessary.",
            "Your personal data will be collected, stored, and processed in accordance with the Data Privacy Act of 2012.",
            "Providing false information may result in rejection of your application or termination of membership.",
            "You agree to abide by the cooperative's by-laws, policies, and regulations.",
            "Share capital and membership fees are non-refundable upon resignation or expulsion.",
          ].map((term, i) => (
            <View key={i} style={styles.termItem}>
              <View style={styles.termBullet}>
                <Text style={styles.termBulletText}>{i + 1}</Text>
              </View>
              <Text style={styles.termText}>{term}</Text>
            </View>
          ))}
        </View>

        {/* Read Full Terms Link */}
        <TouchableOpacity
          style={styles.readMoreBtn}
          activeOpacity={0.7}
          onPress={() => setShowTerms(!showTerms)}
        >
          <Ionicons name={showTerms ? "chevron-up" : "chevron-down"} size={14} color={BLUE} />
          <Text style={styles.readMoreText}>
            {showTerms ? "Hide full terms" : "Read full terms & conditions"}
          </Text>
        </TouchableOpacity>

        {showTerms && (
          <View style={styles.fullTermsBox}>
            <Text style={styles.fullTermsTitle}>Full Terms & Conditions</Text>
            <Text style={styles.fullTermsText}>
              {`MEMBERSHIP TERMS AND CONDITIONS

Article 1 – Membership Eligibility
Any person of legal age who is a Filipino citizen or resident, of good moral character, and willing to abide by the cooperative's by-laws may apply for membership.

Article 2 – Data Privacy
The cooperative collects personal information solely for membership processing and service delivery. Data is stored securely and will not be shared with third parties without your consent, except as required by law.

Article 3 – Share Capital
Members are required to maintain the minimum share capital as prescribed by the cooperative. Share capital earns dividends based on the cooperative's annual net surplus.

Article 4 – Member Obligations
Members are expected to attend general assemblies, pay obligations on time, participate in cooperative programs, and conduct themselves in a manner consistent with cooperative values.

Article 5 – Loan Privileges
Loan privileges are extended to members in good standing. The cooperative reserves the right to approve, modify, or deny loan applications based on creditworthiness and available funds.

Article 6 – Termination
Membership may be terminated voluntarily by written resignation or involuntarily due to non-compliance with cooperative policies. All outstanding obligations must be settled prior to termination.`}
            </Text>
          </View>
        )}

        {/* Checkbox */}
        <TouchableOpacity
          style={styles.checkboxRow}
          activeOpacity={0.7}
          onPress={() => setAgreedToTerms(!agreedToTerms)}
        >
          <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
            {agreedToTerms && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>
            I have read and agree to the{" "}
            <Text style={styles.checkboxLabelLink}>Terms & Conditions</Text>
            {" "}and consent to the processing of my personal data.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <View style={styles.submitWrapper}>
        <TouchableOpacity
          style={[styles.submitButton, !agreedToTerms && styles.submitButtonDisabled]}
          activeOpacity={agreedToTerms ? 0.85 : 1}
          onPress={() => {
            if (!agreedToTerms) return;
            // handle submit
          }}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.submitButtonText}>Submit Application</Text>
        </TouchableOpacity>
        {!agreedToTerms && (
          <Text style={styles.submitDisabledNote}>
            Please agree to the terms and conditions to continue.
          </Text>
        )}
      </View>

      {/* Bottom padding */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  /* ── Hero ── */
  hero: {
    backgroundColor: BLUE,
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 52,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.45)",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginBottom: 20,
  },
  heroBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 38,
    fontFamily: "Poppins_800ExtraBold",
    lineHeight: 48,
    marginBottom: 14,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    lineHeight: 22,
  },

  /* ── Card ── */
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 22,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    overflow: "visible",
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: BLUE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  formTitle: {
    color: "#111827",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 18,
  },

  /* ── Fields ── */
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    color: "#374151",
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
    backgroundColor: "#fff",
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#111827",
    paddingVertical: 0,
  },
  rowGroup: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  /* ── Dropdown ── */
  dropdownMenu: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    zIndex: 99,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  dropdownItemActive: {
    backgroundColor: BLUE_LIGHT,
  },
  dropdownItemText: {
    color: "#374151",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  dropdownItemTextActive: {
    color: BLUE,
    fontFamily: "Poppins_600SemiBold",
  },

  /* ── Submit ── */
  submitWrapper: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  submitButton: {
    backgroundColor: "#2952CC",
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  submitNote: {
    color: "#9CA3AF",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    lineHeight: 18,
  },
  submitButtonDisabled: {
    backgroundColor: "#A0AEC0",
  },
  submitDisabledNote: {
    color: "#EF4444",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    marginTop: 8,
  },

  /* Terms */
  termsSummary: {
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    gap: 12,
  },
  termsSummaryTitle: {
    color: "#374151",
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
    lineHeight: 20,
  },
  termItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  termBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BLUE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  termBulletText: {
    color: BLUE,
    fontSize: 10,
    fontFamily: "Poppins_700Bold",
  },
  termText: {
    color: "#374151",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    lineHeight: 18,
    flex: 1,
  },
  readMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },
  readMoreText: {
    color: BLUE,
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
  },
  fullTermsBox: {
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  fullTermsTitle: {
    color: "#111827",
    fontSize: 13,
    fontFamily: "Poppins_700Bold",
    marginBottom: 10,
  },
  fullTermsText: {
    color: "#374151",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    lineHeight: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingTop: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: BLUE,
    borderColor: BLUE,
  },
  checkboxLabel: {
    color: "#374151",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    lineHeight: 20,
    flex: 1,
  },
  checkboxLabelLink: {
    color: BLUE,
    fontFamily: "Poppins_600SemiBold",
  },
});