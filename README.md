# dsh-new-session

Adds `/new` to the DSH Web input. It opens a session in the current workspace (or the most recently used workspace), like the workspace **+** button. An existing empty session may be reused. Your unsent composer draft is not submitted.

## Install from GitHub

```sh
dsh plugin --profile web add https://github.com/yoggu/dsh-new-session.git
```

Restart DSH Web if the plugin does not appear immediately, then reload the page. Use `/new` in the input field. No configuration or credentials are required.

To uninstall: `dsh plugin --profile web remove dsh-new-session`.

## License

MIT; see [LICENSE](LICENSE).
