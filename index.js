var express = require('express')
  , routes = require('./routes')
  , path = require('path'),
	fileUpload = require('express-fileupload'),
	app = express(),
	mysql      = require('mysql'),
	bodyParser=require("body-parser"),
  sharp = require('sharp');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'mynode'
});

connection.connect();

global.db = connection;

sharp('./public/images/upload_images/test.jpg')
    .resize(200, 200)
    .toFile("./public/images/upload_images/1.jpg")

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// development only

app.get('/', routes.index);//call for main index page
app.post('/', routes.index);//call for signup post
app.get('/profile/:id',routes.profile);
//Middleware
app.listen(8080)