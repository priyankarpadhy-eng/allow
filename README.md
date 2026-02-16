# Alloy IDE

**Alloy IDE** is a Hackathon-ready Cloud IDE built on top of **OpenVSCode Server** (Docker) with custom AI Agent integration.

## 🚀 Access the IDE

**http://localhost:3001**
*(This is your main entry point. It includes VS Code + Alloy Extension)*

---

## ✨ Features

### 1. **Native VS Code Environment**
Running inside Docker, accessible via browser. Full terminal access, extensions, and file system control.

### 2. **Alloy Mission Control (Extension)**
Custom sidebar extension providing:
- **🤖 AI Agents**: Spawn agents to write code for you.
- **💬 Room Feed**: Real-time chat with your team and agents.
- **👥 Team Presence**: See who is online and what they are editing.
- **🛡️ Permissions**: Granular read/write/admin roles for team members.

### 3. **Real-time Collaboration**
- **Live Editing**: See what file your teammates are working on.
- **Status Indicators**: Online/Busy/Offline states.

---

## 🛠️ Quick Start

1.  **Clone**: `git clone https://github.com/priyankarpadhy-eng/allow.git`
2.  **Start Docker**:
    ```bash
    docker run -d --name openvscode-server --init -p 3001:3000 -v "$(pwd):/home/workspace:cached" gitpod/openvscode-server
    ```
3.  **Start UI Service** (Background):
    ```bash
    cd multiagent-app
    npm run dev
    ```
4.  **Open Browser**:
    Go to **http://localhost:3001**

---

## 🔧 Architecture

- **Port 3001**: Main IDE (OpenVSCode Server)
- **Port 3000**: Background UI Service (Next.js) - *Used internally by the extension*

> **Note**: For setup details, see [SETUP.md](./SETUP.md).
