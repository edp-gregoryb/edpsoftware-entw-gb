# edpSoftware Web-Suite
Code & andere Ressourcen aller neuen Apps der edpSoftware Web-Suite, bspw. edpCRMtel, edpOffert-Tool usw. Basis sind die Überlegungen zu IDEE2020.

Grundprinzip: Ein Sourcecode für alle Kunden.

Detaillierte Releasenotes können jeweils in der App selbst aufgerufen werden.



### Wichtiger Hinweis:
Wegen Kompatibilitätsproblemen zwischen RxJS 5.x und Typescript 2.4.1 wurde in den CompilerOptions der Datei tsconfig.json folgender Eintrag eingearbeitet:

"skipLibCheck": true,

Damit sollte die bestehende Inkompatiblität entschärft werden. Der Eintrag ist nach dem Beheben des Fehlers auf Seite RxJS zu entfernen (dies sollte mit RxJS 6.x der Fall sein). Quelle: https://github.com/ReactiveX/rxjs/issues/2539

3.7.17/RPS

### neu mit automatischer buildung mit gitlab:
11.07.2018 dli
weiterer versuch anpassung gitlab-ci