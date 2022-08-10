const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const item_controller = require('../controllers/item.controller');

router.get('', auth,item_controller.items_list);
router.post('/add',auth, item_controller.item_create);
router.get('/:id',auth, item_controller.item_details);
router.post('/update',auth, item_controller.update_item);
router.post('/delete',auth, item_controller.delete_item);

module.exports = router;