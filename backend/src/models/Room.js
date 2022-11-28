const { Schema, model, models } = require('mongoose');

const RooomSchema = new Schema(
	{
        _id: {type: Number},
		name: { type: String, required: true },
		capacidad: { type: String, required: true },
        camas: { type: String, required: true },
        description: { type: String, required: true },
        wifi: { type: String, required: true },
        tv: { type: String, required: true },
        restroom: { type: String, required: true },
        caja_fuerte: { type: String, required: true },
        nevera: { type: String, required: true },
        valor_noche: { type: Number, required: true },
        img: { type: String, required: true },
        status: { type: String, required: true },
        reservas: [{
            type: Schema.Types.ObjectId,
            ref: 'Reserva'
        }]
	},
	{ timestamps: true }
);

module.exports = model('Room', RooomSchema);
