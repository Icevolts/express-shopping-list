// Item from the shopping cart db
const items = require('./fakeDb');

class Item{
    constructor(name,price){
        this.name = name;
        this.price = price;
        items.push(this);
    }

    static findAll(){
        return items
    }

    // Finds item by name
    static find(name){
        const foundItem = items.find(val => val.name === name);
        if(foundItem === undefined){
            throw{msg: 'Item Not Found', status: 404}
        }
        return foundItem;
    }

    // Updates foundItem by name with new data
    static update(name,data){
        let foundItem = Item.find(name);
        if(foundItem === undefined){
            throw{msg: 'Item Not Found', status: 404}
        }
        foundItem.name = data.name;
        foundItem.price = data.price;

        return foundItem;
    }

    // Delete foundItem by index number
    static remove(name){
        let foundItem = items.findIndex(val => val.name === name);
        if(foundItem === -1){
            throw{msg: 'Item Not Found', status: 404}
        }
        items.splice(foundItem,1);
    }
}

module.exports = Item;