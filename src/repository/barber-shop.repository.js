const commonFunctions = require('../util/common-functions');
const fs = require('fs');

let proxId = 0;
let barberShopCollection = [];

fs.readFile(__dirname + '/../../db/barber-shop.txt', (err, res) => {
    if(res.length > 0) {
        barberShopCollection = JSON.parse(res);
    }
});

function gravarDados() {
    fs.writeFile(__dirname + '/../../db/barber-shop.txt', JSON.stringify(barberShopCollection), (err) => {
        if (err) throw err;
    })
}

const barberShopRepository = {
    getAll() {
        return barberShopCollection;
    },

    getOne(id) {
        return barberShopCollection.find(item => item.id === id);
    },

    //TODO: Create rate schema and logic
    getRating(id) {
        return 'Fake data to Rating of ' + id;
    },

    insert(barberShop) {
        barberShop.id = ++proxId;
        barberShopCollection.push(barberShop);
        gravarDados();
        return barberShop;
    },

    update(id, newBarberShop) {
        barberShopCollection[commonFunctions.getPositionInCollection(id, barberShopCollection)] = newBarberShop;
        newBarberShop.id = id;
        gravarDados();
        return newBarberShop;
    },

    remove(id) {
        gravarDados();
        return barberShopCollection.splice(commonFunctions.getPositionInCollection(id, barberShopCollection), 1);
    },

    //TODO: Create schedule schema and logic
    schedule(id, body) {
        return body;
    },

    //TODO: Create rate schema and logic
    rate(id, body) {
        return body;
    }
}

module.exports = barberShopRepository;