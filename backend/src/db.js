// const mongoose = require('mongoose');
const mongoose = require('mongoose');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;

// const MONGODB_URI = `mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASSWORD_MONGODB}@veterinary.lwmg6ag.mongodb.net/hotels`;
const MONGODB_URI  = `mongodb://${process.env.USER_MONGODB}:${process.env.PASSWORD_MONGODB}@ac-iupc0bq-shard-00-00.lwmg6ag.mongodb.net:27017,ac-iupc0bq-shard-00-01.lwmg6ag.mongodb.net:27017,ac-iupc0bq-shard-00-02.lwmg6ag.mongodb.net:27017/hotels?ssl=true&replicaSet=atlas-kx8fk2-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose
	.connect(MONGODB_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log(`Base de datos conectada:`))
	.catch((err) => console.log(err));
