# docs-portal
Generates a static index.html file providing iframe based access to documents in subfolders relative to it.
The template is based on [Material lite](https://getmdl.io) and will be customizable in a future release.

Usage: docs-portal COMMAND

Options:

| ARGUMENT, OPTIONS | DEFAULT | MANDATORY | DESCRIPTION |
| --: | :--- | :---: | :--- |
| `-t`, `--target` | - | yes | The target to generate and lookup folders |
| `--charset` | `utf-8` | no | The document charset |
| `--docs` | - | no | Force manually which folders to show by passing a string (e.g. 'foo bar') |
| `--language` | `en` | no | The document language |
| `--name` | `index.html` | no | The name of the file to write |
| `--title` | `Documentation portal` | no | The portal title |
