const usersCtrl = {};

const User = require('./../models/User');

usersCtrl.SignUp = async (req, res) => {
	if (!req.body.email || !req.body.password || !req.file) {
		res.status(200).json({ success: false, message: 'Los valores no pueden ser nulos' });
		return;
	}
	const errors = [];

	const { name, email, password, confirm_password } = req.body;

	if (password != confirm_password) {
		errors.push({ title: 'Passwords do no match' });
	}
	if (password.length < 10) {
		errors.push({ title: 'Passwords must be at least 10 characteres.' });
	}

	if (errors.length > 0) {
		res.status(200).json({ success: false, message: errors });
		return;
	}
	const emailUser = await User.findOne({ email: email });
	if (emailUser) {
		res.status(200).json({ success: false, message: `El usuario ya existe, intente con otro` });
		return;
	}
	const newUser = new User({ name, email });
	newUser.password = await newUser.encryptPassword(password);
	newUser.name_img = req.file.filename;
	newUser.path_img = '/public/img/' + req.file.filename;
	await newUser.save();
	res.status(201).json({ success: true, message: `Usuario registrado exitosamente`, data: newUser });
};

usersCtrl.SignIn = async (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.status(200).json({ success: false, message: 'Los valores no pueden ser nulos' });
		return;
	}
	const { name, email, password } = req.body;
	const UserNuevo = new User({ name, email, password });

	const user = await User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				res.status(200).json({ success: false, message: 'Las credenciales son incorrectas' });
				return;
			}
			UserNuevo.matchPassword(password, user.password).then((isCorrrect) => {
				if (!isCorrrect) {
					res.status(200).json({ success: false, message: 'Las credenciales son incorrectas' });
					return;
				}
				res.status(200).json({ success: true, message: 'Usuario correcto', data: user });
				return user;
			});
		})
		.catch((err) => {
			res.status(500).json({ success: false, message: `Ocurrio un error: ${error}` });
			return err;
		});
};

usersCtrl.logout = (req, res, next) => {
	req.logout(function (err) {
		req.flash('error_msg', err);
		return next(err);
	});
	req.flash('success_msg', 'You are logged out now.');
	res.redirect('signin');
};

module.exports = usersCtrl;
