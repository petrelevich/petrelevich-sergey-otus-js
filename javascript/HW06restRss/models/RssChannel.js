const mongoose = require('mongoose');

const model = mongoose.model("RssChannels", {
    channelId: String,
    url: String
});

module.exports = {
    model: model
};