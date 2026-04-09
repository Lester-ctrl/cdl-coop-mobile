const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function getLoanOfficerProfile(profileId: string, token: string) {
  const response = await fetch(
    `${BASE_URL}/api/loan-officer/profile/${profileId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
}
