# Tadawie Health — Mobile App

Premium iOS/Android shopping app for Tadawie Health (Kuwait, KWD, English + Arabic/RTL),
connected to the existing Shopify store. Expo SDK 58 + React Native + TypeScript + Expo Router.
The Expo app lives in `apps/mobile` — see @apps/mobile/AGENTS.md for Expo-specific rules
and @docs/DEV_SETUP.md for the Windows + iPhone live-preview workflow.

## Hard rules (owner's requirements)
- Do NOT modify the live Shopify theme or production store configuration without explicit approval.
- Do NOT sign up for or activate paid services without explicit approval.
- NEVER put private API tokens in the mobile app. Only `EXPO_PUBLIC_*` client-safe values.
- Shopify is the source of truth for commerce data.
- Every user-facing string goes through i18n (`src/i18n/locales/en.ts` + `ar.ts`); layouts must work in RTL.

## Working on this project
- The developer watches changes live on an iPhone (Expo Go) via `npm start` in `apps/mobile`.
  Keep edits small and incremental so Fast Refresh shows each step; do not restart Metro unless needed.
- Add packages with `npx expo install <pkg>` (SDK-matched versions). Expo Go only has Expo's
  built-in native modules — flag clearly before adding anything that requires a development build.
- Before finishing a task run, in `apps/mobile`: `npm run check` (typecheck + lint).
- Routes only in `src/app/`; UI primitives in `src/components/ui/`; feature code in `src/features/<name>/`;
  infrastructure (Shopify clients, storage) in `src/lib/`; design tokens in `src/theme/`.
