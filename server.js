var express = require('express');
var bodyParser = require('body-parser')

var headers = {'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "default-src 'self' devmountain.github.io"};

var app = express();

app.use(bodyParser.json());

var messages = [
	{
		'username' : 'smurfbot',
		'message': 'hey',
		'time' : new Date()
	},
	{ 
		'username' : 'smurfbot',
		'message': 'what up',
		'time' : new Date()
	}
];

app.get('/', function (req, res, next) {
	res.status(200).set(headers).json(messages);
	res.status(200).json(messages);
});

app.post('/', function (req, res, next) {
	messages.push( { username: req.body.username, message: req.body.message, time: new Date() } );
	res.status(200).set(headers).json(messages);
	res.status(200).json(messages);
});

app.options('/', function (req, res, next) {
	res.set(headers).send()
});



app.listen(3000, function () {
	console.log('listening');
})