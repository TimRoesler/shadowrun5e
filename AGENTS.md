# AGENTS.md — Onboarding für AI-Agents

Fork des Shadowrun-5e-Systems (v0.36.x) für Foundry VTT v14. Dieses Repo ist die
**Quelle der Wahrheit** für das auf Tims Server installierte System
(`/home/foundryvtt/10_FOUNDRYVTT/data/Data/systems/shadowrun5e/` — dort strikt read-only).
Technische Details: `README-DEV.md`.

## Arbeitsworkflow (verbindlich)

1. Implementieren nur in diesem Repo (`/home/foundryvtt/20_DEVELOPMENT/shadowrun5e`)
2. Build und Lint müssen grün sein: `npm run build` + `npm run lint:errors`
3. Committen und pushen (`main`)
4. **Kein Self-Testing in Foundry, kein Deploy** — Tim testet selbst und deployed nach Freigabe.
   Nach dem Push Bescheid geben, was konkret zu testen ist.

## Build & Test

```bash
npm ci                  # einmalig
npm run build           # gulp/TS-Build nach dist/
npm run lint            # eslint (lint:errors für nur-Fehler)
npm test                # Testsuite
npm run build:db        # Compendium-Packs (packs/) neu bauen
```

## Release-Konventionen (Stolperfallen!)

- Tags **OHNE `v`-Präfix**: `0.36.1.9`, nicht `v0.36.1.9`. (Die alten `v0.36.1.5`-Tags
  sind Altlast — nicht nachahmen, sonst greift die Manifest-URL nicht.)
- Manifest-URL in `system.json` ist eine **nicht-redirectende Raw-URL** (Fix in 0.36.1.9,
  verhindert Foundrys Track-Change-Prompt) — nicht auf `releases/latest` umstellen.
- `origin/main` wurde in der Vergangenheit force-gepusht: vor Arbeitsbeginn `git fetch`
  und lokalen Stand gegen `origin/main` prüfen.

## Leitplanken

- Entwicklung ausschließlich unter `/home/foundryvtt/20_DEVELOPMENT/`;
  `/home/foundryvtt/10_FOUNDRYVTT/` niemals verändern (lesen zum API-Nachschlagen ist erwünscht:
  Foundry-Quellen unter `10_FOUNDRYVTT/app/client/` und `app/common/`, unminifiziert).
- Migrations-Code (Token/Actor-Migrationen) ist heikel — Änderungen dort besonders
  konservativ und mit Tim abstimmen.
