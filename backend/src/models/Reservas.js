const { Schema, model, models } = require('mongoose');

const ReservaSchema = new Schema(
	{
        fecha_entrada:{type:date, required: true},
        fecha_salida:{type:date, required: true},
        fecha_reserva:{type:date, required: true},
		capacidad_noches: { type: Number, required: true },
        total_reserva:{type:Number, required: true},
        user: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        room: [{
            type: Schema.Types.Number,
            ref: 'room'
        }]
	},
	{ timestamps: true }
);

module.exports = model('Reserva', ReservaSchema);
