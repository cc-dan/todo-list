const Sequelize = require('sequelize');
var json = require('../assets/list.json');

console.log(JSON.stringify(json[0].name));

// Connect to database
const sequelize = new Sequelize('folders', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

// Create Model
const Folder = sequelize.define('folder', {
    name: {
        type: Sequelize.STRING
    },

    items: {
        type: Sequelize.JSON
    }
});

const Item = sequelize.define('item', {
    text: {
        type: Sequelize.STRING
    },

    checked: {
        type: Sequelize.BOOLEAN
    }
});

sequelize
    .sync({force: true})
    .then((result) => { 
        Folder.create({
            name: "Main",
            items: json[0].items
        });
        console.log(result); })
    .catch((err) => { 
        console.log(err); 
    });

/*
// Create instance
const jane = User.build({ firstName: "Jane", lastName: "Doe" });
await jane.save(); // save to database

// Shortcut for creating instance and saving to database at once
const jane = await User.create({ firstName: "Jane", lastName: "Doe" });

// Find all users
const users = await User.findAll();
console.log(users.every(user => user instanceof User)); // true
console.log("All users:", JSON.stringify(users, null, 2));

console.log("hello world")*/