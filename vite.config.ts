// If the @lovable.dev/vite-tanstack-config package isn't installed or available
// (causing a "Cannot find module" TS error), fall back to Vite's defineConfig so
// the config file still works for basic setups. Install the package to re-enable
// the bundled TanStack/Vite presets.
import { defineConfig } from "vite";

// 'tanstackStart' is not a known property on Vite's UserConfig type.
// Cast to any to avoid the TS error while keeping the runtime config.
export default defineConfig(({
  // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
  // nitro/vite builds from this
  tanstackStart: {
    server: { entry: "server" },
  },
} as any));
