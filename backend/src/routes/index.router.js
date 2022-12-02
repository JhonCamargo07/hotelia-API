const Router = require('express');
const join = require('path');
const nodemon = require('nodemon');
const router = Router();

router.use((req, res, next) => {
	if (!req.query.name === process.env.USER_MONGODB) {
		res.json({ title: 'Acceso denegado', message: 'El usuario no tiene acceso' });
		return;
	}
	next();
});

router.use((req, res) => {
	res.json({ success: false, message: 'Error 404, Page not found' });
});
module.exports = router;
