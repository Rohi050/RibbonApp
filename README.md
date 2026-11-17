# Tadawie Health — Mobile App

Premium iOS & Android shopping app for [Tadawie Health](https://www.tadawiehealth.com),
built with **React Native + Expo (SDK 58) + TypeScript + Expo Router**.
Shopify remains the source of truth for all commerce data.

👉 **Getting started on Windows + iPhone: [docs/DEV_SETUP.md](docs/DEV_SETUP.md)**

```powershell
cd apps\mobile
npm install
npm start          # scan the QR code with your iPhone camera → opens in Expo Go
```

## Repository layout

```
.
├── apps/
│   └── mobile/                 Expo app (iOS + Android)
│       ├── src/
│       │   ├── app/            Routes only (Expo Router: every file = a screen)
│       │   ├── components/ui/  Design-system primitives (Text, Button, …)
│       │   ├── features/       Feature modules: catalog, search, cart, account, wishlist…
│       │   ├── lib/            Infrastructure: Shopify clients, storage, analytics
│       │   ├── hooks/          Shared React hooks
│       │   ├── i18n/           English / Arabic strings + RTL helpers
│       │   └── theme/          Design tokens (colours, spacing, type) + useTheme
│       ├── app.json            Expo config (name, bundle IDs, plugins, RTL support)
│       └── eas.json            Cloud build profiles (dev build / preview / production)
├── docs/                       Setup guides and architecture notes
└── scripts/                    Developer helper scripts (Windows auto-sync)
```

Planned later: `apps/dashboard` (push-notification campaign dashboard) and `backend/`
(secure server functions — private tokens live only there, never in the app).

## Conventions
- Import app code via the `@/` alias (`import { Button } from '@/components/ui'`).
- Never put private API tokens in the app. Only `EXPO_PUBLIC_*` client-safe values in `.env`.
- Add native packages with `npx expo install <pkg>` so versions match the SDK.
- Run `npm run check` (typecheck + lint) before committing.
