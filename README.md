# dsh-new

Ein `/new`-Befehl für das DSH-Eingabefeld: startet eine neue Sitzung im
aktuellen Workspace und öffnet sie — dasselbe, was der **+**-Button an der
Workspace-Zeile tut.

```
/new
```

Kein Argument, keine Konfiguration: der Befehl folgt dem Workspace, in dem du
gerade arbeitest.

## Was er tut

Der Client-Befehl ruft `uiWorkspace.startSession()` ohne Argument auf. Diese
eine Aktion startet den „New Session"-Ablauf, erbt den aktuellen (ohne einen
aktuellen: den zuletzt benutzten) Workspace und navigiert auf die erzeugte
Sitzung. Genau das tut auch der **+**-Button der Workspace-Zeile; sein oberer
Geschwister-Button in der Sidebar tut es ohne Workspace-Bezug.

Eine Sitzung, die bereits leer im Workspace liegt, wird wiederverwendet statt
eine zweite anzulegen — das ist die Regel des Session-Controllers
(`connectWorkspace`), nicht dieses Plugins.

## Warum im Browser und nicht im Host

Eine Sitzung *anzulegen* kann auch der Host (`sessionController.create`). Nur:
öffnen kann er sie nicht. Eine Host-Befehlsinvocation würde eine Sitzung
erzeugen, während der Browser auf der alten Konversation stehen bleibt — die
neue Sitzung erschiene erst beim nächsten Refresh in der Sidebar. Erstellen und
Öffnen sind eine UI-Navigation, und die besitzt der Client.

Deshalb ist die Host-Hälfte (`lib/index.js`) leer. Sie existiert als
**aktivierter Loader-Eintrag**: `dsh-client-modules` setzt den Browser-Boot-Graph
aus den aktivierten Einträgen zusammen und liefert je `dsh.client`-Deklaration
ein Bundle unter `/plugins` aus. Ohne gemountete Zeile würde `client.js` nie
geladen.

## Nebenwirkungen

- Eine `action` sendet nichts. Ein Entwurf samt Anhang-Karten im Composer bleibt
  unangetastet — anders als bei einem Host-Befehl, dessen bloße Invocation eine
  Nachricht wäre.
- `/new` ist ein Client-Befehl ohne Host-Katalogzeile. Kollidiert der Name mit
  einem Host-Befehl, scheitert die Kandidatensynthese laut, statt ihn zu
  verdrängen.
- Der Befehl braucht die Web-Composition (`ui-commands` und `ui-workspace`
  gemountet); in einem UI-losen Lauf gibt es die Befehlsfläche nicht.

## Installation

Nichts zu konfigurieren. Die Zeile in `cordis.patch.yml` ist leer, weil das
Plugin keine Deployment-Eigenschaft kennt.

Neu gemountete Client-Bundles erscheinen nicht im laufenden Prozess:
`dsh-client-modules` setzt den Boot-Graph beim Start zusammen. Nach dem
Hinzufügen des Plugins also einmal den Harness neu starten (mit `/dsh-restart`,
falls vorhanden) und die Seite neu laden.
