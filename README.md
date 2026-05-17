# Jessica's Garage

Snap a photo. AI lists it. You get paid.

## Run locally

```bash
npm install
npm run dev
```

Vite will print two URLs. Open the `https://192.168.x.x:5173` one on your phone (same Wi-Fi) — your browser will warn about a self-signed cert, tap "advanced" → "proceed" once and you're in. The HTTPS is what lets the camera work on mobile.

## Build for production

```bash
npm run build
```

## Stack

- React 18 + Vite
- Single-file styling in `src/styles.css`
