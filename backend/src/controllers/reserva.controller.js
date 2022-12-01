const reservaCtrl = {};

const Reserva = require('./../models/Reservas');

reservaCtrl.getAllReservas = async (req, res) => {
	await Reserva.find({})
		.then((response) => {
			res.json({ success: true, message: 'Todas las reservas', data: response });
		})
		.catch((error) => {
			res.json({ success: false, message: 'Ocurrio un error: ' + error });
		});
};

reservaCtrl.deleteOneReserva = async (req, res) => {
	res.json({ success: false, message: 'Metodo no funcional ' });
};

module.exports = reservaCtrl;
