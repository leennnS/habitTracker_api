const orderService = require('../services/orderService');

class OrderController {

  async getAllOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getOrderById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const order = await orderService.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createOrder(req, res) {
    try {
      const { user_id, total_amount } = req.body;
      if (!user_id || !total_amount) {
        return res.status(400).json({ message: 'User ID and total amount are required' });
      }
      const newOrder = await orderService.createOrder({ user_id, total_amount });
      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateOrder(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { total_amount } = req.body;
      if (!total_amount) {
        return res.status(400).json({ message: 'Total amount is required' });
      }
      const success = await orderService.updateOrder(id, { total_amount });
      if (!success) {
        return res.status(404).json({ message: 'Order not found or no changes made' });
      }
      res.json({ message: 'Order updated successfully' });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteOrder(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await orderService.deleteOrder(id);
      if (!success) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new OrderController();