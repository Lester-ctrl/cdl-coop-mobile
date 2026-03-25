const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function editProfile(profileId: string, data: any) {
  const response = await fetch(
    `${BASE_URL}/loan-officer/profile/${profileId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json?.error || json?.message || "Failed to update profile");
  }

  return json;
}
