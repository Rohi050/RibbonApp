# Tadawie Mobile — Development Setup (Windows + iPhone)

Goal: run the app on your **iPhone** (and optionally an **Android emulator** side by side)
and watch it update instantly — Expo **Fast Refresh** — every time code changes.

```
 Windows PC                                   iPhone (same Wi-Fi)
 ┌───────────────────────────────┐            ┌──────────────────┐
 │ npm start  (Metro dev server) │──Wi-Fi────▶│ Expo Go          │
 │   watches apps/mobile/src     │            └──────────────────┘
 │                               │            ┌──────────────────┐
 │                               │──local────▶│ Android emulator │
 └───────────────────────────────┘            └──────────────────┘
        ▲ code edits (by Claude / you)  →  Fast Refresh in < 1 s
```

---

## 1. One-time installs on Windows (all free)

| Tool | Get it | Check |
|---|---|---|
| Node.js **22 LTS** | https://nodejs.org (LTS installer, keep defaults) | `node -v` → `v22.x` |
| Git | https://git-scm.com/download/win | `git --version` |
| VS Code (recommended) | https://code.visualstudio.com | — |

Open a **new** PowerShell window after installing so the PATH updates.

## 2. Get the code

```powershell
cd $HOME\Documents
git clone https://github.com/Rohi050/RibbonApp.git
cd RibbonApp
git checkout claude/tadawie-mobile-app-94tk3k
cd apps\mobile
npm install
```

## 3. Install Expo Go on your iPhone

App Store → **Expo Go** (free). The project uses **Expo SDK 58**; Expo Go from the App Store
always runs the latest SDK. If Expo Go ever says *"Project is incompatible with this version
of Expo Go"*, update Expo Go from the App Store.

## 4. Start the dev server and connect the iPhone

```powershell
cd $HOME\Documents\RibbonApp\apps\mobile
npm start
```

1. A QR code appears in the terminal.
2. Make sure the iPhone and PC are on the **same Wi-Fi**.
3. Open the iPhone **Camera**, point it at the QR code, tap the **"Open in Expo Go"** banner.
4. First load takes ~10–30 s (bundling). You should see the Tadawie welcome screen.

**First-run prompts**
- iPhone asks *"Expo Go would like to find devices on your local network"* → **Allow**.
- Windows Defender Firewall asks about **Node.js** → tick **Private networks** → **Allow**.

### Try Fast Refresh now
Open `apps/mobile/src/i18n/locales/en.ts`, change `'Start shopping'` to anything, save —
the button on your phone changes in under a second without losing screen state.
Tap **العربية** on the screen: the layout mirrors to right-to-left instantly.

### If the phone can't connect (spinner / "Could not connect to the server")
Try these in order:
1. Windows: **Settings → Network & Internet → Wi-Fi → your network → Network profile = Private**.
2. Check the firewall allowed Node: *Windows Security → Firewall → Allow an app* → `Node.js` ✔ Private.
3. Some routers/office Wi-Fi block devices talking to each other. Use the tunnel instead:
   ```powershell
   npm run tunnel
   ```
   (Free; installs `@expo/ngrok` the first time. Slightly slower, works on any network.)
4. Phone hotspot trick: connect the PC to the iPhone's Personal Hotspot, then `npm start`.

### Useful keys in the Metro terminal
| Key | Action |
|---|---|
| `r` | Reload app on all connected devices |
| `a` | Open on Android emulator |
| `j` | Open the JS debugger |
| `m` | Toggle the developer menu on devices |
| shake iPhone | Developer menu (reload, performance monitor, element inspector) |

---

## 5. Android emulator side by side (optional, free)

Requirements: 16 GB RAM recommended; **virtualization enabled** in BIOS (usually on).

1. Install **Android Studio**: https://developer.android.com/studio (default options; it installs the Android SDK + emulator).
2. Android Studio → **More Actions → Virtual Device Manager → Create device**
   → *Pixel 8* → system image **API 35 or 36 (x86_64, Google Play)** → Finish.
3. Set environment variables (PowerShell, once), then open a **new** terminal:
   ```powershell
   [Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")
   $p = [Environment]::GetEnvironmentVariable("Path","User")
   [Environment]::SetEnvironmentVariable("Path", "$p;$env:LOCALAPPDATA\Android\Sdk\platform-tools;$env:LOCALAPPDATA\Android\Sdk\emulator", "User")
   ```
   Check: `adb --version`
4. Start the emulator (▶ in Device Manager), then in the Metro terminal press **`a`**.
   Expo installs Expo Go on the emulator automatically and opens the app.

Now the iPhone and the emulator are both connected to the same Metro server — every save
refreshes both. Toggle the emulator into Arabic to test RTL on Android too.

---

## 6. Watching Claude develop live

Claude edits code; Metro on **your PC** must see the change for Fast Refresh to fire.

**Option A — Claude Code runs on your PC (best, truly instant).**
Open this folder with the Claude desktop app (Claude Code) or `claude` CLI on Windows.
Edits land directly in your files → phone updates immediately.

**Option B — Claude works in the cloud and pushes; your PC auto-pulls.**
Keep `npm start` running, and in a second PowerShell window from the repo root:
```powershell
powershell -ExecutionPolicy Bypass -File scripts\sync-from-claude.ps1
```
Every push appears on your phone a few seconds later. If the script says dependencies
changed, stop `npm start` (Ctrl+C) and start it again.

---

## 7. When Expo Go is no longer enough → Development build

Expo Go only contains Expo's built-in native modules. When we add **Shopify Checkout Kit**
and **push notifications**, we switch to a *development build*: your own "Expo Go" containing
Tadawie's native code — Fast Refresh keeps working exactly the same.

- No Mac needed: builds run on **EAS Build** (Expo's cloud; free tier is enough for development).
- Requires an **Apple Developer Program** membership (USD 99/year) to install on a physical iPhone
  — **paid, will not be set up without your approval**.
- Profiles are already defined in `apps/mobile/eas.json` (`development`, `preview`, `production`).
- Android development builds need no paid account and can be installed on the emulator.

---

## 8. Quality commands (run from `apps/mobile`)

```powershell
npm run typecheck   # TypeScript, strict mode
npm run lint        # ESLint (eslint-config-expo + Prettier)
npm run check       # both
npm run format      # Prettier write
npm run doctor      # expo-doctor dependency/config health check
```
