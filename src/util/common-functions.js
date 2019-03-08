const fs = require('fs');

const functions = {
    getPositionInCollection (id, collection) {
        return collection.findIndex(item => item.id === id)
    },

    saveData(sourceFile, collection) {
        fs.writeFile(__dirname + sourceFile, JSON.stringify(collection), (err) => {
            if (err) throw err;
        })
    },

    readData(sourceFile, callback) {
        fs.readFile(__dirname + sourceFile, (err, res) => {
            if (err) throw err;

            if(res.length > 0) {
               callback(JSON.parse(res));
            }
        });
    }
}

module.exports = functions;