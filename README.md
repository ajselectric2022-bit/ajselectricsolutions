# AJ's Electric Inc. — Marketing Website

Static, mobile-first marketing site for **AJ's Electric Inc.** (Kings Beach / North Lake Tahoe).

- **Live domain:** [ajselectricsolutions.com](https://ajselectricsolutions.com) (already owned)
- **Owner:** Anthony Jimenez
- **Phone:** (530) 386-2191 (call & text)
- **License:** CA C-10 #1094196 — bonded & insured
- **Instagram:** [@AJSELECTRIC22](https://www.instagram.com/AJSELECTRIC22/)

No build step, no paid services, no frameworks — just HTML + CSS (+ a one-line year script).

## Files

| File | Purpose |
|------|---------|
| `index.html` | Single-page site |
| `styles.css` | Responsive styles (dark navy / electric blue / white) |
| `CNAME` | Custom domain for GitHub Pages → `ajselectricsolutions.com` |
| `README.md` | This file |

## Preview locally

```bash
cd /workspace/ajs-electric-site
python3 -m http.server 8080
```

Open **http://localhost:8080**.

## Deploy free (GitHub Pages + your domain)

Hosting stays free. You only use the domain Anthony already paid for.

1. Connect GitHub to Cursor / create a public repo (e.g. `ajs-electric-site`).
2. Push `index.html`, `styles.css`, and `CNAME` to `main`.
3. GitHub → **Settings → Pages**: deploy from **main** / **/** (root).
4. Under Pages → **Custom domain**, enter `ajselectricsolutions.com` and save (enables HTTPS after DNS propagates).
5. At the domain registrar, set DNS:

### Apex (`ajselectricsolutions.com`) — GitHub Pages A records
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

### Optional `www` — CNAME
```
CNAME  www  ajselectric2022-bit.github.io
```

Replace `ajselectric2022-bit` with the GitHub username that owns the repo. Keep existing registrar nameservers unless you intentionally move DNS to Cloudflare (also free).

6. Wait for DNS (often 5–60 minutes). Site: **https://ajselectricsolutions.com**

## What we need from Anthony

- Registrar login (GoDaddy, Namecheap, Google Domains/Squarespace, etc.) **or** permission for us to walk him through DNS once we know which registrar
- Confirmation that DNS can be edited for `ajselectricsolutions.com`

## After deploy checklist

- [ ] Call / Text open `(530) 386-2191` on a phone
- [ ] Instagram opens `@AJSELECTRIC22`
- [ ] HTTPS works on `ajselectricsolutions.com`
- [ ] Replace gallery placeholders with Instagram job photos
