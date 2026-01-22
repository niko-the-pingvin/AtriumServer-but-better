export const BaseIMGUrl = "";

export async function GetRequest(path){
    const userAuthToken = localStorage.getItem("authTokenAd");
    const request = await fetch(`${window.location.origin}/${path}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userAuthToken,
        },
    });
    const response = await request.json();

    if(request.status !== 200){
        return { "ok": false, "response": response };
    }

    return { "ok": true, "response": response };
}

export async function PostRequest(path, inputBody){
    const userAuthToken = localStorage.getItem("authTokenAd");
    const request = await fetch(`${window.location.origin}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userAuthToken,
        },
        body: JSON.stringify(inputBody),
    });
    const response = await request.json();

    if(request.status !== 200){
        return { "ok": false, "response": response };
    }

    return { "ok": true, "response": response };
}

export function TogglePasswordVisibility(displayBox, inputField){
    switch(displayBox.checked){
        case true:
            inputField.setAttribute("type", "text"); break;
        case false:
            inputField.setAttribute("type", "password"); break;
    }
}