const commonFunctions = require('../util/common-functions');
const fs = require('fs');

let proxId = 0;
let userCollection = [];

fs.readFile(__dirname + '/../../db/user.txt', (err, res) => {
    if(res.length > 0) {
        userCollection = JSON.parse(res);
    }
});

function gravarDados() {
    fs.writeFile(__dirname + '/../../db/user.txt', JSON.stringify(userCollection), (err) => {
        if (err) throw err;
    })
}

const barberShopRepository = {

    getAll() {
        return userCollection;
    },

    getOne(id) {
        return userCollection.find(item => item.id === id);
    },

    insert(barberShop) {
        barberShop.id = ++proxId;
        userCollection.push(barberShop);
        gravarDados();
        return barberShop;
    },

    update(id, newBody) {
        userCollection[commonFunctions.getPositionInCollection(id, userCollection)] = newBody;
        newBody.id = id;
        gravarDados();
        return newBody;
    },

    remove(id) {
        gravarDados();
        return userCollection.splice(commonFunctions.getPositionInCollection(id, userCollection), 1);
    },

    getByUsername(name) {
        return userCollection.find(item => item.username === name);
    }
}

module.exports = barberShopRepository;