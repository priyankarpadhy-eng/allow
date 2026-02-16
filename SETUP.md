# Alloy IDE — Setup & Replication Guide

This guide details how to set up the **Alloy IDE** (a rebranded OpenVSCode Server with custom AI agents) from scratch.

## Prerequisites

- **Docker Desktop** (Running with Linux containers)
- **Node.js** (v18+)
- **Git**

## 1. Project Setup

Clone the repository and install dependencies for the Next.js frontend.

```bash
cd multiagent-app
npm install
```

## 2. Start the Backend (Docker)

We use **OpenVSCode Server** as the backend. Run it on port `3001` and mount the current directory.

```bash
# Run from the project root (alloy-ide)
docker run -d --name openvscode-server --init -p 3001:3000 -v "$(pwd):/home/workspace:cached" gitpod/openvscode-server
```

> **Note**: This mounts your current folder to `/home/workspace` inside Docker.

## 3. Build & Install the Alloy Extension

The custom "Alloy" sidebar is a VS Code extension located in `multiagent-app/vscode-extension`.

### Build the Extension
```bash
cd multiagent-app/vscode-extension
npm install
npm run package
# This creates alloy-vscode-0.1.0.vsix
```

### Install into Docker
Copy the `.vsix` file to a location visible to Docker (e.g., project root), then install it:

```bash
# Copy to root (mapped to /home/workspace)
cp alloy-vscode-0.1.0.vsix ../../alloy-vscode-0.1.0.vsix

# Install inside container
docker exec openvscode-server /home/.openvscode-server/bin/openvscode-server --install-extension /home/workspace/alloy-vscode-0.1.0.vsix
```

## 4. Rebrand the IDE (Hackathon Mode)

To change "VS Code" branding to "Alloy IDE", run the provided script inside the container.

```bash
# 1. Ensure scripts/rebrand.sh exists and is accessible
# 2. Run the script inside Docker
docker exec openvscode-server sh /home/workspace/multiagent-app/scripts/rebrand.sh

# 3. Restart the container to apply changes
docker restart openvscode-server
```

## 5. Run the Application

1. **Start Next.js Frontend** (Provides the UI panels):
   ```bash
   cd multiagent-app
   npm run dev
   ```
   *Runs on http://localhost:3000*

2. **Open Alloy IDE**:
   Open **http://localhost:3001** in your browser.

## Architecture Overview

- **Frontend**: Next.js app serving `/embed/agents` and `/embed/feed`.
- **Backend**: OpenVSCode Server (Docker) serving the IDE.
- **Integration**: `alloy-vscode` extension embeds the frontend pages into the backend sidebar.
- **Communication**: AI Agents use `POST /api/filesystem` (on port 3000) to write files to the host disk, which syncs to Docker via the volume mount.
