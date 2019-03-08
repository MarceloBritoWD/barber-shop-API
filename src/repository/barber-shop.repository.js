const commonFunctions = require('../util/common-functions');
const collectionSourcePath = '/../../db/barber-shop.txt';

let proxId = 0;
let barberShopCollection = [];
commonFunctions.readData(collectionSourcePath, (res) => {
    barberShopCollection = res;
})

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
        commonFunctions.saveData(collectionSourcePath, barberShopCollection);
        return barberShop;
    },

    update(id, newBarberShop) {
        barberShopCollection[commonFunctions.getPositionInCollection(id, barberShopCollection)] = newBarberShop;
        newBarberShop.id = id;
        commonFunctions.saveData(collectionSourcePath, barberShopCollection);
        return newBarberShop;
    },

    remove(id) {
        commonFunctions.saveData(collectionSourcePath, barberShopCollection);
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