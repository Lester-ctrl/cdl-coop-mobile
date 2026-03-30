const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function getLoanHistory(pid: any){
    const response = await fetch(`${BASE_URL}/api/member/loan-history`, {
        method: "post", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ pid }),
    });

    const data = await response.json();
    console.log(data);
    return data;
}