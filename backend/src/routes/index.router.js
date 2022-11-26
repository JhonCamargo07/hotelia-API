const Router = require('express');
const join = require('path');
const nodemon = require('nodemon');
const router = Router();

router.get('/', (req, res) => {
	if (req.query.name === process.env.USER_MONGODB) {
		res.json({ message: 'Hola mundo desde aquí, desde mi latinoamerica unida' });
		return;
	}
	res.json({ title: 'Acceso denegado', message: 'El usuario no tiene acceso' });
});

router.use((req, res) => {
	res.json({ messaje: 'error 404', message: 'Page no found' });
});
module.exports = router;
