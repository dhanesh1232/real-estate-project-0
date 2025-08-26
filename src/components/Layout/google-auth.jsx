"use client";

import { useEffect, useRef } from "react";
import { signIn } from "next-auth/react";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export const GoogleTap = () => {
  const loaded = useRef(false);

  useEffect(() => {
    if (!CLIENT_ID) {
      console.error("Google Client ID is missing");
      return;
    }

    if (loaded.current) return;
    loaded.current = true;

    const loadGoogleScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google?.accounts?.id) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("Failed to load Google script"));
        document.head.appendChild(script);
      });
    };

    const initializeGoogleOneTap = async () => {
      try {
        await loadGoogleScript();

        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
          context: "signin",
          ux_mode: "popup",
          itp_support: true,
        });

        // Display the One Tap UI
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log("One Tap UI not displayed");
          }
        });
      } catch (error) {
        console.error("Failed to initialize Google One Tap:", error);
      }
    };

    async function handleCredentialResponse(response) {
      if (!response.credential) {
        console.error("No credential received");
        return;
      }

      try {
        const result = await signIn("credentials", {
          credential: response.credential,
          redirect: false,
        });

        if (result?.error) {
          console.error("Sign in error:", result.error);
          // Handle error - redirect to error page or show message
          window.location.href = `/auth/error?error=${encodeURIComponent(
            result.error
          )}`;
        } else if (result?.ok) {
          window.location.href = "/"; // Redirect on success
        }
      } catch (error) {
        console.error("Sign in failed:", error);
        window.location.href = `/auth/error?error=${encodeURIComponent(
          error.message
        )}`;
      }
    }

    initializeGoogleOneTap();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div>
      <div id="g_id_onload" />
      {/* Fallback button */}
      <button
        onClick={() => signIn("google")}
        style={{
          display: "none",
          padding: "10px 20px",
          backgroundColor: "#4285f4",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        id="fallback-button"
      >
        Sign in with Google
      </button>
    </div>
  );
};
