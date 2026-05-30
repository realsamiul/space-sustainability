import os

deobfuscated_path = "/home/realsamkarim/H0QEYE/space-sustainability/extracted_source/deobfuscated.js"
output_path = "/home/realsamkarim/H0QEYE/space-sustainability/extracted_source/custom_omega_logic.js"

print("Extracting custom Space Sustainability logic (Module 849)...")

if not os.path.exists(deobfuscated_path):
    print(f"Error: deobfuscated.js not found at {deobfuscated_path}")
    exit(1)

with open(deobfuscated_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Module 849 starts on line 32448 and ends right before Module 876 on line 45269
start_line = 32448
end_line = 45268

module_lines = lines[start_line - 1 : end_line]

with open(output_path, "w", encoding="utf-8") as out:
    out.write("// STANDALONE CUSTOM OMEGA SPACE SUSTAINABILITY SITE LOGIC\n")
    out.write("// Extracted from Module 849 of appv2.js (unpacked & unminified)\n\n")
    out.writelines(module_lines)

print(f"SUCCESS: Standalone custom logic written to {output_path} ({len(module_lines)} lines).")
