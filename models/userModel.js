// models/userModel.js

class User {
    constructor(id, name, email, created_at, updated_at) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  
    static fromRow(row) {
      return new User(
        row.id,
        row.name,
        row.email,
        row.created_at,
        row.updated_at
      );
    }
  }
  
  module.exports = User;