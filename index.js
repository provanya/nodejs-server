var express = require('express'),
  routes = require('./routes'),
  path = require('path'),
  fileUpload = require('express-fileupload'),
  app = express(),
  mysql = require('mysql'),
  bodyParser = require('body-parser'),
  sharp = require('sharp');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql',
});

connection.connect();

global.db = connection;

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.get('/', routes.index); //call for main index page
app.post('/', routes.index); //call for signup post
app.get('/profile/:id', routes.profile);

app.listen(8080);
