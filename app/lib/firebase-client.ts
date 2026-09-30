"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getToken, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

let appCheckInstance: ReturnType<typeof initializeAppCheck> | undefined;

export async function getFridayAppCheckToken() {
  const app = getApps().length ? getApp() : initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });

  appCheckInstance ??= initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY!),
    isTokenAutoRefreshEnabled: true,
  });
  const token = await getToken(appCheckInstance);
  if (!token.token) throw new Error("Could not verify this app.");
  return token.token;
}

export function getFridayEndpoint() {
  const endpoint = process.env.NEXT_PUBLIC_FRIDAY_FUNCTION_URL;
  if (!endpoint) throw new Error("FRIDAY's Firebase endpoint is not configured.");
  return endpoint;
}
