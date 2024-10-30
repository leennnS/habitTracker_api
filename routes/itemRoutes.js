const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.get('/',(req,res) => itemController.getAllItems(req,res));
router.get('/:id', (req, res) => itemController.getItemById(req, res));
router.post('/', (req, res) => itemController.createItem(req, res));
router.put('/:id', (req, res) => itemController.updateItem(req, res));
router.delete('/:id', (req, res) => itemController.deleteItem(req, res));

module.exports = router;