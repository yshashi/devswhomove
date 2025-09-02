import { registerAs } from '@nestjs/config';

export default registerAs('appwrite', () => ({
  projectId: process.env.APPWRITE_PROJECT_ID,
  projectName: process.env.APPWRITE_PROJECT_NAME,
  endpoint: process.env.APPWRITE_ENDPOINT,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4200',
  apiKey: process.env.APPWRITE_API_KEY,
}));
