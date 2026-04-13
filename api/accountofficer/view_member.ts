const Base_URL = process.env.EXPO_PUBLIC_BASE_URL;
export async function viewMember(id) {
    try {
        const response = await fetch(`${Base_URL}/member-details/${id}`, {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        });

        const json = await response.json();
        console.log("FETCH RESULT:", json);

        if (!response.ok) {
            throw new Error(
                json?.message ||
                json?.error ||
                "Failed to fetch member details"
            );
        }

        return json;
    } catch (error) {
        console.log("FETCH ERROR:", error.message);
        throw error;
    }
}