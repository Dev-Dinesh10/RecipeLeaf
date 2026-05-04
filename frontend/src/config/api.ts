// For Android Emulator: 10.0.2.2
// For iOS Simulator: 127.0.0.1
// For Real Device: Use your machine's local IP (e.g., 192.168.1.41)

const BASE_IP = '172.20.10.2'; // Updated to match current ipconfig
const PORT = '5000';

export const API_BASE_URL = `http://${BASE_IP}:${PORT}/api`;

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  GENERATE_RECIPE: `${API_BASE_URL}/recipes/generate`,
  CUISINES: `${API_BASE_URL}/cuisines`,
  SUGGESTED_INGREDIENTS: `${API_BASE_URL}/ingredients/suggestions`,
  UPDATE_PROFILE: `${API_BASE_URL}/auth/updatedetails`,
  GET_DASHBOARD: `${API_BASE_URL}/dashboard`,
};
