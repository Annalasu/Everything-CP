export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
    imageModel: import.meta.env.VITE_OPENAI_IMAGE_MODEL || 'dall-e-3',
  },
  siliconFlow: {
    apiKey: import.meta.env.VITE_SILICON_FLOW_KEY || '',
    enabled: import.meta.env.VITE_USE_SILICON_FLOW === 'true',
  },
  sitePassword: import.meta.env.VITE_SITE_PASSWORD || '',
};