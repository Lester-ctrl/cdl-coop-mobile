const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function editProfile(formData: {
    profile_id: number | undefined;
    first_name: string;
    middle_name: string;
    last_name: string;
    birthdate: string;
    email: string;
    mobile_number: string;
    address: string;
}) {
  const response = await fetch(`${BASE_URL}/api/edit-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Update failed.");
  }

  return data;
}