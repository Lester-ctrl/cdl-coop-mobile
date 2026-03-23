const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function fetchNotifications(profile_id: any){
    const response = await fetch(`${BASE_URL}/member/fetch-notifications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ profile_id }),
    });

    const data = await response.json();
    return data;
}

export async function deleteNotification(notif_id: any){
    const response = await fetch(`${BASE_URL}/member/delete-notification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ notif_id }),
    });

    const data = await response.json();
    return data;
}