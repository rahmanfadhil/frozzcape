var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

// EXPRESS STATIC FILE
app.use(express.static('assets'));

// CONFIGURE HANDLEBARS
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// GET REQUEST
app.get('/', function(req, res){
	res.render('home');
});

// LISTEN TO SERVER
app.listen(process.env.PORT || 3000, function(){
	console.log('[listening] ...');
});