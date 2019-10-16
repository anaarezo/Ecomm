var express = require('express');
var bodyParser = require('body-parser');
var app = express();
let authService = require('./auth/auth-service');
let searchController = require('./controllers/searchController');
let itemsController = require('./controllers/itemsController');
var path = require('path');
var cors = require('cors');

var urlConfig = require('./urlconfig');
var meli = require('mercadolibre');
var meliObject = new meli.Meli(urlConfig.client_id, urlConfig.secret_key);

let serverStatus = {
  success: 200,
  redirect: 301,
  accessDenied: 401,
  badRequest: 403,
  notFound: 404,
  internalError: 500
};

const PORT = 5000;
// ARQUIVOS ESTATICOS E VIEWS
app.use(express.static(path.join(__dirname + '/static')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

// PARSEAR AS REQUISICOES
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// PARSEAR AS REQUISICOES

// HABILITA CORS PARA REQUESTS DE OUTRAS ORIGENS
app.use(cors());

//INICIALIZA CONTROLLERS
authService(app, meliObject);
searchController(app, meliObject);
itemsController(app, meliObject);

app.listen(PORT, function() {
  console.log('Example app listening on port 3000!');
});
