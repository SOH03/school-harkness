#!/usr/bin/env node
/**
 * Post-build prerender script for TanStack Start → Firebase Hosting.
 *
 * 1. Starts the Nitro SSR server built with `preset: "node-server"`.
 * 2. Fetches each route and saves the HTML to `dist/client/<route>.html`.
 * 3. Stops the server.
 *
 * The resulting `dist/client/` folder is a static site ready for Firebase Hosting.
 */

import { spawn } from "node:child_process";
import { writeFile, mkdir } from "node:fs/promises";

const PORT = process.env.PORT || "3456";
const SERVER_PATH = "./dist/server/index.mjs";

// Routes to prerender. Add more slugs here if you create new event pages.
const routes = ["/"];

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function startServer() {
  const proc = spawn("node", [SERVER_PATH], {
    env: { ...process.env, PORT, NITRO_PORT: PORT },
    stdio: "pipe",
  });

  // Wait until we see the "Listening on" message
  await new Promise((resolve, reject) => {
    const onData = (data) => {
      const text = data.toString();
      if (text.includes("Listening on")) {
        proc.stdout.off("data", onData);
        proc.stderr.off("data", onData);
        resolve();
      }
    };
    proc.stdout.on("data", onData);
    proc.stderr.on("data", onData);

    const timeout = setTimeout(() => {
      proc.stdout.off("data", onData);
      proc.stderr.off("data", onData);
      reject(new Error("Server did not start within 10s"));
    }, 10000);

    proc.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });

  return proc;
}

async function fetchRoute(path) {
  const url = `http://localhost:${PORT}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

async function main() {
  console.log("➜ Starting SSR server for prerendering...");
  const server = await startServer();
  console.log(`➜ Server ready on port ${PORT}`);

  try {
    for (const route of routes) {
      console.log(`➜ Prerendering ${route} ...`);
      const html = await fetchRoute(route);

      const outPath =
        route === "/"
          ? "dist/client/index.html"
          : `dist/client${route}.html`;

      await mkdir(outPath.split("/").slice(0, -1).join("/"), { recursive: true });
      await writeFile(outPath, html);
      console.log(`  ✓ Saved ${outPath}`);
    }
  } finally {
    console.log("➜ Stopping SSR server...");
    server.kill("SIGTERM");
    await new Promise((res) => server.on("exit", res));
  }

  console.log("✓ Prerender complete. `dist/client/` is ready for Firebase Hosting.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
