const normalizeBoolean = (value, fallback = true) => {
  if (value === undefined) {
    return fallback;
  }

  return value === 'true';
};

export const env = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  authServerUrl: process.env.REACT_APP_AUTH_SERVER_URL || 'http://localhost:4001',
  dashboardSummaryPath:
    process.env.REACT_APP_DASHBOARD_SUMMARY_PATH || '/dashboard/summary',
  useMockDashboard: normalizeBoolean(process.env.REACT_APP_USE_MOCK_DASHBOARD, true),
  categoryListPath:
    process.env.REACT_APP_CATEGORY_LIST_PATH || '/category/list',
  serviceListPath:
    process.env.REACT_APP_SERVICE_LIST_PATH || '/service/list',
  useMockServices: normalizeBoolean(process.env.REACT_APP_USE_MOCK_SERVICES, true),
  useMockAuth: normalizeBoolean(process.env.REACT_APP_USE_MOCK_AUTH, true),
};

export function buildApiUrl(path) {
  const baseUrl = env.apiUrl.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
