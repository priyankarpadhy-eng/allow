import type { FileSystemTree } from '@webcontainer/api';

export const viteReactTemplate: FileSystemTree = {
    'package.json': {
        file: {
            contents: JSON.stringify(
                {
                    name: 'vite-react-app',
                    private: true,
                    version: '0.0.0',
                    type: 'module',
                    scripts: {
                        dev: 'vite',
                        build: 'vite build',
                        preview: 'vite preview',
                    },
                    dependencies: {
                        react: '^18.2.0',
                        'react-dom': '^18.2.0',
                    },
                    devDependencies: {
                        '@vitejs/plugin-react': '^4.2.0',
                        vite: '^5.0.0',
                    },
                },
                null,
                2
            ),
        },
    },
    'vite.config.js': {
        file: {
            contents: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`,
        },
    },
    'index.html': {
        file: {
            contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alloy App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`,
        },
    },
    src: {
        directory: {
            'main.jsx': {
                file: {
                    contents: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`,
                },
            },
            'App.jsx': {
                file: {
                    contents: `import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#e2e8f0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '48px',
        textAlign: 'center',
        maxWidth: '420px',
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
          ⚡ Alloy
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
          Your app is running inside a WebContainer
        </p>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 32px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'transform 0.1s',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
`,
                },
            },
            'index.css': {
                file: {
                    contents: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
}
`,
                },
            },
        },
    },
};
