// services/userService.js
const { initDB } = require('../config/database');
const User = require('../models/userModel');

class UserService {
  constructor() {
    this.pool = null;
    this.init();
  }

  async init() {
    this.pool = await initDB();
  }

  async getAllUsers() {
    const [rows] = await this.pool.query('SELECT * FROM users');
    return rows.map(User.fromRow);
  }

  async getUserById(id) {
    const [rows] = await this.pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return User.fromRow(rows[0]);
  }

  async createUser(userData) {
    const { name, email,created_at,updated_at } = userData;
    const [result] = await this.pool.query(
      'INSERT INTO users (name, email, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
      [name, email]
    );
    return { id: result.insertId, name, email };
    //const insertedUser= new User(result.insertId,name,email)
    //return insertedUser;
  }
w
  async updateUser(id, userData) {
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

module.exports = new UserService();
