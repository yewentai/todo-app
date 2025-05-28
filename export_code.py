import os

# Configuration
output_file = "project_code_export.txt"
include_ext = {".py", ".js", ".jsx", ".html", ".css", ".env", ".yaml"}
exclude_dirs = {"node_modules", "__pycache__"}
exclude_files = {"export_code.py"}

# Clear output file
with open(output_file, "w") as out:
    pass

# Walk the directory tree
for root, dirs, files in os.walk("."):
    # Skip excluded directories
    dirs[:] = [d for d in dirs if d not in exclude_dirs]

    for file in files:
        if file in exclude_files:
            continue
        ext = os.path.splitext(file)[1]
        if ext in include_ext:
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            with open(output_file, "a", encoding="utf-8") as out:
                out.write(f"===== {file_path} =====\n")
                out.write(content)
                out.write("\n\n")

print(f"Exported code to {output_file}")
