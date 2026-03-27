const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

// Fetch Active Member
export async function getActiveMembers() {
  const response = await fetch(`${BASE_URL}/account-officer/members`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(
      json?.error || json?.message || "Failed to fetch active members",
    );
  }
  return json;
}
// Fetch Loan Disbursement
export async function getLoanDisbursement() {
  const response = await fetch(
    `${BASE_URL}/account-officer/loan-disbursements`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(
      json?.error || json?.message || "Failed to fetch loan disbursement",
    );
  }
  return json;
}
// Fetch Collecetions

export async function getCollections() {
  const response = await fetch(`${BASE_URL}/account-officer/collections`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(
      json?.error || json?.message || "Failed to fetch collections",
    );
  }
  return json;
}
