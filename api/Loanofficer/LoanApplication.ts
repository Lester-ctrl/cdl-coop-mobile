const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function getLoanOfficerProfile(profileId: string) {
  const response = await fetch(
    `${BASE_URL}/loan-officer/profile/${profileId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  return response.json();
}
