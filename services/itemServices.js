const {initDB} = require('../config/database');
const Item  = require('../models/itemModel');

class ItemService {
    constructor(){
        this.pool = null;
        this.init();

    }

    async init(){
        this.pool = await initDB();
    }

    async getAllItems(){
        const [rows] = await this.pool.query(' SELECT * FROM items');
        return rows.map(Item.fromRow);
    }
    async getItemById(id){
        const[rows] = await this.pool.query('SELECT * FROM items WHERE id = ?', [id]);
        if(rows.length === 0) return null;
        return Item.fromRow(rows[0]);
    }
    async createItem(itemData){
        const {name,price} = itemData;
        const [result] = await this.pool.query('INSERT INTO items(name,price,created_at,updated_at) VALUES (?,?,NOW(),NOW())',
        [name,price]);
        return {id:result.insertId,name,price};
    }
    async updateItem(id,itemData){
        const {name,price} = itemData;
        const [result] = await this.pool.query('UPDATE items SET name = ?, price = ?, updated_at = NOW() WHERE id = ?',
            [name, price, id]);
        return result.affectedRows>0;

    }
    async deleteItem(id) {
        const [result] = await this.pool.query('DELETE FROM items WHERE id = ?', [id]);
        return result.affectedRows > 0;
      }

}
module.exports = new ItemService();
