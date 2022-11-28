const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const nodemon = require('nodemon');
const { join } = require('path');
const cors = require('cors');
const multer = require('multer');
const uuid = require('uuid');

const app = express();

// Settings

const storage = multer.diskStorage({
	destination: join(__dirname, 'public/img'),
	filename: (req, file, cb) => {
		console.log(file);
		cb(null, `${uuid()}${extname(file.originalname)}`);
	},
});
app.use(multer({ storage }).single('image'));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.text());

// app.use(multer({ dest: join(__dirname, 'public/img') }).single('image'));

app.set('appName', 'Hotelia API - Jhon Camargo');
app.set('port', process.env.PORT || 64022);
app.set('host', process.env.HOST || '127.0.0.1');

app.use((req, res, next) => {
	if (!req.body.nameAdmin === process.env.USER_MONGODB || !req.body.passwordAdmin === process.env.PASSWORD_MONGODB) {
		res.json({ title: 'Acceso denegado', message: 'El usuario no tiene acceso' });
		return;
	}
	next();
});

app.use('/public', express.static(join(__dirname, 'public')));

app.use(require('./routes/users.router.js'));
app.use(require('./routes/room.router.js'));
app.use(require('./routes/index.router.js'));

app.listen(app.get('port'), function () {
	console.log(`App '${app.get('appName')}' corriendo en el puerto ${app.get('port')}`.red);
	console.log(`Go to server: http://${app.get('host')}:${this.address().port.toString()}`.blue);
});

module.exports = app;
