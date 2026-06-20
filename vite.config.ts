import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { pathToFileURL } from "url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables so that process.env.GEMINI_API_KEY is available locally
  const env = loadEnv(mode, process.cwd(), '');
  
  // Set the environment variables in process.env so the dynamically imported api/chat.js can access them
  for (const key in env) {
    process.env[key] = env[key];
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      {
        name: 'api-chat-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/chat' && req.method === 'POST') {
              try {
                // Read chunks of the request body
                const chunks: any[] = [];
                req.on('data', chunk => chunks.push(chunk));
                req.on('end', async () => {
                  try {
                    const bodyText = Buffer.concat(chunks).toString();
                    const body = bodyText ? JSON.parse(bodyText) : {};
                    
                    // Attach body to request object as Vercel does
                    (req as any).body = body;

                    // Mock Vercel response helper functions
                    const responseMock = {
                      statusCode: 200,
                      headers: {} as Record<string, string | string[]>,
                      setHeader(name: string, value: string | string[]) {
                        this.headers[name] = value;
                        res.setHeader(name, value);
                        return this;
                      },
                      status(code: number) {
                        this.statusCode = code;
                        res.statusCode = code;
                        return this;
                      },
                      json(data: any) {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(data));
                        return this;
                      },
                      end(data?: any) {
                        res.end(data);
                        return this;
                      }
                    };

                    // Dynamically import the api/chat handler using pathToFileURL to prevent Windows scheme issues
                    const chatModuleUrl = pathToFileURL(path.resolve(process.cwd(), './api/chat.js')).href;
                    const chatModule = await import(chatModuleUrl);
                    await chatModule.default(req, responseMock);
                  } catch (err: any) {
                    console.error('Error handling local /api/chat:', err);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
                  }
                });
              } catch (err: any) {
                console.error('Error starting middleware body parse:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
              }
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
