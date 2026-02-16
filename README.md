# Alloy IDE

**Alloy IDE** is a Hackathon-ready Cloud IDE built on top of **OpenVSCode Server** (Docker) with custom AI Agent integration.

## Features

- **🐳 Docker Backend**: Full VS Code environment running locally via Docker.
- **🤖 AI Agents**: Custom "Mission Control" sidebar to prompt AI agents that write code directly to your project.
- **🎨 Rebranded**: Custom "Alloy" branding replacing standard VS Code UI.
- **🔌 Extension-based**: UI panels are delivered via a native VS Code extension.

## Setup

See [SETUP.md](./SETUP.md) for detailed installation and replication instructions.

## Quick Start

1.  **Clone**: `git clone https://github.com/priyankarpadhy-eng/allow.git`
2.  **Start Docker**: `docker run -p 3001:3000 ...` (See SETUP.md)
3.  **Start UI**: `npm run dev` (in `multiagent-app`)
4.  **Open**: http://localhost:3001
