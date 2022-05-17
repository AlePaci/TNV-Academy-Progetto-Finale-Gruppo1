# TNV-Academy-Progetto-Finale-Gruppo1
<h2> Titolo progetto : <i>"GuessWhosBackTheMovie"</i></h2>
<p>Realizzare un’applicazione web che recuperi casualmente un film attaverso un’API esterna e lo proponga all’utente nascondendo tutti i suoi campi tra cui la locandina (almeno 5, come ad esempio: titolo, genere, attori, anno di uscita, rating, lingua, …). <br>I film senza locandina deve essere esclusi.</p>
<p>L’utente attraverso un pulsante “Inizia gioco” farà partire un countdown che partirà da un limite prefissato (ad es. 3 minuti) e potrà indicare in un campo di input dedicato il titolo del film. Con il passare del tempo i campi diventano parzialmente visibili (o uno alla volta, o tutti parzialmente - per lettera, per parola) ad eccezione del titolo.</p>
<p>Una volta indovinato l’utente potrà scegliere se salvarlo nella lista dei preferiti, e in tal caso dovrà dare un voto al film e inserire una breve recensione di massimo 160 caratteri. Per ogni film dovrà essere registrato il tempo impiegato per indovinare il film. Tale lista dovrà essere visibile nell’applicazione stessa e dovrà essere possibile eliminare i film.</p>
<h2>Strumenti necessari</h2>
   <p>XAMPP, intellij IDEA </p>
<h2>Composizione</h2>
<p>Clonarela repositorie o scaricare una delle release, avviare XAMPP e su phpMyAdmin inserire il seguente codice per creare i database: </p>
<p><code>CREATE DATABASE ratings COLLATE utf8_unicode_ci;</code><br><code> CREATE DATABASE movies;</code><br><code> CREATE DATABASE users; </code>
<p>Aprire la cartella dell intero progetto su vsCode e seguire le istruzioni per ogni modulo</p>
   <h3>Frontend</h3>
   <dl>
    <dt>Angular</dt>
  <dd>Gestione di tutte le logiche client-side e elaborazione HTML rotte.</dd>
   <p> aprire su temrinale la cartella <code>TNV-Academy-Progetto-Finale-Gruppo1/frontend/angular/GuessWhosBackTheMovie</code> ed eseguire i comandi:
   <code>npm install</code><br>
   <code>ng serve</code></p>
    <dl>
  
   <h3>Backend</h3>
   <dl>
    <dt>SpringBoot</dt>
     <dd>API per <i><b>accesso utente</b></i> registrazione e login. </dd>
      <p> aprire su intellij la cartella <code>TNV-Academy-Progetto-Finale-Gruppo1/backend/springboot/API_user_authentication</code><br>
         far partire il main del file <code>TNV-Academy-Progetto-Finale-Gruppo1/backend/springboot/API_user_authentication/src/main/java/com/thenetvalue/API_user_authentication/ApiUserAuthenticationApplication.java</code><p>
      <p> Attenzione il progetto è stato fatto con le dipendenze per mariadb in caso abbiato mysql ci sono nei file <code> application.properties</code> e <code>build.gradle</code> delle righe commentate da sostituire con quelle di mariadb<p>
    <dt>Laravel</dt>
     <dd>API per inserimento e recupero <i><b>votazione</b></i>.</dd>
         <p> aprire su terminale la cartella <code>TNV-Academy-Progetto-Finale-Gruppo1/backend/laravel/rating</code> ed eseguire i comandi<br>
            <code> composer install</code><br>
            <code> npm install</code> <br>
            <code> php artisan migrate</code><br>
            <code> php artisan serve</code></p>
    <dt>Dotnet</dt>
     <dd>API per inserimento e recupero <i><b>recensione</b></i>.</dd>
      <p> aprire su terminale la cartella <code>TNV-Academy-Progetto-Finale-Gruppo1/backend/dotnet/Comments/Comments.Db</code> e eseguire il comando<br>
         <code>dotnet ef database update</code><br>
         spostarsi alla cartella <code>TNV-Academy-Progetto-Finale-Gruppo1/backend/dotnet/Comments/Comments.RestApi</code> ed eseguire il comando<br>
         <code>dotnet run</code>
    <dt>Node</dt>
     <dd>API gestione <i><b>lista film giocati</b></i> con relativo tempo.</dd>
         <p> aprire su terminale la cartella <code>TNV-Academy-Progetto-Finale-Gruppo1/backend/node/api-score-preferred-movie</code> ed eseguire i comandi<br>
         <code> npm install </code><br>
       <code> node server.js</code></p> 
     <dt>API esterna</dt>
     <dd><a href="https://www.themoviedb.org/documentation/api" >TMDB API</a> usata per recuperare tutti i <b><i>film utilizzati</b></i> nel progetto.</dd>
</dl>
<h2>Membri</h2>
<ul>
  <li>Marco Loddo</li>

  <li>Alessandro Paci</li>
