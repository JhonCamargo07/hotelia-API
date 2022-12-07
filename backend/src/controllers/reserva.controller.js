const reservaCtrl = {};

const Reserva = require('./../models/Reservas');

reservaCtrl.getAllReservas = async (req, res) => {
	await Reserva.find({})
		.then((response) => {
			res.status(200).json({ success: true, message: 'Todas las reservas', data: response });
		})
		.catch((error) => {
			res.status(500).json({ success: false, message: `Ocurrio un error: ${error}` });
		});
};

reservaCtrl.deleteOneReserva = async (req, res) => {
	res.status(200).json({ success: false, message: 'Metodo no funcional' });
};

module.exports = reservaCtrl;
