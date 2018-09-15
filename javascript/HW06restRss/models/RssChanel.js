const mongoose = require('mongoose');

const model = mongoose.model("RssChanels", {
    chanelId: String,
    url: String
});

module.exports = {
    model: model
};