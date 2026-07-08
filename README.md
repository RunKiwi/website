# Kiwi Landing Page Website (`runkiwi.dev`)

This is the codebase for the landing page of **Kiwi: The Secure Agentic Control Plane**, located at [runkiwi.dev](https://runkiwi.dev). It is designed to be modern, interactive, and optimized for speed and SEO.

---

## Interactive Features Included

1. **3D Orbiting Loop Particle Canvas**: A high-performance physics-based visualizer of the Actor-Critic TDD evaluation model running in orbit around the Cloud Sandbox, linked to local client components via the reverse tunnel. Exerts gravity pull based on mouse movement.
2. **Dynamic Caching Simulator**: An interactive simulator allowing users to toggle a representation of a developer's laptop to "Open (Connected)" or "Closed (Offline)" state. Demonstrates credential queries piping through the tunnel, secure cache loading, and loop pause/resume conditions.
3. **Responsive Glassmorphism Styling**: Fully optimized styling variables, custom glowing radial cursor boundaries, mock browser frame previews of the Kanban board, and responsive layouts for mobile and desktop screens.

---

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.

### Installation

Clone the repository and install dependencies:

```bash
# In the website project directory
npm install
```

### Running Locally

To start the Vite development server with hot reload:

```bash
npm run dev
```

This will run the server locally (typically at `http://localhost:5173`). Open the link in your browser to interact with the design.

### Building for Production

Compile and minify the static files for production delivery:

```bash
npm run build
```

This compiles all files and assets into the `dist/` directory, which is ready to serve.

---

## Free Hosting Guide

To host this website for free with custom domain configurations (`runkiwi.dev`), select one of the following methods:

### Option A: Cloudflare Pages (Recommended)

1. Sign up/Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select this repository.
4. Configure Build settings:
   * **Framework preset**: `Vite` (or None)
   * **Build command**: `npm run build`
   * **Build output directory**: `dist`
5. Click **Save and Deploy**.
6. Set up your custom domain: Go to the project page > **Custom domains** > **Set up a custom domain** > Enter `runkiwi.dev`. Cloudflare will automatically provision SSL certificates and update your DNS records.

### Option B: Vercel

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** > **Project** > Import this Git repository.
3. Vercel automatically detects the Vite config.
4. Click **Deploy**.
5. Once deployed, go to **Project Settings** > **Domains** > Add `runkiwi.dev` and map the DNS CNAME/A records as requested.

### Option C: Netlify

1. Log in to [Netlify](https://netlify.com).
2. Choose **Add new site** > **Import from Git**.
3. Select this repository, confirm build command (`npm run build`) and publish directory (`dist`).
4. Click **Deploy site**.
5. Map your custom domain under **Domain management**.
