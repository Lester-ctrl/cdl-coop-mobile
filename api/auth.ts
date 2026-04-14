const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function login(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/mobile-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || json.message || "Login failed");
  }

  return json; 
}

export async function setPinVal(pin: string, token: string){
  const response = await fetch(`${BASE_URL}/api/mobile-set-pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pin }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Failed to set PIN");
  }

  return json;
}

export async function verifyPinval(pin: string, token:string){
  const response = await fetch(`${BASE_URL}/api/mobile-verify-pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pin }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Failed to verify PIN");
  }

  return json;
}

export async function ChangePin(pin: string, token:string){
  const response = await fetch(`${BASE_URL}/api/mobile-change-pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pin }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Failed to change PIN");
  }

  return json;
}
