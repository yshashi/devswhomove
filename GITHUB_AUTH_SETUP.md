# GitHub Authentication Setup Guide

This guide will help new contributors set up GitHub OAuth authentication for the DevsWhoRun backend API.

## Overview

The backend uses **Appwrite** as the authentication service with GitHub OAuth integration. The authentication flow is implemented using NestJS with the following components:

### Backend Architecture

```
backend/devswhorun-api/src/app/
├── controllers/
│   └── auth.controller.ts          # Authentication endpoints
├── services/
│   └── appwrite.service.ts         # Appwrite client integration
├── dto/
│   └── auth.dto.ts                 # Data transfer objects
├── config/
│   └── appwrite.config.ts          # Configuration management
└── app.module.ts                   # Module registration
```

## Prerequisites

1. **Node.js** (version 20.19.0 or higher)
2. **Yarn** package manager
3. **Appwrite Cloud account** or self-hosted Appwrite instance
4. **GitHub OAuth App** (for GitHub authentication)

## Step 1: Create Appwrite Project

### Option A: Appwrite Cloud (Recommended)
1. Go to [Appwrite Cloud](https://cloud.appwrite.io/)
2. Create a new account or sign in
3. Create a new project
4. Note down your:
   - Project ID
   - API Endpoint (usually `https://cloud.appwrite.io/v1`)

### Option B: Self-hosted Appwrite
1. Follow [Appwrite installation guide](https://appwrite.io/docs/installation)
2. Set up your Appwrite instance
3. Create a new project
4. Note down your:
   - Project ID
   - API Endpoint (your Appwrite instance URL + `/v1`)

## Step 2: Configure GitHub OAuth in Appwrite

1. **In your Appwrite Console:**
   - Navigate to **Auth** → **Settings**
   - Scroll down to **OAuth2 Providers**
   - Enable **GitHub** provider
   - You'll need to configure the GitHub OAuth app (next step)

2. **Create GitHub OAuth App:**
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in the details:
     - **Application name**: `DevsWhoRun`
     - **Homepage URL**: `http://localhost:4200` (for development)
     - **Authorization callback URL**: `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/github/[PROJECT_ID]`
       - Replace `[PROJECT_ID]` with your actual Appwrite project ID
       - If using self-hosted Appwrite, replace the domain accordingly

3. **Configure GitHub OAuth in Appwrite:**
   - Copy the **Client ID** and **Client Secret** from your GitHub OAuth app
   - In Appwrite Console, paste these values in the GitHub OAuth provider settings
   - Save the configuration

## Step 3: Get Appwrite API Key

1. In Appwrite Console, go to **Overview** → **Integrations**
2. Click **API Keys** → **Create API Key**
3. Configure the key:
   - **Name**: `DevsWhoRun Backend`
   - **Expiration**: Set appropriate expiration (or never)
   - **Scopes**: Select the following scopes:
     - `sessions.read`
     - `sessions.write`
     - `users.read`
     - `users.write`
4. Copy the generated API key (you won't see it again!)

## Step 4: Environment Configuration

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Update your `.env` file:**
   ```env
   # Appwrite Configuration
   APPWRITE_PROJECT_ID=your_project_id_here
   APPWRITE_PROJECT_NAME=DevsWhoRun
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_API_KEY=your_api_key_here

   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:4200
   ```

3. **Replace the placeholder values:**
   - `your_project_id_here`: Your Appwrite project ID
   - `your_api_key_here`: The API key you generated in Step 3
   - Update `APPWRITE_ENDPOINT` if using self-hosted Appwrite

## Step 5: Install Dependencies and Run

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Build the backend:**
   ```bash
   npm run build
   ```

3. **Start the backend server:**
   ```bash
   npm run start
   ```

4. **Verify the setup:**
   ```bash
   curl http://localhost:3001/health
   ```
   You should see: `{"status":"ok","timestamp":"..."}`

## Step 6: Test GitHub Authentication

The backend provides the following authentication endpoints:

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/github/login` | Initiate GitHub OAuth flow |
| POST | `/auth/exchange-secret` | Exchange OAuth callback for session |
| POST | `/auth/profile` | Get user profile |
| POST | `/auth/logout` | Logout user |
| POST | `/auth/verify` | Verify session validity |
| GET | `/health` | Health check endpoint |

### Testing the OAuth Flow

1. **Initiate GitHub login:**
   ```bash
   curl -X POST http://localhost:3001/auth/github/login \
     -H "Content-Type: application/json" \
     -d '{
       "successUrl": "http://localhost:4200/auth/callback?success=true",
       "failureUrl": "http://localhost:4200/auth/callback?error=true"
     }'
   ```

2. **Expected response:**
   ```json
   {
     "success": true,
     "message": "GitHub OAuth URL created successfully",
     "data": {
       "oauthUrl": "https://github.com/login/oauth/authorize?..."
     }
   }
   ```

3. **Visit the OAuth URL** in your browser to test the complete flow

## Authentication Flow Diagram

```
Frontend                 Backend                 Appwrite                GitHub
   |                        |                       |                      |
   |-- POST /auth/github/login ------------------>  |                      |
   |                        |-- createOAuth2Token ->|                      |
   |                        |<- OAuth URL ----------|                      |
   |<- OAuth URL -----------|                       |                      |
   |                        |                       |                      |
   |-- Redirect to GitHub OAuth URL --------------->|-------------------->|
   |                        |                       |                      |
   |<- Redirect with code --|<- Callback with code -|<--------------------|
   |                        |                       |                      |
   |-- POST /auth/exchange-secret ----------------->|                      |
   |                        |-- createSession ----->|                      |
   |                        |<- Session + User -----|                      |
   |<- Session Token -------|                       |                      |
```

## Troubleshooting

### Common Issues

1. **"Appwrite configuration is missing" warning:**
   - Check your `.env` file exists and has correct values
   - Verify environment variables are loaded properly

2. **OAuth callback URL mismatch:**
   - Ensure the callback URL in GitHub OAuth app matches your Appwrite project
   - Format: `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/github/[PROJECT_ID]`

3. **CORS errors:**
   - Verify `FRONTEND_URL` in `.env` matches your frontend URL
   - Check Appwrite project settings for allowed origins

4. **API Key permissions:**
   - Ensure your API key has the required scopes (sessions, users)
   - Check if the key hasn't expired

### Debug Logging

The backend includes detailed logging. Check the console output for:
- Appwrite client initialization status
- Environment variable loading
- Authentication flow errors

### Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `APPWRITE_PROJECT_ID` | Yes | Your Appwrite project ID | `64a1b2c3d4e5f6g7h8i9` |
| `APPWRITE_ENDPOINT` | Yes | Appwrite API endpoint | `https://cloud.appwrite.io/v1` |
| `APPWRITE_API_KEY` | Yes | Server API key with required scopes | `standard_abc123...` |
| `APPWRITE_PROJECT_NAME` | No | Project name for reference | `DevsWhoRun` |
| `PORT` | No | Backend server port | `3001` |
| `NODE_ENV` | No | Environment mode | `development` |
| `FRONTEND_URL` | No | Frontend URL for CORS | `http://localhost:4200` |

## Security Considerations

1. **Never commit `.env` files** to version control
2. **Use different Appwrite projects** for development and production
3. **Rotate API keys regularly** in production
4. **Set appropriate OAuth callback URLs** for each environment
5. **Use HTTPS** in production environments

## Development vs Production

### Development Setup
- Use `http://localhost:4200` for frontend URL
- OAuth callback: `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/github/[DEV_PROJECT_ID]`
- Set `NODE_ENV=development`

### Production Setup
- Use your production domain for frontend URL
- OAuth callback: `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/github/[PROD_PROJECT_ID]`
- Set `NODE_ENV=production`
- Use environment-specific API keys

## Contributing

When contributing to the authentication system:

1. **Test both success and failure scenarios**
2. **Update this documentation** if you change the auth flow
3. **Follow the existing error handling patterns**
4. **Add appropriate logging** for debugging
5. **Validate input data** using the existing DTOs

## Support

If you encounter issues:

1. Check the [Appwrite Documentation](https://appwrite.io/docs)
2. Review the backend logs for detailed error messages
3. Verify your environment configuration
4. Test the health endpoint to ensure the backend is running

For project-specific issues, please create an issue in the repository with:
- Your environment configuration (without sensitive values)
- Error logs from the backend
- Steps to reproduce the issue
