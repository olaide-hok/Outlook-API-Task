import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 */
export async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}


/**
 * Attaches a given access token to a Microsoft Graph API call. Returns the user's email
 */
 export async function callMsGraphMail(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    const response = await fetch(graphConfig.graphMailEndpoint, options)
    const data = await response.json()
    const value = data.value
    console.log(value);
    return value
        // .then(response => console.log(response.json()))
        // .catch(error => console.log(error));

        
}


//     const fetchUsers = async () => {
//        const response = await fetch("https://graph.microsoft.com/v1.0/me/messages", {
//           "method": "GET",
//           "headers" : new Headers ({
//               "Authorization": `Bearer ${token}`
//           }),

//        })

//        const data = await response.json()
//        console.log(data);
//     }