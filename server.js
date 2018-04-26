const express = require('express');
var app = express();
const fs = require("fs");
const yargs = require("yargs");
const _ = require("lodash");
const hbs = require('hbs');
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine', 'hbs');



app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.')
		}
	});
	next();
});

app.use((req, res, next) => {
res.render('maintenance')
});
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

const  num_cod_postal = { 
			describe: 'Nembro do CP',
			demand: true,
			alias: 'c'
			}



const 	argv = yargs
		
		.command('list', 'List all notes')
		.command('read', 'read a note',{
			num_cod_postal: num_cod_postal
		})
		
		.help()	
		.argv;


var command = argv._[0];



var fetchNotes = () => {

	try {

		var notesString = fs.readFileSync('codigos_postais.json');
		return JSON.parse(notesString);

	} catch (e) {
		return [];
	}

};


var getNote = (num_cod_postal) => {
	var notes = fetchNotes();
	var cena = String(num_cod_postal);
	var picked = _.filter(notes, { 'num_cod_postal': cena } );
	//console.log(picked);

	return picked;
	console.log("reading note", num_cod_postal);
}
if (command === 'read') {
	var note = getNote(argv.num_cod_postal);
		if (note){
			console.log("note returned");
			console.log(note);
			console.log("note returned");
		}

		else{
			console.log('erro')
		}
}
app.get('/', (req, res) => {
res.render('home', {
	pageTitle: 'Home Page',
	currentYear: new Date().getFullYear(),
	welcome: 'welcome to my page!!!'
});
});

app.get('/about', (req,res) => {
	res.render('about',{
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
})



app.get('/bad', (req, res) => {
	res.send({
		name: 'andre',
		apelido: 'cardoso'
	})
})






app.listen(3000, function(){
	console.log('server running')
})