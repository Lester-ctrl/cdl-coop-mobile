const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function editProfile(formData: FormData) {
  const response = await fetch(`${BASE_URL}/api/edit-profile`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      // Note: Do NOT set Content-Type manually — fetch will automatically
      // set it to multipart/form-data with the correct boundary when given FormData.
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Update failed.");
  } 

  return data;
}