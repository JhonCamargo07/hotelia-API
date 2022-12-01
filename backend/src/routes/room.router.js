const Router = require('express');
const { insertOneRoom, getAllRooms, getOneRoom, editOneRoom, deleteOneRoom } = require('../controllers/room.controller.js');

const router = Router();

router.get('/rooms', getAllRooms);
router.post('/room', insertOneRoom);
router.get('/room/:id', getOneRoom);
router.put('/room/:id', editOneRoom);
router.put('/room/:id', deleteOneRoom);

module.exports = router;
