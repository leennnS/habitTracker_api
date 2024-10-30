const express = require('express');
const orderItemController = require('../controllers/orderItemController');

const router = express.Router();


router.get('/', (req, res) => orderItemController.getAllOrderItems(req, res));
router.get('/:id', (req, res) => orderItemController.getOrderItemById(req, res));
router.post('/', (req, res) => orderItemController.createOrderItem(req, res));
router.put('/:id', (req, res) => orderItemController.updateOrderItem(req, res));
router.delete('/:id', (req, res) => orderItemController.deleteOrderItem(req, res));

module.exports = router;