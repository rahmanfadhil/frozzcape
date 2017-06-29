var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var NodeCouchDb = require('node-couchdb');
var couch = new NodeCouchDb({ auth: {user: 'admin', password: '12345'} });

var app = express();

// EXPRESS STATIC FILE
app.use(express.static('assets'));

// USE BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// CONFIGURE HANDLEBARS
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// GET HOME
app.get('/', function(req, res){
	res.render('home');
});

// GET DATABASE
var dbname = 'frozzcape';
var viewurl = '_design/view1/_view/profile-view';

app.get('/database', function(req, res){
	couch.get(dbname, viewurl).then(
	  function(data, header, status){
	    console.log(data.data.rows);
			res.render('database', {profile:data.data.rows});
	  }
	).catch(
	  function(err){
	    console.log(err);
	  }
	);
});

app.post('/add-data/send', function(req, res){
	var name = req.body.name;
	var email = req.body.email;

	couch.uniqid().then(function(ids){
		var id = ids[0];

		couch.insert('frozzcape', { _id: id, name: name, email: email })

		.then(function(data, header, status){
			res.redirect('/database');
		})
		.catch(function(err){
			res.send(err);
		});
	});
});

// LISTEN TO SERVER
app.listen(process.env.PORT || 3000, function(){
	console.log('[listening] ...');
});
