# cleaner-vscode-pytest-results

A minimal Visual Studio Code extension that removes the extra printout of the pytest command-line arguments from your test output.

---

## Features

* **Suppress Pytest CLI Print**

  Automatically removes the single `print` statement that outputs the pytest command arguments at the start of each test run.

That's it—no additional modifications or decorations.

---

## Requirements

* VS Code **1.70.0** or later
* Python environment with **pytest** installed

---

## Extension Settings

This extension has no custom settings—install and enable it to suppress the pytest CLI print.

---

## Known Issues

* This extension only targets the specific `print` of pytest arguments. If pytest changes its internal logging or you add your own prints, they will not be affected.

---

## Release Notes

### 1.0.0

* Initial release: suppresses the pytest command-args print statement.

---

## Contribution

Feel free to submit issues or pull requests for tweaks or edge cases.

---

Enjoy a slightly cleaner test runner output! 🎉
