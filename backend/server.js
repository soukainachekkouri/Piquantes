//1.Je crée un programme qui attend des requêtes HTTP et d'y répondre

//j'importe le package HTTP de node
const http = require('http');
//j'importe mon app pour executer par la suite express sur Node
const app = require('./app')

app.set('port', process.env.PORT || 3000);
//je crée mon serveur 
const server = http.createServer(app);

//le serveur doit attendre les requêtes
server.listen(process.env.PORT || 3000);