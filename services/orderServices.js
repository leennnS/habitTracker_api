const { initDB } = require('../config/database');
const Order = require('../models/orderModel');

class OrderService {
  constructor() {
    this.pool = null;
    this.init();
  }

  async init() {
    this.pool = await initDB();
  }

  async getAllOrders() {
    const [rows] = await this.pool.query('SELECT * FROM orders');
    return rows.map(Order.fromRow);
  }

  async getOrderById(id) {
    const [rows] = await this.pool.query('SELECT * FROM orders WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return Order.fromRow(rows[0]);
  }

  async createOrder(orderData) {
    const { user_id, total_amount } = orderData;
    const [result] = await this.pool.query(
      'INSERT INTO orders (user_id, total_amount, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
      [user_id, total_amount]
    );
    return { id: result.insertId, user_id, total_amount };
  }

  async updateOrder(id, orderData) {
    const { total_amount } = orderData;
    const [result] = await this.pool.query(
      'UPDATE orders SET total_amount = ?, updated_at = NOW() WHERE id = ?',
      [total_amount, id]
    );
    return result.affectedRows > 0;
  }

  async deleteOrder(id) {
    const [result] = await this.pool.query('DELETE FROM orders WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new OrderService();