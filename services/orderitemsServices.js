const { initDB } = require('../config/database');
const OrderItem = require('../models/orderItemModel');

class OrderItemService {
  constructor() {
    this.pool = null;
    this.init();
  }

  async init() {
    this.pool = await initDB();
  }

  async getAllOrderItems() {
    const [rows] = await this.pool.query('SELECT * FROM order_items');
    return rows.map(OrderItem.fromRow);
  }

  async getOrderItemById(id) {
    const [rows] = await this.pool.query('SELECT * FROM order_items WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return OrderItem.fromRow(rows[0]);
  }

  async createOrderItem(orderItemData) {
    const { order_id, item_id, quantity } = orderItemData;
    const [result] = await this.pool.query(
      'INSERT INTO order_items (order_id, item_id, quantity, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [order_id, item_id, quantity]
    );
    return { id: result.insertId, order_id, item_id, quantity };
  }

  async updateOrderItem(id, orderItemData) {
    const { quantity } = orderItemData;
    const [result] = await this.pool.query(
      'UPDATE order_items SET quantity = ?, updated_at = NOW() WHERE id = ?',
      [quantity, id]
    );
    return result.affectedRows > 0;
  }

  async deleteOrderItem(id) {
    const [result] = await this.pool.query('DELETE FROM order_items WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new OrderItemService();
