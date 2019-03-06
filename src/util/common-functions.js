const functions = {
    getPositionInCollection (id, collection) {
        return collection.findIndex(item => item.id === id)
    }
}

module.exports = functions;