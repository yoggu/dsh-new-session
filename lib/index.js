/**
 * Host half of `dsh-new-session`. It deliberately mounts no service: the `/new` command
 * lives entirely in the browser.
 *
 * Creating and opening a Session is UI navigation, and the client owns it —
 * `uiWorkspace.startSession()` starts a New Session flow and moves the main
 * area to the created Session. A host command could create a Session through
 * the Session Controller, but nothing would open it: the browser would sit on
 * the old Conversation and the new Session would only appear in the sidebar on
 * the next refresh. So the command is registered client-side
 * (`client.js`, `ctx.commandUi`).
 *
 * What this half contributes is its presence as an enabled Loader entry.
 * `dsh-client-modules` composes the browser boot graph by scanning enabled
 * entries for a `dsh.client` declaration, so a package that is not mounted
 * never has its bundle served under `/plugins` — the browser half would exist
 * on disk and never load.
 *
 * @module dsh-new-session
 */

export const name = 'dsh-new-session'

/**
 * Mount the plugin.
 *
 * Empty on purpose: this row exists to make the package an enabled entry, and
 * the command it enables is registered by the browser half.
 */
export function apply() {}
