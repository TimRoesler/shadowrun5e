# Shadowrun 5th Edition

Spielsystem für *Shadowrun, Fifth Edition* in Foundry VTT v14 — persönlicher Fork mit
Anpassungen und Fehlerkorrekturen für den Eigenbetrieb.

## Funktionen

- Charaktere, Fahrzeuge, Geister, Sprites und IC
- Ausrüstung, Waffen, Rüstung, Cyberware und Bioware
- Kampf- und Initiativesystem mit Schadensabwicklung
- Magie, Zauber und Beschwörung; Matrix und Technomancer; Rigging
- Chummer-Charakterimport
- Deutsch- und englischsprachige Oberfläche

## Installation

Manifest-URL in Foundry unter *Spielsysteme → System installieren* eintragen:

```text
https://github.com/TimRoesler/shadowrun5e/releases/latest/download/system.json
```

Voraussetzungen: keine (eigenständiges Spielsystem).

## Kompatibilität

| Komponente | Anforderung |
|---|---|
| Foundry VTT | v14 (verifiziert: 14.364) |
| Systemversion | 0.36.x |

## Entwicklung

```bash
npm ci             # Abhängigkeiten
npm test           # Typecheck (tsgo --noEmit)
npm run build:prod # Produktions-Build nach dist/
```

Ausführliche Entwickler-Dokumentation: siehe [README-DEV.md](README-DEV.md).

## Herkunft & Credits

Fork von [SR5-FoundryVTT/foundryvtt-shadowrun5e](https://github.com/SR5-FoundryVTT/SR5-FoundryVTT).
Originalautoren: Jan Schoska, Shawn Milligan, Bruno Melo und Timothy J. Lanza sowie die
SR5-FoundryVTT-Community.

## Lizenz & Markenhinweis

GNU General Public License v3, siehe [LICENSE](LICENSE). **Shadowrun** ist eine eingetragene
Marke von The Topps Company, Inc. Dieses nichtkommerzielle Fanprojekt steht in keiner
Verbindung zu The Topps Company, Inc. oder Catalyst Game Labs.
