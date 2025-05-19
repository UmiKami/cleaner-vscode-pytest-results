import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

async function findScript(dir: string): Promise<string | null> {
    for (const entry of await fs.promises.readdir(dir, {
        withFileTypes: true,
    })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const found = await findScript(full);
            if (found) {
                return found;
            }
        } else if (entry.isFile() && entry.name === "run_pytest_script.py") {
            return full;
        }
    }
    return null;
}

export async function activate(context: vscode.ExtensionContext) {
    const pythonExt = vscode.extensions.getExtension("ms-python.python");
    if (!pythonExt) {
        console.warn("ms-python.python extension not found.");
        return;
    }

    const root = pythonExt.extensionPath;
    let scriptPath: string | null;
    try {
        scriptPath = await findScript(root);
    } catch (err) {
        console.error("Error scanning Python extension folder:", err);
        return;
    }

    if (!scriptPath) {
        console.error("Could not find run_pytest_script.py under", root);
        return;
    }

    try {
        const src = await fs.promises.readFile(scriptPath, "utf8");
        const filtered = src
            .split("\n")
            .filter(
                (line) => !line.includes('print("Running pytest with args:')
            )
            .join("\n");

        if (filtered !== src) {
            await fs.promises.writeFile(scriptPath, filtered, "utf8");
            console.log(`Patched: removed print() from\n  ${scriptPath}`);
        } else {
            console.log(`No print() line to remove in\n  ${scriptPath}`);
        }
    } catch (err) {
        console.error(`Failed to patch pytest script at ${scriptPath}:`, err);
    }
}

export function deactivate() {}
