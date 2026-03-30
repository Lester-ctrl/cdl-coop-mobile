const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

//Fetch Active Members
export async function getActiveMembers() {
  const response = await fetch(`${BASE_URL}/member/active`, {   
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

// Fetch Member Details
export async function getMemberDetails(memberId) {
  const response = await fetch(`${BASE_URL}/member/${memberId}`, {
    method: "GET",
    headers: {
      accept: "application/json",
        "Content-Type": "application/json",
    },
    }); 
    const json = await response.json();
    if (!response.ok) {
        throw new Error(
            json?.error || json?.message || "Failed to fetch member details",
        );
    }
    return json;
}