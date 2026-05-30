import os
import shutil
from urllib.parse import urljoin
from curl_cffi import requests

# Base config
url = "https://www.omegawatches.com/world-of-omega/sustainability/space-sustainability"
base_dir = "/home/realsamkarim/H0QEYE/space-sustainability"
nested_assets_dir = os.path.join(base_dir, "world-of-omega/sustainability/space-sustainability/assets")
root_assets_dir = os.path.join(base_dir, "assets")

assets_to_download = [
    "assets/textures/earth/albedo.jpg",
    "assets/textures/earth/data.jpg",
    "assets/textures/landscape/mountains.jpg",
    "assets/images/fielding.jpg",
    "assets/images/moriba.jpg",
    "assets/images/wozniak.jpg"
]

print("Starting OMEGA Space Sustainability WebGL Texture & Photo Download Sequence...")

for asset_rel_path in assets_to_download:
    full_url = urljoin(url + "/", asset_rel_path)
    
    # Mirror structure path
    save_path_nested = os.path.join(nested_assets_dir, asset_rel_path.replace("assets/", ""))
    os.makedirs(os.path.dirname(save_path_nested), exist_ok=True)
    
    print(f"Downloading WebGL Asset: {full_url}")
    try:
        r = requests.get(full_url, impersonate="chrome120", timeout=20)
        if r.status_code == 200:
            with open(save_path_nested, "wb") as f:
                f.write(r.content)
            print(f"SUCCESS: Saved to {save_path_nested} ({len(r.content)} bytes)")
            
            # Copy to root assets folder for Vercel loading compatibility
            save_path_root = os.path.join(root_assets_dir, asset_rel_path.replace("assets/", ""))
            os.makedirs(os.path.dirname(save_path_root), exist_ok=True)
            shutil.copy2(save_path_nested, save_path_root)
            print(f"COPIED to root assets folder: {save_path_root}")
        else:
            print(f"WARNING: HTTP Status {r.status_code} for {full_url}")
    except Exception as e:
        print(f"ERROR: Failed downloading {full_url}. Reason: {e}")

# Also copy fonts to root assets directory just like Clearspace
nested_fonts_dir = os.path.join(nested_assets_dir, "fonts")
if os.path.exists(nested_fonts_dir):
    shutil.copytree(nested_fonts_dir, os.path.join(root_assets_dir, "fonts"), dirs_exist_ok=True)
    print("COPIED fonts to root assets folder.")

print("\nWebGL Texture and Photo Download sequence completed for Space Sustainability!")
