const saveChannel = (rssChannel, channelId, url) => {
    const query = {'channelId': channelId};
    const itemForSave = {'channelId': channelId, 'url': url};

    rssChannel.findOneAndUpdate(query, itemForSave, {upsert:true}, (err, data) => {
        if (err) {
            console.log("save Error:" + err);
        } else {
            console.log("saved item:" + JSON.stringify(data));
        }
    });
};

const getChannelList = (rssChannel, cb) => {
    rssChannel.find({}).lean()
        .then(channels => {
            cb(channels.map(channel => {return {channelId: channel.channelId, url: channel.url};}));
        })
        .catch(err => {console.error(err)});
};

const getRssItems = (rssItem, channelId, cb) => {
    rssItem.find({channelId : channelId}).lean()
        .then(items => {
            cb(items.map(item => {return             {
                channelId: item.channelId,
                category: item.category,
                link: item.link,
                pubDate: item.pubDate,
                title: item.title
            };}));
        })
        .catch(err => {console.error(err)});
};


module.exports = {
    saveChannel: saveChannel,
    getChannelList: getChannelList,
    getRssItems: getRssItems
};