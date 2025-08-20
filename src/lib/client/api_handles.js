const headers = { "Content-Type": "application/json" };

async function handleResponse(res) {
  if (!res.ok) {
    return res;
  }
  return res.json();
}

const fetchWithRetry = async (url, options, retries = 3) => {
  try {
    const res = await fetch(url, options);
    return await handleResponse(res);
  } catch (err) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    return err;
  }
};
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const api_handles = {
  fetchProperties: async (options = {}) => {
    console.log("fetching.....");
    return fetchWithRetry(`${BASE_URL}/properties`, {
      method: "GET",
      headers,
      credentials: "include",
      ...options,
    });
  },
};
