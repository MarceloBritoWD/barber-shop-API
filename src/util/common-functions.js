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

    readData(sourceFile) {
        fs.readFile(__dirname + sourceFile, (err, res) => {
            if(res.length > 0) {
                return JSON.parse(res);
            }
        });
    }
}

module.exports = functions;