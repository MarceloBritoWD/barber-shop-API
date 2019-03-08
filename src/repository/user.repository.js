const commonFunctions = require('../util/common-functions');
const collectionSourcePath = '/../../db/user.txt';

let proxId = 0;
let userCollection = [];
commonFunctions.readData(collectionSourcePath, (res) => {
    userCollection = res;
})

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
        commonFunctions.saveData(collectionSourcePath, userCollection);
        return barberShop;
    },

    update(id, newBody) {
        userCollection[commonFunctions.getPositionInCollection(id, userCollection)] = newBody;
        newBody.id = id;
        commonFunctions.saveData(collectionSourcePath, userCollection);
        return newBody;
    },

    remove(id) {
        commonFunctions.saveData(collectionSourcePath, userCollection);
        return userCollection.splice(commonFunctions.getPositionInCollection(id, userCollection), 1);
    },

    getByUsername(name) {
        return userCollection.find(item => item.username === name);
    }
}

module.exports = barberShopRepository;