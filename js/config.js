export const msalConfig = {
  auth: {
    clientId: "896dee08-77e8-495b-9fe1-d7ae35416c4a",
    authority:
      "https://login.microsoftonline.com/a890865f-6169-4fe9-b996-5bb2752584d1",
    redirectUri: "https://wom-it.github.io/banner-replacer-app/",
    postLogoutRedirectUri: "https://wom-it.github.io/banner-replacer-app/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const CONFIG = {
  storageAccount: "wombatsstorageacct",
  container: "sigs-assets",
  bannerName: "wide-banner.png",
  archiveFolder: "not-in-use",
  functionUrl:
    "https://binner-manager-fn-dhamhmf5g5afe8c4.westeurope-01.azurewebsites.net/api/HttpTrigger1",
  apiScope: "api://896dee08-77e8-495b-9fe1-d7ae35416c4a/access_as_user",
};
``;
