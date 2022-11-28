const { Schema, model, models } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		apellido: { type: String, required: true },
		fecha_nacimiento: { type: Date, required: true },
		genero: { type: String, required: true },
		telefono: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		pais_origen: { type: String, required: true },
		tipo_user: { type: String, required: true },
		img: { type: String, required: true },
		Reserva:[{
			type: Schema.Types.ObjectId,
            ref: 'Reserva'
		}]
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
