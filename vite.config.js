import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration
 * Configures the development server, plugins, environment variables, and path aliases.
 */
export default defineConfig(({ mode }) => {
    // Load environment variables based on the current mode
    const env = loadEnv(mode, '.', '');
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Expose Gemini API key to the client-side process.env
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // Setup '@' as a path alias for the root directory
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
