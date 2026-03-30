const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function getActiveLoans(pid: any){
    const response = await fetch(`${BASE_URL}/api/member/active-loans`, {
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