export const bannerPreview = document.getElementById("bannerPreview");
export const uploadArea = document.getElementById("uploadArea");
export const fileInput = document.getElementById("fileInput");
export const fileName = document.getElementById("fileName");
export const previewNew = document.getElementById("previewNew");
export const previewImg = document.getElementById("previewImg");
export const uploadBtn = document.getElementById("uploadBtn");
export const clearBtn = document.getElementById("clearBtn");
export const messageEl = document.getElementById("message");
export const confirmModal = document.getElementById("confirmModal");
export const confirmBtn = document.getElementById("confirmBtn");
export const cancelBtn = document.getElementById("cancelBtn");
export const confirmSpinner = document.getElementById("confirmSpinner");
export const loginBtn = document.getElementById("loginBtn");
export const logoutBtn = document.getElementById("logoutBtn");

export function showMessage(text, type = "info") {
  messageEl.textContent = text;
  messageEl.className = `message show ${type}`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function showUnauthenticatedUI() {
  document.getElementById("authContainer").classList.remove("authenticated");
  document.getElementById("appContainer").classList.remove("authenticated");
}

export function showAuthenticatedUI() {
  document.getElementById("authContainer").classList.add("authenticated");
  document.getElementById("appContainer").classList.add("authenticated");
}

export function loadUserInfo(account) {
  try {
    if (account) {
      document.getElementById("userName").textContent =
        account.name || account.username;
    }
  } catch (error) {
    console.error("Error loading user info:", error);
  }
}
