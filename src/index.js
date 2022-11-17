import express from 'express';
import nodemon from 'nodemon';
import colors from 'colors';
import path from 'path';
import morgan from 'morgan';
import * as url from 'url';
import router from './routes/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const app = express();
app.set('appName', 'Hotelia API - Jhon Camargo');
app.set('port', process.env.PORT || 64022);

// Settings
app.use(morgan('dev'));
app.use(express.json());
app.use(express.text());

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// Midelwares
// app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(router);

app.use('/public', express.static('./public'))

app.listen(app.get('port'), function () {
	console.log(`App '${app.get('appName')}' corriendo en el puerto ${app.get('port')}`.red);
	console.log(`Go to server: ${'http://127.0.0.1:'}${this.address().port.toString()}`.blue);
});