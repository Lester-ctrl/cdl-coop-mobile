import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getLoanEdit } from "@/api/accountofficer/loanedit";


export default function LoanDetailScreen() {
  const { loanId } = useLocalSearchParams();
  const router = useRouter();

  const [loan, setLoan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const cashflow = loan?.cashflow || {};

  const num = (v: any) => Number(v || 0);
  const peso = (v: any) =>
    `₱${num(v).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
    })}`;

  useEffect(() => {
    async function fetchLoan() {
      try {
        if (!loanId) return;

        const id = Number(loanId);
        const data = await getLoanEdit(id);

        const foundLoan = Array.isArray(data)
          ? data.find(
              (l: any) =>
                l.loan_application_id === id || l.member?.id === id
            )
          : data;

        setLoan(foundLoan);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLoan();
  }, [loanId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  if (!loan) {
    return (
      <View style={styles.center}>
        <Text>No data found</Text>
      </View>
    );
  }

  const details = loan?.loan_details || {};
  const member = loan?.member || {};
  const type = loan?.loan_type || {};

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              router.replace("/account-officer/loan-management")
            }
            style={styles.backBtn}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Loan Details</Text>
        </View>

        {/* LOAN INFORMATION */}
        <View style={styles.mainCard}>
          <Text style={styles.sectionTitle}>Loan Application Details</Text>

          <View style={styles.row}>
            <Info label="Member" value={member.full_name} />
            <Info label="Loan Type" value={type.name} />
          </View>

          <View style={styles.row}>
            <Info
              label="Amount Requested"
              value={`₱${details.amount_requested ?? "-"}`}
            />
            <Info label="Term (Months)" value={details.term_months} />
          </View>

          <View style={styles.row}>
            <Info
              label="Interest Rate"
              value={`${type.max_interest_rate ?? 0}%`}
            />
            <Info label="Status" value={details.status} />
          </View>

          <View style={styles.row}>
            <Info
              label="Coop Fee Total"
              value={`₱${details.coop_fee_total ?? "-"}`}
            />
            <Info
              label="Net Release Amount"
              value={`₱${details.net_release_amount ?? "-"}`}
            />
          </View>
        </View>

        {/* BASIC INFORMATION */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.row}>
            <Info label="Full Name" value={member.full_name} />

            <Info
              label="Birthday"
              value={
                member.birthdate
                  ? new Date(member.birthdate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })
                  : "-"
              }
            />
          </View>

          <View style={styles.row}>
            <Info label="Age" value={member.age} />
            <Info label="Sex" value={member.sex} />
          </View>

          <View style={styles.row}>
            <Info label="TIN" value={member.tin} />
          </View>
        </View>

        {/* CONTACT */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.row}>
            <Info
              label="Mobile"
              value={member.mobile_number || member.phone}
            />
            <Info label="Email" value={member.email} />
          </View>

          <View style={styles.row}>
            <Info label="Address" value={member.address} />
          </View>
        </View>

        {/* MEMBERSHIP */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Membership Information</Text>

          <View style={styles.grid}>
            <Box label="Member No." value={member.member_no} />
            <Box label="Membership Type" value={member.membership_type} />
            <Box label="Branch" value={member.branch} />
            <Box label="Member Status" value={member.status} />

            <Box
              label="Years in Coop"
              value={member.years_in_coop ?? "-"}
            />
            <Box
              label="No. of Dependents"
              value={member.dependents_count ?? "-"}
            />
            <Box
              label="No. of Children in School"
              value={member.children_in_school_count ?? "-"}
            />
          </View>
        </View>

        {/* EMPLOYMENT AND IDENTIFICATION */}
<View style={styles.card}>
  <Text style={styles.sectionTitle}>Employment and Identification</Text>

  <View style={styles.row}>
    <Info label="Occupation" value={member.occupation} />
    <Info label="Employer" value={member.employer} />
  </View>

  <View style={styles.row}>
    <Info label="Employment Info" value={member.employment_info} />
    <Info label="Monthly Income" value={member.monthly_income} />
  </View>

  <View style={styles.row}>
    <Info
      label="Monthly Income Range"
      value={member.monthly_income_range}
    />
    <Info label="ID Type" value={member.id_type} />
  </View>

  <View style={styles.row}>
    <Info label="ID Number" value={member.id_number} />
  </View>
</View>




        <View style={{ height: 120 }} />
      </ScrollView>

    {/* FOOTER */}
<TouchableOpacity
  style={styles.footerBtn}
  onPress={() =>
    router.push("/account-officer/loans_edit/cash_flow")
  }
>
  <Text style={styles.footerBtnText}>
    Next Transaction Review →
  </Text>
</TouchableOpacity>
    </View>
  );
}



/* COMPONENTS */
const Info = ({ label, value }: any) => (
  <View style={styles.infoBox}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value ?? "-"}</Text>
  </View>
);

const Box = ({ label, value }: any) => (
  <View style={styles.gridBox}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value ?? "-"}</Text>
  </View>
);

/* STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0B5D1E",
    flex: 1,
    textAlign: "center",
    marginRight: 38,
  },

  backBtn: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
  },

  backText: { fontSize: 18, fontWeight: "bold", color: "#0B5D1E" },

  mainCard: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 12,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#0B5D1E",
  },

  row: { flexDirection: "row", justifyContent: "space-between" },

  infoBox: { width: "48%", marginBottom: 10 },

  label: { fontSize: 12, color: "gray" },

  value: { fontSize: 14, fontWeight: "600" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridBox: {
    width: "48%",
    backgroundColor: "#F1F3F5",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  footerBtn: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: "#0B5D1E",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  footerBtnText: { color: "#fff", fontWeight: "600" },
});