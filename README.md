# TNV-Academy-Progetto-Finale-Gruppo1
<h2> Titolo progetto : <i>"GuessWhosBackTheMovie"</i></h2>
<p>Realizzare un’applicazione web che recuperi casualmente un film attaverso un’API esterna e lo proponga all’utente nascondendo tutti i suoi campi tra cui la locandina (almeno 5, come ad esempio: titolo, genere, attori, anno di uscita, rating, lingua, …). <br>I film senza locandina deve essere esclusi.</p>
<p>L’utente attraverso un pulsante “Inizia gioco” farà partire un countdown che partirà da un limite prefissato (ad es. 3 minuti) e potrà indicare in un campo di input dedicato il titolo del film. Con il passare del tempo i campi diventano parzialmente visibili (o uno alla volta, o tutti parzialmente - per lettera, per parola) ad eccezione del titolo.</p>
<p>Una volta indovinato l’utente potrà scegliere se salvarlo nella lista dei preferiti, e in tal caso dovrà dare un voto al film e inserire una breve recensione di massimo 160 caratteri. Per ogni film dovrà essere registrato il tempo impiegato per indovinare il film. Tale lista dovrà essere visibile nell’applicazione stessa e dovrà essere possibile eliminare i film.</p>
<h2>Composizione</h2>
<p>Clonare o scaricare la repositorie, all' interno di ogni cartella è presentre un file README con le indicazioni per far partire ogni modulo.</p>
   <h3>Frontend</h3>
   <dl>
    <dt>Angular</dt>
  <dd>Gestione di tutte le logiche client-side e elaborazione HTML rotte.</dd>
    <dl>
  
   <h3>Backend</h3>
   <dl>
    <dt>SpringBoot</dt>
     <dd>API per <i><b>accesso utente</b></i> registrazione e login. </dd>
    <dt>Laravel</dt>
     <dd>API per inserimento e recupero <i><b>votazione</b></i>.</dd>
    <dt>Dotnet</dt>
     <dd>API per inserimento e recupero <i><b>recensione</b></i>.</dd>
    <dt>Node</dt>
     <dd>API gestione <i><b>lista film giocati</b></i> con relativo tempo.</dd>
     <dt>API esterna</dt>
     <dd><a href="https://www.themoviedb.org/documentation/api" >TMDB API</a> usata per recuperare tutti i <b><i>film utilizzati</b></i> nel progetto.</dd>
</dl>
<h2>Membri</h2>
<ul>
  <li>Marco Loddo</li>
  <li>Michele Macis</li>
  <li>Alessandro Paci</li>
