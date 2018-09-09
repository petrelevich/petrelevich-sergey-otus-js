
const get = (mongoose, collectionToSave) => {
    return mongoose.model(collectionToSave, {
        guid: String,
        title: String,
        link: String,
        description: String,
        pubDate: String,
        category: String
    });
};

module.exports = {
    get: get
};