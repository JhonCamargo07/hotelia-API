const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const nodemon = require('nodemon');
const path = require('path');
const cors = require('cors');

const app = express();

// Settings
app.use(morgan('dev'));
app.use(express.json());
app.use(express.text());
app.set('appName', 'Hotelia API - Jhon Camargo');
app.set('port', process.env.PORT || 64022);
app.set('host', process.env.HOST || '127.0.0.1');

app.use(cors());

app.use((req, res, next) => {
	if (!req.query.name === process.env.USER_MONGODB) {
		res.json({ title: 'Acceso denegado', message: 'El usuario no tiene acceso' });
		return;
	}
	next();
});

app.use(require('./routes/users.router.js'));
app.use(require('./routes/index.router.js'));

app.listen(app.get('port'), function () {
	console.log(`App '${app.get('appName')}' corriendo en el puerto ${app.get('port')}`.red);
	console.log(`Go to server: http://${app.get('host')}:${this.address().port.toString()}`.blue);
});

module.exports = app;
