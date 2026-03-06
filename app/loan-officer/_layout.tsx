import LoanOfficerNavbar from "@/components/navigations/loanofficerNavbar";
import LoanOfficerDashboard from "./home";

export default function LoanOfficerLayout() {
  return (
    <>
      <LoanOfficerNavbar />
      <LoanOfficerDashboard />
    </>
  );
}
