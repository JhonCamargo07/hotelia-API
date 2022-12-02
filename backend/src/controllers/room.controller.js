const roomsCtrl = {};

const Room = require('./../models/Room');

roomsCtrl.getAllRooms = async (req, res) => {
	await Room.find({})
		.then((response) => {
			res.json({ success: true, message: 'Todas las habitaciones', data: response });
		})
		.catch((error) => {
			res.json({ success: false, message: 'Ocurrio un error: ' + error });
		});
};

roomsCtrl.getOneRoom = async (req, res) => {
	if (!req.params.id) {
		res.json({ success: false, message: 'Los valores no pueden ser nulos' });
		return;
	}
	Room.findById(req.params.id)
		.then((data) => {
			res.json({ success: true, message: 'Habitacion encontrada', data: data });
		})
		.catch((error) => {
			res.json({ success: false, message: 'Ocurrio un error: ' + error });
		});
};

roomsCtrl.editOneRoom = async (req, res) => {
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
		res.json({ success: false, message: 'Los valores no pueden ser nulos' });
		return;
	}
	// Room.findById(req.params._id).then((room) => {
		// if (!room) {
		// 	res.json({ success: false, message: 'Lahabitación con este id no existe' });
		// }
	// 	return;
	// 	// else{
	// 	// 	res.json({ success: false, message: 'Si existe: ' + room });
	// 	// }
	// });


	const { _id, name, capacidad, camas, description, wifi, tv, restroom, nevera, valor_noche, path_img, status } = req.body;

	Room.findByIdAndUpdate(req.params.id, {
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
	})
		.then((room) => {
			if (!room) {
				res.json({ success: false, message: 'Lahabitación con este id no existe' });
				return;
			}
			res.json({ success: true, message: 'Habitacion actualizada', data: room });
		})
		.catch((error) => {
			res.json({ success: false, message: 'Ocurrio un error: ' + error });
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
		res.json({ success: false, message: 'Los valores no pueden ser nulos' });
		return;
	}
	Room.findById(req.body._id).then((room) => {
		if (room) {
			res.json({ success: false, message: 'Lahabitación con este id ya existe' });
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
			res.json({ success: true, message: 'Habitacion insertada', data: room });
		})
		.catch((error) => {
			res.json({ success: false, message: 'Error: ' + error });
		});
};

roomsCtrl.deleteOneRoom = async (req, res) => {
	res.json({ success: false, message: 'Metodo no funcional ' });
};

module.exports = roomsCtrl;
