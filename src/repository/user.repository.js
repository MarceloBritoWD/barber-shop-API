const commonFunctions = require('../util/common-functions');
let proxId = 0;
let userCollection = [];

userCollection.push(
    {
        username: 'rafael',
        password: 123,
        roles: ['USER'],
        email: 'capoliveira@gmail.com'
    },
    {
        username: 'marcelobrito',
        password: 321,
        roles: ['ADMIN'],
        email: 'marcelobritowd@gmail.com'
    }
);


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
        return barberShop;
    },

    update(id, newBody) {
        userCollection[commonFunctions.getPositionInCollection(id, userCollection)] = newBody;
        newBody.id = id;
        return newBody;
    },

    remove(id) {
        return userCollection.splice(commonFunctions.getPositionInCollection(id, userCollection), 1);
    },

    getByUsername(name) {
        return userCollection.find(item => item.username === name);
    }
}

module.exports = barberShopRepository;