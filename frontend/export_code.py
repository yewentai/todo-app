import os

# Configuration
input_folder = "./"  # Set the folder you want to export
output_file = "project_code_export.txt"
include_ext = {".py", ".js", ".ts", "jsx", ".tsx", "html", ".css", ".env", ".yaml", ".json"}
exclude_dirs = {"node_modules", "__pycache__", ".git", "build"}
exclude_files = {"export_code.py", "package-lock.json"}


def build_tree(start_path, prefix=""):
    tree_lines = []
    entries = [e for e in os.listdir(start_path) if e not in exclude_dirs and e not in exclude_files]
    entries.sort()
    for idx, entry in enumerate(entries):
        path = os.path.join(start_path, entry)
        connector = "└── " if idx == len(entries) - 1 else "├── "
        tree_lines.append(f"{prefix}{connector}{entry}")
        if os.path.isdir(path):
            extension = "    " if idx == len(entries) - 1 else "│   "
            tree_lines.extend(build_tree(path, prefix + extension))
    return tree_lines


# Build tree structure
tree = [f"Project file structure for '{input_folder}':"]
tree.extend(build_tree(input_folder))

# Write tree to output file
with open(output_file, "w", encoding="utf-8") as out:
    out.write("\n".join(tree))
    out.write("\n\n")

# Walk the directory tree and export code
for root, dirs, files in os.walk(input_folder):
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

print(f"Exported code from '{input_folder}' to {output_file}")
