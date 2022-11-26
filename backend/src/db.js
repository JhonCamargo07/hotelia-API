// const mongoose = require('mongoose');
const mongoose = require('mongoose');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;

const MONGODB_URI = `mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASSWORD_MONGODB}@veterinary.lwmg6ag.mongodb.net/hotels`;

// const MONGODB_URI = `mongodb://127.0.0.1/notes-app`;
mongoose
	.connect(MONGODB_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log(`Base de datos conectada:`))
	.catch((err) => console.log(err));
