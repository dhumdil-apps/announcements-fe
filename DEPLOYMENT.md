# Deployment Guide - Coolify

This guide explains how to deploy the Announcements Frontend application to [Coolify](https://coolify.io/).

## Prerequisites

- A Coolify instance (self-hosted or managed)
- Access to your Git repository (GitHub, GitLab, or Bitbucket)
- Your backend API URL and WebSocket URL

## Step 1: Create a New Resource

1. Log in to your Coolify dashboard
2. Navigate to your project or create a new one
3. Click **+ Add Resource** → **Application**
4. Select your Git provider and connect your repository

## Step 2: Configure Build Settings

This project includes a multi-stage `Dockerfile` that builds the app and serves it with nginx (~25MB final image).

| Setting    | Value        |
| ---------- | ------------ |
| Build Pack | `Dockerfile` |
| Port       | `80`         |

The Dockerfile handles the build process automatically - no additional build commands needed.

## Step 3: Configure Environment Variables

Add the following environment variables in the **Environment Variables** section. Mark them as **Build Variable** since they are baked into the app at compile time:

| Variable       | Description                                      | Example                       |
| -------------- | ------------------------------------------------ | ----------------------------- |
| `VITE_API_URL` | Backend API base URL                             | `https://api.example.com/api` |
| `VITE_WS_URL`  | WebSocket server URL for real-time notifications | `wss://api.example.com`       |

**Important:** These must be set as **Build Variables** in Coolify (not runtime variables) because Vite bakes them into the JavaScript bundle during build.

## Step 4: Configure Domain

1. Go to the **Domains** section
2. Add your custom domain (e.g., `announcements.example.com`)
3. Coolify will automatically configure:
   - Traefik reverse proxy
   - SSL certificate via Let's Encrypt

## Step 5: Deploy

1. Click **Deploy** to trigger the first deployment
2. Coolify will:
   - Clone your repository
   - Install dependencies (`npm ci`)
   - Build the application (`npm run build`)
   - Serve the static files from `dist/`

## Auto-Deploy

Auto-deploy is enabled by default. When you push to your configured branch, Coolify will automatically redeploy your application.

To disable auto-deploy:

1. Go to **Settings**
2. Toggle off **Auto Deploy**

## Preview Deployments

Coolify supports preview deployments for pull requests:

1. Enable **Preview Deployments** in settings
2. Configure the preview URL template (default: `{{pr_id}}.{{domain}}`)
3. When a PR is opened, a preview environment is created automatically

Example: PR #123 with domain `announcements.example.com` → `123.announcements.example.com`

## Troubleshooting

### Build Fails

- Check that `package-lock.json` exists in the repository
- Verify Node.js version compatibility (check `engines` in `package.json`)
- Review build logs for specific errors

### Environment Variables Not Working

- Ensure variables are prefixed with `VITE_`
- Remember that environment variables are baked in at build time
- Trigger a new deployment after changing environment variables

### 404 on Page Refresh (SPA Routing)

The included `nginx.conf` already handles SPA routing with `try_files`. If you're not using the Dockerfile approach, create a `_redirects` file in `public/`:

```
/*    /index.html   200
```

## Useful Commands

```bash
# Test production build locally
npm run build
npm run preview

# Check for build errors
npm run check
```

## Resources

- [Coolify Vite Documentation](https://coolify.io/docs/applications/vite)
- [Coolify Applications Guide](https://coolify.io/docs/applications/)
- [Coolify Examples Repository](https://github.com/coollabsio/coolify-examples)
