const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function SendLoanApplication(payload: any) {

    const formData = new FormData();

    formData.append("profile_id", payload.profile_id);
    formData.append("loanType", payload.loanType);
    formData.append("loanTypeLabel", payload.loanTypeLabel);
    formData.append("amountRequested", payload.amountRequested);
    formData.append("termMonths", payload.termMonths);

    if (payload.interestRate) {
        formData.append("interestRate", payload.interestRate);
    }

    if (payload.collateral) {

        formData.append("collateral_type", payload.collateral.type);

        let fileData: any;

        // Web (blob URI)
        if (payload.collateral.documentUri.startsWith("blob:")) {

            const response = await fetch(payload.collateral.documentUri);
            const blob = await response.blob();

            fileData = new File([blob], payload.collateral.documentName, {
                type: blob.type || "application/octet-stream"
            });

        } 
        // Mobile (file URI)
        else {

            fileData = {
                uri: payload.collateral.documentUri,
                name: payload.collateral.documentName,
                type: "application/octet-stream"
            };
        }

        formData.append("collateral_document", fileData);
    }

    const response = await fetch(`${BASE_URL}/api/send-application-form`, {
        method: "POST",
        headers: {
            Accept: "application/json"
        },
        body: formData,
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.error || json.message || "Loan application failed!");
    }

    return json;  
}

export async function FetchPendingApplications(memberId: any) {
    const response = await fetch(`${BASE_URL}/api/member/fetch-loan-applications`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ memberId }),
    });

    const data = await response.json();
    return data;
}

export async function cancelApplication(loanApplicationId: any){
    const response = await fetch(`${BASE_URL}/api/cancel-loan-applications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ loanApplicationId }),
    });

    const res = await response.json();
    return res;
}