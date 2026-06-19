# Microsoft Authentication Setup Guide

This app now requires users to authenticate with their Microsoft work account (Entra ID/Azure AD). Follow these steps to configure it:

## 1. Register App in Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Entra ID** → **App registrations** → **New registration**
3. Enter:
   - **Name**: "Banner Manager"
   - **Supported account types**: "Accounts in this organizational directory only (WOMBATS only - Single tenant)"
   - **Redirect URI**: Select "Single-page application (SPA)" and enter your app URL (e.g., `https://yourdomain.com` or the local URL)
4. Click **Register**

## 2. Get Your App ID & Tenant ID

On the app overview page:
- Copy the **Application (client) ID** 
- Copy the **Directory (tenant) ID**

## 3. Update Configuration in index.html

Edit `index.html` and find the `msalConfig` object (around line 520):

```javascript
const msalConfig = {
  auth: {
    clientId: "YOUR_APP_ID_HERE",           // Paste your Application ID here
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID_HERE", // Paste your Tenant ID
    redirectUri: window.location.origin,
  },
  // ...
};
```

Replace:
- `YOUR_APP_ID_HERE` with your **Application (client) ID**
- `YOUR_TENANT_ID_HERE` with your **Directory (tenant) ID**

Example:
```javascript
const msalConfig = {
  auth: {
    clientId: "abcd1234-ef56-7890-ab12-cdefghijklmn",
    authority: "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012",
    redirectUri: window.location.origin,
  },
  // ...
};
```

## 4. (Optional) Verify Tenant-Only Access

The app is configured to only allow single-tenant access (your organization only). If you want to add API permission requirements:

1. In Azure Portal, go to your app → **API permissions**
2. Add any permissions your app needs (currently only `user.read` for display name)
3. Users will be prompted to consent on first login

## 5. Deploy & Test

- Deploy the updated `index.html` to your web server
- Users will now be prompted to sign in when they visit the page
- Only users from your tenant can access it
- All banner upload features remain the same (100% FREE)

## Troubleshooting

- **"AADSTS50020"**: Tenant mismatch. Check your Tenant ID is correct
- **"AADSTS50058"**: Silent login failed. User needs to log in via popup
- **Redirect URI error**: Make sure the redirect URI in Azure exactly matches your deployed URL

## Security Notes

- The SAS token for Azure Blob Storage is visible in the source code. This is intentional for this internal tool.
- Consider restricting the SAS token permissions if needed
- Entra ID authentication ensures only your employees can access the tool
