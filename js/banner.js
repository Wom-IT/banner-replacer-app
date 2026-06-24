import { CONFIG } from "./config.js";
import { fetchSasToken } from "./auth.js";
import {
  bannerPreview,
  fileInput,
  fileName,
  previewNew,
  previewImg,
  uploadBtn,
  clearBtn,
  messageEl,
  confirmModal,
  confirmBtn,
  cancelBtn,
  confirmSpinner,
  showMessage,
  uploadArea,
} from "./ui.js";

let selectedFile = null;
let sasToken = null;

export async function initBannerManager() {
  sasToken = await fetchSasToken();
}

function getBlobUrl(blobName) {
  return `https://${CONFIG.storageAccount}.blob.core.windows.net/${CONFIG.container}/${blobName}?${sasToken}`;
}

export async function loadCurrentBanner() {
  try {
    bannerPreview.className = "banner-preview loading";

    const url = getBlobUrl(CONFIG.bannerName);
    const img = document.createElement("img");
    img.src = url;

    img.onload = () => {
      bannerPreview.innerHTML = "";
      bannerPreview.appendChild(img);
      bannerPreview.className = "banner-preview loaded";
    };

    img.onerror = () => {
      bannerPreview.className = "banner-preview error";
      bannerPreview.innerHTML = "Could not load current banner";
    };
  } catch (err) {
    console.error("Load error:", err);
    bannerPreview.className = "banner-preview error";
    bannerPreview.innerHTML = "Error loading banner";
  }
}

function handleFileSelect(file) {
  if (!file.type.startsWith("image/")) {
    showMessage("Please select an image file", "error");
    return;
  }

  selectedFile = file;
  fileName.textContent = `Selected: ${file.name}`;
  previewNew.classList.add("show");

  const reader = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
  };
  reader.readAsDataURL(file);

  uploadBtn.disabled = false;
  clearBtn.disabled = false;
}

function clearSelection() {
  selectedFile = null;
  fileInput.value = "";
  fileName.textContent = "";
  previewNew.classList.remove("show");
  uploadBtn.disabled = true;
  clearBtn.disabled = true;
  messageEl.className = "message";
}

async function performUpload() {
  if (!selectedFile) return;

  confirmSpinner.style.display = "inline-block";
  confirmBtn.disabled = true;

  try {
    showMessage("Archiving current banner...", "info");

    const archiveName = `${CONFIG.archiveFolder}/wide-banner-${new Date().getTime()}.png`;
    const sourceUrl = getBlobUrl(CONFIG.bannerName);
    const destUrl = getBlobUrl(archiveName);

    const copyResponse = await fetch(destUrl, {
      method: "PUT",
      headers: {
        "x-ms-copy-source": sourceUrl,
      },
    });

    if (!copyResponse.ok) {
      throw new Error(`Failed to archive: ${copyResponse.status}`);
    }

    showMessage("Uploading new banner...", "info");

    const uploadUrl = getBlobUrl(CONFIG.bannerName);
    const arrayBuffer = await selectedFile.arrayBuffer();

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": selectedFile.type,
      },
      body: arrayBuffer,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.status}`);
    }

    confirmModal.classList.remove("show");
    confirmSpinner.style.display = "none";
    confirmBtn.disabled = false;

    showMessage(
      "Banner replaced successfully!\n\nChanges will be live in approximately 30 minutes due to CDN caching.",
      "success",
    );

    clearSelection();
    setTimeout(() => loadCurrentBanner(), 1000);
  } catch (err) {
    console.error("Upload error:", err);
    confirmSpinner.style.display = "none";
    confirmBtn.disabled = false;
    showMessage(`Error: ${err.message}`, "error");
  }
}

export function bindBannerEvents() {
  fileInput.addEventListener("change", (e) => {
    if (e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  });

  uploadArea.addEventListener("click", () => fileInput.click());

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");

    if (e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  });

  clearBtn.addEventListener("click", () => {
    clearSelection();
  });

  uploadBtn.addEventListener("click", () => {
    confirmModal.classList.add("show");
  });

  cancelBtn.addEventListener("click", () => {
    confirmModal.classList.remove("show");
  });

  confirmBtn.addEventListener("click", async () => {
    await performUpload();
  });
}
