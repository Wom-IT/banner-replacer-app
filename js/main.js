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

function initTabs() {
  const tabBanner = document.getElementById("tabBanner");
  const tabEmails = document.getElementById("tabEmails");

  const bannerSection = document.getElementById("bannerSection");
  const emailSection = document.getElementById("emailSection");

  if (!tabBanner || !tabEmails) return;

  tabBanner.addEventListener("click", () => {
    tabBanner.classList.add("active");
    tabEmails.classList.remove("active");

    bannerSection.classList.toggle("hidden");
    emailSection.classList.toggle("hidden");
  });

  tabEmails.addEventListener("click", () => {
    tabEmails.classList.add("active");
    tabBanner.classList.remove("active");

    emailSection.classList.toggle("hidden");
    bannerSection.classList.toggle("hidden");
  });
}

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

    /*if (response) {
      sessionStorage.setItem("accessToken", response.accessToken || "");
      sessionStorage.setItem("idToken", response.idToken || "");

      showAuthenticatedUI();
      document.getElementById("userName").textContent = "Local Test User";
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
    }*/

    // TEMP: bypass auth for local testing
    showAuthenticatedUI();
    document.getElementById("userName").textContent = "Local Test User";

    // skip backend calls for now
    // await initBannerManager();
    // await loadCurrentBanner();
  } catch (error) {
    console.error("Redirect handling failed:", error);
  }

  loginBtn.addEventListener("click", login);
  logoutBtn.addEventListener("click", logout);

  bindBannerEvents();
  initTabs();
});
