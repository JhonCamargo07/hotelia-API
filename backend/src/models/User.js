const { Schema, model, models } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		lastname: { type: String, required: false },
		fecha_nacimiento: { type: Date, required: false },
		genero: { type: String, required: false },
		telefono: { type: String, required: false },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		pais_origen: { type: String, required: false },
		tipo_user: { type: String, required: false },
		name_img: { type: String, required: true },
		path_img: { type: String, required: true },
		Reserva: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Reserva',
			},
		],
	},
	{ timestamps: true }
);

UserSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(11);
	return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (passwordNotHash, passwordWithHash) {
	return await bcrypt.compare(passwordNotHash, passwordWithHash);
};

module.exports = model('User', UserSchema);
