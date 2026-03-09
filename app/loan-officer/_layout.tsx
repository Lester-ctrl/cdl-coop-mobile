import LoanOfficerNavbar from "@/components/navigations/loanofficerNavbar";
import { Slot } from "expo-router";

export default function LoanOfficerLayout() {
  return (
    <>
      <LoanOfficerNavbar />
      <Slot />
    </>
  );
}
