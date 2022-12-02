const roomsCtrl = {};

const Room = require('./../models/Room');

roomsCtrl.getAllRooms = async (req, res) => {
	await Room.find({})
		.then((response) => {
			res.status(200).json({ success: true, message: 'Todas las habitaciones', data: response });
		})
		.catch((error) => {
			res.status(500).json({ success: false, message: `Ocurrio un error: ${error}` });
		});
};

roomsCtrl.getOneRoom = async (req, res) => {
	if (!req.params.id) {
		res.status(404).json({ success: false, message: 'Los valores no pueden ser nulos' });
		return;
	}
	Room.findById(req.params.id)
		.then((data) => {
			if (!data) {
				res.status(404).json({ success: false, message: 'Habitacion no encontrada' });
				return;
			}
			res.status(200).json({ success: true, message: 'Habitacion encontrada', data: data });
		})
		.catch((error) => {
			res.status(500).json({ success: false, message: `Ocurrio un error: ${error}` });
		});
};

roomsCtrl.editOneRoom = async (req, res) => {
	if (!req.params.id || !req.body.name) {
		res.status(404).json({ success: false, message: 'Los valores no pueden ser nulos' });
		return;
	}

	const { name, capacidad, camas, descripcion, wifi, tv, restroom, nevera, valor_noche, img, status } = req.body;

	Room.findByIdAndUpdate(req.params.id, {
		name,
		capacidad,
		camas,
		descripcion,
		wifi,
		tv,
		restroom,
		nevera,
		valor_noche,
		img,
		status,
	})
		.then((data) => {
			res.status(200).json({ success: true, message: 'Habitacion actualizada', data: data });
		})
		.catch((error) => {
			res.status(500).json({ success: false, message: `Ocurrio un error: ${error}` });
		});
};

roomsCtrl.insertOneRoom = async (req, res) => {
	if (
		!req.body._id ||
		!req.body.name ||
		!req.body.capacidad ||
		!req.body.camas ||
		!req.body.description ||
		!req.body.valor_noche ||
		!req.body.path_img ||
		!req.body.status
	) {
		res.status(404).json({ success: false, message: 'Los valores no pueden ser nulos' });
		return;
	}
	Room.findById(req.body._id).then((room) => {
		if (room) {
			res.status(404).json({ success: false, message: 'Lahabitación con este id ya existe' });
			return;
		}
	});

	const { _id, name, capacidad, camas, description, wifi, tv, restroom, nevera, valor_noche, path_img, status } = req.body;

	const room = new Room({
		_id,
		name,
		capacidad,
		camas,
		description,
		wifi,
		tv,
		restroom,
		nevera,
		valor_noche,
		path_img,
		status,
	});
	room.save()
		.then((user) => {
			res.status(201).json({ success: true, message: 'Habitacion insertada', data: room });
		})
		.catch((error) => {
			res.status(500).json({ success: false, message: 'Error: ' + error });
		});
};

roomsCtrl.deleteOneRoom = async (req, res) => {
	res.status(404).json({ success: false, message: 'Metodo no funcional ' });
};

module.exports = roomsCtrl;
