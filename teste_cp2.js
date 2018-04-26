const express = require('express');
var app = express();
const fs = require("fs");
const yargs = require("yargs");
const _ = require("lodash");

const  num_cod_postal = { 
			describe: 'Nemro do CP',
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
	console.log(picked);

	return picked;
	console.log("reading note", num_cod_postal);
}
if (command === 'read') {
	var note = getNote(argv.num_cod_postal);
		if (note){
			console.log("note returned");
			console.log(note);
		}

		else{
			console.log(note)
		}
}
app.get('/', (req, res) => {
res.send('<h1> raiz</h1>');
});

app.get('/about', (req,res) => {
	res.send('About Page');
});









app.listen(3000, function(){
	console.log('server running')
})