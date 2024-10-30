const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();


router.get('/', (req, res) => orderController.getAllOrders(req, res));
router.get('/:id', (req, res) => orderController.getOrderById(req, res));
router.post('/', (req, res) => orderController.createOrder(req, res));
router.put('/:id', (req, res) => orderController.updateOrder(req, res));
router.delete('/:id', (req, res) => orderController.deleteOrder(req, res));

module.exports = router;
