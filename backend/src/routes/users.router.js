const Router = require('express');
const { SignIn, SignUp, logout } = require('./../controllers/users.controller.js');

const router = Router();

router.post('/signin', SignIn);
router.post('/signup', SignUp);

module.exports = router;
