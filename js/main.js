import {
  initializeAuth,
  login,
  logout,
  isAuthenticated,
  handleRedirect,
  getCurrentAccount,
} from "./auth.js";

import {
  showAuthenticatedUI,
  showUnauthenticatedUI,
  loadUserInfo,
  loginBtn,
  logoutBtn,
} from "./ui.js";

import {
  initBannerManager,
  loadCurrentBanner,
  bindBannerEvents,
} from "./banner.js";

window.addEventListener("load", async () => {
  try {
    await initializeAuth();
    console.log("MSAL initialized");
  } catch (err) {
    console.error("MSAL init failed:", err);
    alert("Authentication service failed to initialize.");
    return;
  }

  try {
    const response = await handleRedirect();

    if (response) {
      sessionStorage.setItem("accessToken", response.accessToken || "");
      sessionStorage.setItem("idToken", response.idToken || "");

      showAuthenticatedUI();
      loadUserInfo(getCurrentAccount());

      await initBannerManager();
      await loadCurrentBanner();
    } else if (isAuthenticated()) {
      showAuthenticatedUI();
      loadUserInfo(getCurrentAccount());

      await initBannerManager();
      await loadCurrentBanner();
    } else {
      showUnauthenticatedUI();
    }
  } catch (error) {
    console.error("Redirect handling failed:", error);
  }

  loginBtn.addEventListener("click", login);
  logoutBtn.addEventListener("click", logout);

  bindBannerEvents();
});
