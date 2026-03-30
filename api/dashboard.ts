const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function getDashboardData(pid: any){
    const response = await fetch(`${BASE_URL}/api/member/dashboard-data`, {
        method: "post", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ pid }),
    });

    const data = await response.json();
    return data;
}