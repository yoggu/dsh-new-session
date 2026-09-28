# dsh-new-session

Adds `/new` to the DSH Web input. It opens a session in the current workspace (or the most recently used workspace), like the workspace **+** button. An existing empty session may be reused. Your unsent composer draft is not submitted.

## Install

Install the tagged GitHub release into your DSH Web profile:

```sh
dsh plugin --profile web add 'https://github.com/yoggu/dsh-new-session.git#v0.1.2'
```

Or download the source and link the local checkout:

```sh
git clone --branch v0.1.2 --depth 1 https://github.com/yoggu/dsh-new-session.git
cd dsh-new-session
dsh plugin --profile web add "link:$(pwd)"
```

Keep a linked checkout in place while the plugin is installed. Use the profile you actually run if it is not `web`.

Restart DSH Web if the plugin does not appear immediately, then reload the page. Use `/new` in the input field. No configuration or credentials are required.

To uninstall: `dsh plugin --profile web remove dsh-new-session`.

## License

MIT; see [LICENSE](LICENSE).
