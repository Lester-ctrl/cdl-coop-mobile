import LoanOfficerNavbar from "@/components/navigations/accountofficer";
import { Slot } from "expo-router";

export default function LoanOfficerLayout() {
  return (
    <>
      <LoanOfficerNavbar />
      <Slot />
    </>
  );
}
