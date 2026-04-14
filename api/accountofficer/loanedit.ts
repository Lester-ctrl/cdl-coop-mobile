const Base_URL = process.env.EXPO_PUBLIC_BASE_URL;

// Fetch LoanEdit
export async function getLoanEdit(id) {
  const response = await fetch(`${Base_URL}/loans/${id}`, {      
    method: "GET",
    headers: {
      accept: "application/json",    
        "Content-Type": "application/json", 
    },
    });
    const json = await response.json();
      console.log("FETCH RESULT:", json);
    if (!response.ok) {
        throw new Error(
            json?.error || json?.message || "Failed to fetch loan details",
        );
    }
    return json;
}
