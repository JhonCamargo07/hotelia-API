const usersCtrl = {};

const User = require('./../models/User');

usersCtrl.SignUp = async (req, res) => {
	const errors = [];

	const { name, email, password, confirm_password } = req.body;

	if (password != confirm_password) {
		errors.push({ title: 'Passwords do no match' });
	}
	if (password.length < 4) {
		errors.push({ title: 'Passwords must be at least 4 characteres.' });
	}

	if (errors.length > 0) {
		res.json({ success: false, error: errors });
	} else {
		const emailUser = await User.findOne({ email: email });
		if (emailUser) {
			res.json({ success: false, error: `El usuario ya existe, intente con otro` });
		} else {
			const newUser = new User({ name, email, password });
			newUser.password = await newUser.encryptPassword(password);
			await newUser.save();
			res.json({ success: true, error: `Usuario registrado exitosamente` });
		}
	}
};

usersCtrl.SignIn = async (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.json({ success: false, error: 'Los valores no pueden ser nulos' });
		return;
	}
	const { name, email, password } = req.body;
	const UserNuevo = new User({ name, email, password });

	const user = await User.find({ email: email })
		.then((user) => {
			if (!user) {
				res.json({ success: false, error: 'Las credenciales son incorrectas' });
			} else {
				if (!UserNuevo.matchPassword(password, user.password)) {
					res.json({ success: false, error: 'Las credenciales son incorrectas' });
				} else {
					res.json({ success: true, message: 'Usuario correcto', data: user });
				}
			}
		})
		.catch((err) => {
			res.json({ success: false, error: `Error del sistema ${err}` });
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
