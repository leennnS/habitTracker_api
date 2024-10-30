const { initDB } = require('../config/database');
const Product = require('../models/userModel');

class ProductService {
  constructor() {
    this.pool = null;
    this.init();
  }

  async init() {
    this.pool = await initDB();
  }

  async getAllProducts() {
    try{
    const [rows] = await this.pool.query('SELECT * FROM products'); //add the query
    return rows.map(Product.fromRow);
    }catch(e){
        //propagate an error to the controller 
        throw new Error();
    }
  }

  async getProductById(id) {
    const [rows] = await this.pool.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return Product.fromRow(rows[0]);
  }

  async createProduct(productData) {
    const { name, email } = productData;
    const [result] = await this.pool.query(
      'INSERT INTO products (name, price, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
      [name, email]
    );
    return { id: result.insertId, name, email };
  }

  async updateProduct(id, productData) {
    const { name, email } = userData;
    const [result] = await this.pool.query(
      'UPDATE users SET name = ?, email = ?, updated_at = NOW() WHERE id = ?',
      [name, email, id]
    );
    return result.affectedRows > 0;
  }

  async deleteUser(id) {
    const [result] = await this.pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new ProductService();
