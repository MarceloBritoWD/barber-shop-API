const commonFunctions = require('../util/common-functions');
const collectionSource = '/../../db/user.txt';

let proxId = 0;
let userCollection = commonFunctions.readData(collectionSource, userCollection) || [];

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
        commonFunctions.saveData(collectionSource, userCollection);
        return barberShop;
    },

    update(id, newBody) {
        userCollection[commonFunctions.getPositionInCollection(id, userCollection)] = newBody;
        newBody.id = id;
        commonFunctions.saveData(collectionSource, userCollection);
        return newBody;
    },

    remove(id) {
        commonFunctions.saveData(collectionSource, userCollection);
        return userCollection.splice(commonFunctions.getPositionInCollection(id, userCollection), 1);
    },

    getByUsername(name) {
        return userCollection.find(item => item.username === name);
    }
}

module.exports = barberShopRepository;