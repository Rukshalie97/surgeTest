const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const user_controller = require('../controllers/user.controller');

router.get('',auth, user_controller.users_list);
router.post('/login', user_controller.user_login);
router.post('/user', user_controller.user_create);

module.exports = router;