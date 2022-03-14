export const msalConfig = {
    auth: {
      clientId: "290eda10-9009-49a3-a29a-14f0b7a8100a",
      authority: "https://login.microsoftonline.com/common", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
scopes: [ "email",
          "Mail.ReadWrite",
          "openid", 
          "profile", 
          "User.ReadWrite",
        ]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages"
};