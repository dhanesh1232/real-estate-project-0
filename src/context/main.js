"use client";

import { api_handles } from "@/lib/client/api_handles";
import { createContext, useCallback, useEffect, useState } from "react";

// Create context for managing global state
export const useMainContext = createContext();

const API_CONSTAINS = {
  ideal: "IDEAL",
  inProgress: "IN_PROGRESS",
  failed: "FAILED",
  success: "SUCCESS",
};
export const MainProvider = ({ children }) => {
  // State for managing API data and loading states
  const [fetchData, setFetchData] = useState({});
  const [status, setStatus] = useState(false);

  const fetchProperties = useCallback(async () => {
    try {
      const response = await api_handles.fetchProperties();
      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
    }
  });
  useEffect(() => {
    fetchProperties();
  });

  // Context value object containing all state and functions
  const contextValue = {
    fetchData,
    status,
  };

  return (
    <useMainContext.Provider value={contextValue}>
      {children}
    </useMainContext.Provider>
  );
};
