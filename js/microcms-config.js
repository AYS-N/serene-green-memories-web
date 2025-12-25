export function getMicrocmsConfig() {
  const env = (import.meta && import.meta.env) ? import.meta.env : {};
  const runtimeConfig = window.__MICROCMS__ || {};
  return {
    serviceDomain: env.VITE_MICROCMS_SERVICE_DOMAIN || runtimeConfig.serviceDomain || '',
    apiKey: env.VITE_MICROCMS_API_KEY || runtimeConfig.apiKey || '',
  };
}
