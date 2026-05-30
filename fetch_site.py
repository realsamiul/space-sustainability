import os
import sys
import re
from urllib.parse import urljoin, urlparse, unquote
from bs4 import BeautifulSoup
from curl_cffi import requests

# Target config for Space Sustainability page
url = "https://www.omegawatches.com/world-of-omega/sustainability/space-sustainability"
base_dir = "/home/realsamkarim/H0QEYE/space-sustainability"
log_path = os.path.join(base_dir, "fetch.log")

os.makedirs(base_dir, exist_ok=True)

def log(msg):
    print(msg)
    with open(log_path, "a", encoding="utf-8") as f:
        f.write(msg + "\n")

log("Starting comprehensive OMEGA Space Sustainability fetch via curl_cffi...")

def download_file(full_url, relative_to_root):
    # Clean up relative path
    relative_path = relative_to_root
    if relative_path.startswith("/"):
        relative_path = relative_path[1:]
        
    # Skip tracking and analytics
    if any(x in relative_path.lower() for x in ["google", "analytics", "tagmanager", "hotjar", "doubleclick", "adobe-privacy", "demdex"]):
        log(f"Skipping analytical/tracking asset: {relative_path}")
        return False
        
    local_path = os.path.join(base_dir, relative_path)
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    
    log(f"Downloading: {full_url} -> {local_path}")
    try:
        res = requests.get(full_url, impersonate="chrome120", timeout=30)
        if res.status_code == 200:
            with open(local_path, "wb") as f:
                f.write(res.content)
            log(f"SUCCESS: Saved {relative_path} ({len(res.content)} bytes)")
            return res.content
        else:
            log(f"WARNING: HTTP status {res.status_code} for {full_url}")
    except Exception as e:
        log(f"ERROR: Failed downloading {full_url}. Error: {e}")
    return None

try:
    # 1. Download main page HTML
    log(f"Fetching index page: {url}")
    html_data = download_file(url, "index.html")
    if not html_data:
        log("Critical error: Unable to fetch main index.html")
        sys.exit(1)
        
    html_content = html_data.decode("utf-8", errors="replace")
    soup = BeautifulSoup(html_content, "html.parser")
    
    # 2. Extract and download CSS stylesheets
    css_links = []
    for link in soup.find_all("link", rel="stylesheet"):
        href = link.get("href")
        if href:
            full_href = urljoin(url, href)
            css_links.append((href, full_href))
            
    # 3. Extract and download JS scripts
    js_links = []
    for script in soup.find_all("script", src=True):
        src = script.get("src")
        if src:
            full_src = urljoin(url, src)
            js_links.append((src, full_src))
            
    log(f"Found {len(css_links)} CSS stylesheets.")
    log(f"Found {len(js_links)} JS scripts.")
    
    # Download CSS stylesheets
    css_contents = {}
    for href, full_href in css_links:
        parsed = urlparse(full_href)
        if "omegawatches.com" in parsed.netloc:
            # Determine mirrored relative path
            rel_path = parsed.path
            css_content = download_file(full_href, rel_path)
            if css_content:
                css_contents[full_href] = css_content.decode("utf-8", errors="replace")
                
    # Download JS scripts
    js_contents = {}
    for src, full_src in js_links:
        parsed = urlparse(full_src)
        if "omegawatches.com" in parsed.netloc:
            rel_path = parsed.path
            js_content = download_file(full_src, rel_path)
            if js_content:
                js_contents[full_src] = js_content.decode("utf-8", errors="replace")
                
    # 4. Parse CSS files for fonts
    log("Parsing CSS files for font assets...")
    font_urls = set()
    for css_url, css_text in css_contents.items():
        # Match url(...) patterns
        urls_in_css = re.findall(r"url\(([^)]+)\)", css_text)
        for u in urls_in_css:
            # Clean quotes if present
            u_clean = u.strip("\"'")
            # Ignore data URIs or absolute external URLs
            if not u_clean.startswith("data:") and not u_clean.startswith("http"):
                full_font_url = urljoin(css_url, u_clean)
                font_urls.add(full_font_url)
                
    log(f"Found {len(font_urls)} unique font assets inside CSS.")
    for font_url in font_urls:
        parsed = urlparse(font_url)
        if "omegawatches.com" in parsed.netloc:
            download_file(font_url, parsed.path)
            
    # 5. Parse JS files for 3D GLB models
    log("Scanning JS scripts for 3D animation models (.glb / .gltf)...")
    model_urls = set()
    for js_url, js_text in js_contents.items():
        # Find GLB/GLTF references (e.g. "assets/models/satellite.glb" or similar)
        matches = re.findall(r"\"([^\"]+?\.(?:gltf|glb))\"|'([^'\n]+?\.(?:gltf|glb))'", js_text)
        for m1, m2 in matches:
            match_path = m1 or m2
            if match_path:
                # Models are loaded relative to the document URL (url)
                full_model_url = urljoin(url + "/", match_path)
                model_urls.add(full_model_url)
                
    log(f"Found {len(model_urls)} unique 3D models inside JS.")
    for model_url in model_urls:
        parsed = urlparse(model_url)
        if "omegawatches.com" in parsed.netloc:
            download_file(model_url, parsed.path)
            
    log("\nAll OMEGA Space Sustainability animation, JS, CSS, fonts, and model assets are fully downloaded!")
    
except Exception as e:
    log(f"Critical execution error: {e}")
