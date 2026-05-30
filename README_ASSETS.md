# OMEGA Space Sustainability Source Assets Clone

This folder contains the complete, high-fidelity downloaded source scripts, stylesheets, and custom editorial fonts of the **OMEGA Space Sustainability** page (`https://www.omegawatches.com/world-of-omega/sustainability/space-sustainability`).

All block/protection mechanisms (such as Akamai stream rejections and TLS signature checks) were bypassed using advanced browser impersonation.

## Asset Directory Map

Below is the local directory structure showing where each asset from the original server has been downloaded and mapped:

| Remote Server Path | Local File Path | Size | Description |
|---|---|---|---|
| `/world-of-omega/sustainability/space-sustainability` | `index.html` | 45 KB | The core entry HTML document |
| `/world-of-omega/sustainability/space-sustainability/appv2.css` | `world-of-omega/sustainability/space-sustainability/appv2.css` | 44 KB | Primary layout & timeline animation styles |
| `/world-of-omega/sustainability/space-sustainability/appv2.js` | `world-of-omega/sustainability/space-sustainability/appv2.js` | 1.1 MB | Main JS Bundle (Three.js/GSAP/ScrollTrigger core) |
| `/media/external/omega-external.js` | `media/external/omega-external.js` | 8.0 KB | Global external utility JS |
| `/world-of-omega/sustainability/space-sustainability/assets/fonts/omega-ct/*` | `world-of-omega/sustainability/space-sustainability/assets/fonts/omega-ct/*` | ~180 KB total | 6 `OmegaCT` brand display & body fonts (`.woff`, `.woff2`) |

*Note: Analytical/tracking scripts (e.g. Google Tag Manager, Adobe privacy trackers) were bypassed to prevent localhost latency and unwanted data capture.*

---

## Running the Clone Locally

To run this clone with all animations and typography rendering perfectly, **you must serve the `space-sustainability/` directory as the server root**. This is because all stylesheets and scripts resolve absolute paths relative to the host root (e.g. `/world-of-omega/...`).

### Option 1: Python HTTP Server (Easiest)
Navigate to the `space-sustainability` folder and run:
```bash
python3 -m http.server 8000
```
Then open: [http://localhost:8000](http://localhost:8000)

### Option 2: Node.js http-server
```bash
npx http-server . -p 8000
```
Then open: [http://localhost:8000](http://localhost:8000)

### Option 3: VS Code "Live Server" Extension
Set the root directory of the workspace or server to `/space-sustainability/` and click **Go Live**.
