export const CONFIG = {
  API_KEY: "zenegyLCyePOpy2bwyrnHqYWnkFp4YJiJ43gep9l",
  apiUrl: 'https://my-app.vercel.app',
  timeout: 5000,
  retries: 3,
};

// Default export (optional) todo
// export default {
//   API_URL,
//   APP_CONFIG,
//   ENDPOINTS,
//   THEME,
//   FEATURES,
// };

// Feature Flags
// export const FEATURES = {
//   enableComments: true,
//   enableSharing: true,
//   enableNotifications: false,
//   enableDarkMode: true,
// };

// API Endpoints
// export const ENDPOINTS = {
//   bills: `${API_URL}/api/bills`,
//   login: `${API_URL}/api/auth/login`,
//   register: `${API_URL}/api/auth/register`,
//   upload: `${API_URL}/api/upload`,
// };

// Environment detection
export const __DEV__ = process.env.NODE_ENV === 'development';

// API URLs
export const API_URL = __DEV__ 
  ? 'http://localhost:3000'
  : 'https://my-app.vercel.app';
