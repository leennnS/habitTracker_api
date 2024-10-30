const userService = require ('../services/itemService');

class ItemController {

    async getAllItems(req,res){
        try{
            const items = await itemServices.getAllItems();
            res.json(items);
        }catch(error){
            console.error('Error fetching items:',error);
            res.status(500).json({message:'Internal server error'});
        }
    }

    async getItemById(req,res){
        try{
            const id = parseInt(req.params.id,10);
            const item = await itemServices.getItemById(id);
            if(!item){
                return res.status(404).json({message:'Item not found'});
            }
            res.json(item);
        }catch(error){
            console.error('Error fetching item',error);
            res.status(500).json({message:'Internal server error'});
        }
    }

    async createItem(req,res){
        try{
            const {name,price} = req.body;
            if(!name || !price){
                return res.status(400).json({message:'Name and price are required'});

            }
            const newItem = await itemServices.createItem({name,price});
            res.status(201).json(newItem);
        }catch(error){
            console.error('Error creating item:',error);
            res.status(500).json({message:'Internal server error'});
        }
    
    }
    async updateItem(req,res){
        try{
            const id = parseInt(req.params.id,10);
            const{name,price} = req.body;
            if(!name || !price){
                return res.status(400).json({message:'Name and price are required'});

            }
            const success = await itemServices.updateItem(id,{name,price});
            if(!success){
                return res.status(404).json({message:' Item not found'});
            }
            res.json({ message: 'Item updated successfully' });
        }catch(error){
            console.error('Error updating item',error);
                res.status(500).json({message:'Internal server error'});
            
        }
    }
    async deleteItem(req,res){
        try{
            const id = parseInt(req.params.id,10);
            const success = await itemServices.deleteItem(id);
            if(!success){
                return res.status(404).json({message:'Item not found'});
            }
                res.json({message:'Item deleted successfully'});

            
        }catch(error){
            console.error('Error deleting item:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}
module.export = new ItemController();