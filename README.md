# Task Manager

Questo progetto è un'applicazione web per la gestione dei compiti, sviluppata con React.

## Funzionalità

- Visualizzazione di una lista di compiti in una tabella
- Aggiunta di nuovi compiti
- Modifica dei compiti esistenti
- Eliminazione dei compiti con conferma
- Ordinamento dei compiti per nome o stato
- Filtro per mostrare/nascondere i compiti chiusi
- Design responsive per desktop e mobile

## Installazione

1. Clona questo repository
2. Naviga nella directory del progetto
3. Installa le dipendenze con il comando: npm install
4. Avvia l'applicazione in modalità sviluppo: npm start


L'app sarà disponibile all'indirizzo [http://localhost:3000](http://localhost:3000).

## Utilizzo

- Per aggiungere un nuovo compito, clicca sul pulsante "Aggiungi compito"
- Per modificare un compito, clicca sul pulsante "Modifica" accanto al compito desiderato
- Per eliminare un compito, clicca sul pulsante "Elimina" e conferma l'azione
- Per ordinare i compiti, clicca sulle intestazioni delle colonne
- Per filtrare i compiti chiusi, usa il pulsante "Nascondi Chiusi" / "Mostra Chiusi"

## Comandi CLI simulati

Questa applicazione include funzioni che simulano comandi CLI per la creazione e l'eliminazione dei compiti. Per utilizzarli:

1. Apri la console del browser (F12 o tasto destro -> Ispeziona -> Console)
2. Per creare un nuovo compito:
```javascript
window.createTaskCLI("Nome del compito", "Aperto")
window.deleteTaskCLI = (id)
