"use client";

import { useSearchParams } from "next/navigation";

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "An authentication error occurred";

  // Map common OAuth error codes to user-friendly messages
  switch (error) {
    case "Configuration":
      errorMessage = "There is a problem with the server configuration.";
      break;
    case "AccessDenied":
      errorMessage = "Access was denied. Please try again.";
      break;
    case "Verification":
      errorMessage = "The verification failed. Please try again.";
      break;
    case "OAuthSignin":
      errorMessage = "Error during sign in attempt. Please try again.";
      break;
    case "OAuthCallback":
      errorMessage = "Error during authentication callback. Please try again.";
      break;
    case "default":
      errorMessage = "An unexpected authentication error occurred.";
      break;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-700">{errorMessage}</p>
        <p className="text-sm text-gray-500 mt-2">Error code: {error}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
