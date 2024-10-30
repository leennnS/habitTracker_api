const orderItemService = require('../services/orderItemService');

class OrderItemController {

  async getAllOrderItems(req, res) {
    try {
      const orderItems = await orderItemService.getAllOrderItems();
      res.json(orderItems);
    } catch (error) {
      console.error('Error fetching order items:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getOrderItemById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const orderItem = await orderItemService.getOrderItemById(id);
      if (!orderItem) {
        return res.status(404).json({ message: 'Order item not found' });
      }
      res.json(orderItem);
    } catch (error) {
      console.error('Error fetching order item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createOrderItem(req, res) {
    try {
      const { order_id, item_id, quantity } = req.body;
      if (!order_id || !item_id || !quantity) {
        return res.status(400).json({ message: 'Order ID, Item ID, and quantity are required' });
      }
      const newOrderItem = await orderItemService.createOrderItem({ order_id, item_id, quantity });
      res.status(201).json(newOrderItem);
    } catch (error) {
      console.error('Error creating order item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateOrderItem(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { quantity } = req.body;
      if (!quantity) {
        return res.status(400).json({ message: 'Quantity is required' });
      }
      const success = await orderItemService.updateOrderItem(id, { quantity });
      if (!success) {
        return res.status(404).json({ message: 'Order item not found or no changes made' });
      }
      res.json({ message: 'Order item updated successfully' });
    } catch (error) {
      console.error('Error updating order item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteOrderItem(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await orderItemService.deleteOrderItem(id);
      if (!success) {
        return res.status(404).json({ message: 'Order item not found' });
      }
      res.json({ message: 'Order item deleted successfully' });
    } catch (error) {
      console.error('Error deleting order item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new OrderItemController();


