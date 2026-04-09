const Base_URL = process.env.EXPO_PUBLIC_BASE_URL;

// Fetch Loans  
export async function getLoans() {
  const response = await fetch(`${Base_URL}/loan/all`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
    if (!response.ok) {
        throw new Error(
            json?.error || json?.message || "Failed to fetch loans",
        );
    }
    return json;
}
