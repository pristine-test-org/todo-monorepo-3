# Jotter apps

- npm workspaces monorepo: four Vite + React 19 + TypeScript single-page apps under `apps/`
  (`jotter`, `jotter-board`, `jotter-lite`, `jotter-notes`). One `package-lock.json` at the root; run `npm install`
  there, never inside an app.
- Each app keeps its own list in the browser's localStorage through `apps/<app>/src/lib/store.ts`.
  There is no server and no database.
- Each app has its own look: plain CSS in `apps/<app>/src/index.css` with the tokens from that
  app's `DESIGN.md`. Don't share styles between apps and don't add a UI library.
- Each app is its own Vercel project whose root directory is `apps/<app>`.
- Checks: `npm run build`, `npm run lint` and `npm run typecheck` at the root run all four;
  `npm run build -w <app>` runs one.
