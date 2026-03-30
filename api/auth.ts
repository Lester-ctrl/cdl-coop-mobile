const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function login(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/api/mobile-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    // throws the Laravel error message (e.g. "Invalid email!")
    throw new Error(json.error || json.message || "Login failed");
  }

  return json; // { message, data: { user, profile, role_name } }
}
