import { msalConfig, CONFIG } from "./config.js";

// MSAL instance - will be created once library is available
let myMSALObj = null;

// init MSAL
export async function initializeAuth() {
  if (typeof msal === "undefined") {
    throw new Error("MSAL library is not loaded");
  }

  myMSALObj = new msal.PublicClientApplication(msalConfig);
  await myMSALObj.initialize();
}

export async function login() {
  try {
    await myMSALObj.loginRedirect({
      scopes: ["User.Read"],
      prompt: "select_account",
    });
  } catch (error) {
    console.error("Login redirect failed:", error);
    alert("Login failed: " + (error?.message || error));
  }
}

export async function logout() {
  if (!myMSALObj) return;

  const account = myMSALObj.getAllAccounts()[0];

  await myMSALObj.logoutRedirect({
    account: account,
    postLogoutRedirectUri: msalConfig.auth.postLogoutRedirectUri,
  });
}

export function isAuthenticated() {
  if (!myMSALObj) return false;
  const accounts = myMSALObj.getAllAccounts();
  return accounts.length > 0;
}

export function getCurrentAccount() {
  if (!myMSALObj) return null;
  return myMSALObj.getAllAccounts()[0] || null;
}

export async function handleRedirect() {
  if (!myMSALObj) return null;
  return await myMSALObj.handleRedirectPromise();
}

export async function fetchSasToken() {
  if (!myMSALObj) return;

  const account = myMSALObj.getAllAccounts()[0];

  try {
    const tokenResponse = await myMSALObj.acquireTokenSilent({
      account: account,
      scopes: [CONFIG.apiScope],
    });

    const accessToken = tokenResponse.accessToken;

    const response = await fetch(CONFIG.functionUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.text();
    return data;
  } catch (err) {
    console.error("Token/API Fehler:", err);
  }
}
