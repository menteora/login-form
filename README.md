
# Guida alla Creazione di una Libreria React

Questo repository funge da template per lo sviluppo di una libreria di componenti React. La struttura è progettata per permettere lo sviluppo dei componenti (nella cartella `lib`) contemporaneamente alla loro visualizzazione in un'applicazione di prova (nella cartella `demo`).

## Struttura del Progetto

L'organizzazione delle cartelle è fondamentale per separare il codice distribuibile da quello di test:

```text
root/
├── demo/               # Applicazione "Consumer" di esempio
│   ├── App.tsx         # Componente principale della demo
│   └── ...
├── lib/                # SORGENTE DELLA LIBRERIA (Codice da pubblicare)
│   ├── components/     # Componenti UI riutilizzabili
│   ├── context/        # React Contexts
│   ├── hooks/          # Custom Hooks
│   ├── types.ts        # Definizioni TypeScript condivise
│   └── index.ts        # Entry point (Barrel file)
├── index.html          # Entry point per Vite (modalità sviluppo)
├── index.tsx           # Bootstrap dell'applicazione React (monta la demo)
├── package.json        # Configurazione npm
└── tsconfig.json       # Configurazione TypeScript
```

## 1. Configurazione package.json

Per trasformare il progetto in una libreria installabile, il `package.json` deve essere configurato correttamente:

*   **files**: Definisce quali cartelle vengono incluse quando si pubblica su npm. Qui includiamo solo `lib`.
*   **main/module/types**: Puntano all'entry point della libreria (`lib/index.ts`).
*   **peerDependencies**: Indica che la libreria necessita di React per funzionare, ma non lo include nel bundle finale (sarà l'app ospite a fornirlo).

Esempio:
```json
{
  "name": "nome-tua-libreria",
  "version": "1.0.0",
  "type": "module",
  "main": "lib/index.ts",
  "module": "lib/index.ts",
  "types": "lib/index.ts",
  "files": [
    "lib"
  ],
  "peerDependencies": {
    "react": ">=19.0.0",
    "react-dom": ">=19.0.0"
  }
}
```

## 2. L'Entry Point (Barrel File)

Il file `lib/index.ts` è cruciale. Serve a esporre all'esterno solo ciò che vuoi rendere pubblico.

```typescript
// lib/index.ts
export { MioComponente } from './components/MioComponente';
export { useMioHook } from './hooks/useMioHook';
export type { MioTipo } from './types';
```

## 3. Flusso di Sviluppo (Dev Loop)

Per sviluppare, utilizziamo **Vite**.

1.  **Entry Point**: Vite carica `index.html`.
2.  **Bootstrap**: `index.html` carica `index.tsx`.
3.  **Demo**: `index.tsx` renderizza `demo/App.tsx`.
4.  **Integrazione**: All'interno di `demo/App.tsx`, importi i tuoi componenti direttamente da `../lib`.

```bash
# Avvia il server di sviluppo
npm run dev
```

Questo permette di vedere le modifiche ai componenti in tempo reale (HMR) all'interno di un'applicazione reale.

## 4. Build e Pubblicazione

Quando la libreria è pronta:

1.  **TypeScript Check**: Esegui `tsc` per assicurarti che non ci siano errori di tipo.
2.  **Pubblicazione**: Esegui `npm publish`. Grazie alla configurazione `"files": ["lib"]`, verrà caricata su npm solo la cartella `lib`.

## 5. Gestione degli Stili (CSS/Tailwind)

In questo template, Tailwind CSS è configurato globalmente.
*   **Sviluppo**: Tailwind viene caricato via script o configurazione nell'app di demo.
*   **Produzione**: Se la tua libreria usa classi Tailwind, l'applicazione che installerà la tua libreria dovrà avere Tailwind configurato per generare il CSS corrispondente alle classi usate nei tuoi componenti.
