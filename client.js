/**
 * Browser half of `dsh-new-session`: the `/new` command.
 *
 * Hand-written in the `window.__ModuleLoader__.load` format — no JSX, no
 * bundler — and declared through `exports["./client"]` plus `dsh.client` in
 * package.json, which is how the host discovers and serves a browser bundle.
 *
 * The command is the workspace row's “+” button. `uiWorkspace.startSession()`
 * without an argument starts a New Session flow, inherits the current (or, with
 * none current, the most recent) Workspace, and navigates to the Session it
 * created. Passing a Workspace id would target that row instead; leaving it out
 * is what makes `/new` follow the workspace the user is working in.
 *
 * An action submits nothing, so a draft and its attachment cards in the
 * composer stay untouched — unlike a host command, whose bare invocation would
 * be a message.
 *
 * @module dsh-new-session/client
 */

window.__ModuleLoader__.load({
  id: 'dsh-new-session',
  factory: () => {
    const module = { exports: {} }
    const exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

    /**
     * Register the `/new` client command.
     *
     * The registration rides this fiber through `ctx.effect`, so an HMR replace
     * or a disposed client takes the menu row with it instead of leaving a
     * duplicate behind (a second registration of the same name throws).
     *
     * @param ctx - the plugin's Cordis context.
     */
    function apply(ctx) {
      ctx.effect(() =>
        ctx.commandUi.register({
          name: 'new',
          description: () => 'New session in the current workspace',
          // Every session can open another one, so the row is offered wherever
          // a composer exists.
          available: () => true,
          ui: {
            kind: 'action',
            run: () => {
              ctx.uiWorkspace.startSession()
            },
          },
        }),
      )
    }

    exports.inject = ['commandUi', 'uiWorkspace']
    exports.apply = apply
    return module.exports
  },
})
