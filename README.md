# dsh-new-session

An `/new` command for the DSH input field: starts a new session in the
current workspace and opens it — the same thing the **+** button on the
workspace row does.

```
/new
```

No argument, no configuration: the command follows the workspace you are
currently working in.

## What it does

The client command calls `uiWorkspace.startSession()` without an argument. This
single action starts the “New Session” flow, inherits the current workspace (or,
if there is no current one, the most recently used workspace), and navigates to
the created session. The **+** button on the workspace row does exactly the same
thing; its upper sibling button in the sidebar does it without any workspace
context.

A session that is already empty in the workspace is reused instead of creating
a second one — that is the session controller’s (`connectWorkspace`) rule, not
this plugin’s.

## Why in the browser and not the host

The host (`sessionController.create`) can also *create* a session. It just
cannot open it. A host command invocation would create a session while the
browser remained on the old conversation — the new session would not appear in
the sidebar until the next refresh. Creating and opening are UI navigation, and
the client owns that.

That is why the host half (`lib/index.js`) is empty. It exists as an **enabled
loader entry**: `dsh-client-modules` assembles the browser boot graph from the
enabled entries and serves a bundle under `/plugins` for each `dsh.client`
declaration. Without a mounted entry, `client.js` would never be loaded.

## Side effects

- An `action` sends nothing. A draft, including attachment cards in the
  composer, remains untouched — unlike a host command, whose mere invocation
  would be a message.
- `/new` is a client command without a host catalog entry. If its name collides
  with a host command, candidate synthesis fails loudly instead of displacing
  it.
- The command requires the web composition (`ui-commands` and `ui-workspace`
  mounted); in a UI-less run, the command surface does not exist.

## Installation

Nothing to configure. The line in `cordis.patch.yml` is empty because the
plugin has no deployment property.

Newly mounted client bundles do not appear in the running process:
`dsh-client-modules` assembles the boot graph at startup. After adding the
plugin, restart the Harness once (with `/dsh-restart`, if available) and reload
the page.
