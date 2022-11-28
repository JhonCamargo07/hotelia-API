const roomsCtrl = {};

const User = require('./../models/Room');

roomsCtrl.getAllRooms = async (req, res) => {
    await User.find({}).then((response) => {
        res.json({ success: true, message: 'Datos consultados', data: response });
    })
};

roomsCtrl.getOneRoom = async (req, res) => {
    if (!req.params.id) {
		res.json({ success: false, message: 'Los valores no pueden ser nulos' });
		return;
	}
	const User2 = new User({});
    User.findById(req.params.id).then((data)=>{
        res.json( {success: true, message: 'Todas las rutas', data: ''});
    }).catch((error)=>{
        res.json({ success: false, message: 'Ocurrio un error: ' + error });
    })
};

roomsCtrl.editOneRoom = async (req, res) => {
    if (!req.params.id || !req.body.name) {
		res.json({ success: false, message: 'Los valores no pueden ser nulos' });
		return;
	}

    const {name, capacidad, camas, descripcion, wifi, tv, restroom, nevera, valor_noche, img, status} = req.body;

	const User = new User({});
    User.findByIdAndUpdate(req.params.id, {name, capacidad, camas, descripcion, wifi, tv, restroom, nevera, valor_noche, img, status}).then((data)=>{
        res.json( {success: true, message: 'Habitacion actualizada', data: ''});
    }).catch((error)=>{
        res.json({ success: false, message: 'Ocurrio un error: ' + error });
    })
};

roomsCtrl.deleteOneRoom = async (req, res) => {
    res.json({ success: false, message: 'Metodo no funcional '});
};

module.exports = roomsCtrl;
