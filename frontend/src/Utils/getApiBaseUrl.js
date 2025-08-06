const getApiBaseUrl = () => {
  if (!navigator.onLine) {
    return "http://127.0.0.1:5001";
  }

  // You can switch between dev/prod here
  return import.meta.env.VITE_API_BASE_URL || "https://your-vercel-api.vercel.app";
};

export  default getApiBaseUrl;