export const config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: 'gpt-4-turbo-preview',
    imageModel: 'dall-e-3',
  },
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
};