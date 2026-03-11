const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function editProfile(profileId: string, data: any) {
  const response = await fetch(
    `${BASE_URL}/loan-officer/profile/${profileId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return response.json();
}
