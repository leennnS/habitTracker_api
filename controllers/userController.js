const userService = require('../services/userServices');

class UserController {
    
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUserById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createUser(req, res) {
    try {
      const { name, email,created_at,updated_at } = req.body;
      if (!name || !email || !created_at ||!updated_at) {
        return res.status(400).json({ message: 'Name and email are required' });
      }
      const newUser = await userService.createUser({ name, email });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateUser(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
      }
      const success = await userService.updateUser(id, { name, email });
      if (!success) {
        return res.status(404).json({ message: 'User not found or no changes made' });
      }
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await userService.deleteUser(id);
      if (!success) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new UserController();


/*const userService= require(`../services/userServices`);
class UserController{
    //await and async are alwasys together 
    async getAllUsers(req,res){
        try{
            const users= await userService.getallusers();
            res.json(users);
        }catch(e){
            console.error(`Error fetching user ${e}`);
            res.status(500).json({message: "error fetchoing users",int})
        }
    }

    async getuserById(req,res){
        try{
        const id = parseInt(req,param.id);
        const user = await userService.getuserById(id);
        res.json(user);
    }catch(e){
        console.error(`Error fetching user ${id}`);
        res.status(500).send({message: "error fetchoing users",int})
    }
        
    }
    async createUser(req,res){
        const{name,email,password}=req.body;
        const newUser = await userService.createUser({name,email,pass});
        res.status(201).json(newUser);//check when 200 when 201 500 when internal server error
    }
    async updateUser(req,res){
        const id = req.query.id
        const{name,email,password}=req.body;
        const update = await userService.updateUser(id,{name,email,pass});
        res.status(201).json(update);//check when 200 when 201 500 when internal server error
    }
}
module.exports=new UserController.js*/
// controllers/userController.js
