const { Schema, model } = require('mongoose');

const RooomSchema = new Schema(
	{
		_id: { type: String, required: true },
		name: { type: String, required: true },
		capacidad: { type: String, required: true },
		camas: { type: String, required: true },
		description: { type: String, required: true },
		wifi: { type: String, required: false },
		tv: { type: String, required: false },
		restroom: { type: Number, required: false },
		caja_fuerte: { type: String, required: false },
		nevera: { type: String, required: false },
		valor_noche: { type: Number, required: true },
		path_img: { type: String, required: true },
		status: { type: String, required: true },
		reservas: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Reserva',
			},
		],
	},
	{ timestamps: true }
);

module.exports = model('Room', RooomSchema);
