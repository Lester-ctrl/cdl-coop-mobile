const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export interface LoanOfficerNotificationResponse {
  id: number;
  title: string;
  description: string | null;
  is_read: boolean;
  created_at: string;
}

interface ApiErrorResponse {
  message?: string;
}

function buildNotificationUrl(path = ""): string {
  if (!BASE_URL) {
    throw new Error("EXPO_PUBLIC_BASE_URL is not set");
  }

  return `${BASE_URL}/api/loan-officer/notifications${path}`;
}

async function parseResponse(response: Response): Promise<any> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : {};
}

export async function fetchLoanOfficerNotifications(): Promise<LoanOfficerNotificationResponse[]> {
  const response = await fetch(buildNotificationUrl(), {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  const json = (await parseResponse(response)) as LoanOfficerNotificationResponse[] | ApiErrorResponse;

  if (!response.ok) {
    const error = json as ApiErrorResponse;
    throw new Error(error.message || "Failed to fetch notifications");
  }

  return json as LoanOfficerNotificationResponse[];
}

export async function LoanofficerNotification(
  notificationId: string,
  data: { is_read: boolean },
) {
  try {
    const response = await fetch(buildNotificationUrl(`/${notificationId}`), {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = (await parseResponse(response)) as ApiErrorResponse;

    if (!response.ok) {
      throw new Error(json.message || "Failed to update notification status");
    }

    return json;
  } catch (error) {
    console.error("Error updating notification status:", error);
    throw error;
  }
}