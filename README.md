# Pankaj Bhardwaj — Telegram Landing Page (React)

## Run karne ke liye

```bash
npm install
npm run dev
```

`http://localhost:5173` khol lo.

## Production build

```bash
npm run build
```

`dist/` folder deploy-ready hai (Vercel/Netlify pe seedha daal sakte ho).

## ⚠️ Zaroori — `npm audit fix --force` MAT chalana

Is project mein `vite` aur `@vitejs/plugin-react` ke versions jaan-bujhkar pin kiye hain kyunki
`--force` upgrade se dono ke beech version-mismatch aa jaata hai aur build fail ho jaata hai
(`ERESOLVE could not resolve`). Agar `npm audit` warning dikhaye to usse ignore kar sakte ho —
ye sirf dev-server se related hai, production build ko affect nahi karta.

## Kya dynamic hai (live update hota rehta hai)

- **Top ticker bar** (NIFTY, BANK NIFTY, SENSEX, FIN NIFTY, VIX) — har 3 second mein halka sa
  jitter hota hai, jaise real market feed
- **"X traders online now"** — har 3.5 second mein thoda upar-neeche hota hai
- **"X people joined today"** — dheere-dheere badhta rehta hai
- **Bottom-left "Joined Telegram channel" card** — har ~4 second mein naya naam/city dikhata hai
  (list `src/App.jsx` mein `JOIN_FEED` constant mein hai, wahan se edit kar sakte ho)

## Design

Bilkul original page jaisa hi hai — koi style change nahi kiya. Bas thoda animation polish
add kiya: ticker numbers update hone pe halka "pop" effect, join-card slide-in animation, aur
poore hero section ka fade-in-up entrance jab page load ho.

## Note

- Telegram link: `https://t.me/+erDP7BDVP-5jZTc1`
- Avatar image seedha `https://i.ibb.co/...` se load ho rahi hai (jaisa original mein tha)
