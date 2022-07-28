module.exports.config = {
    name: "resetexp",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "chom",
    description: "delete all",
    commandCategory: "admin",
    usages: "[cc], [del], [all]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, Currencies }) => {
  const permission = ["100045609437771", "100061321638702"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Bạn làm gì vậy :>", event.threadID, event.messageID);
    const data = await api.getThreadInfo(event.threadID);
    for (const user of data.userInfo) {
        var currenciesData = await Currencies.getData(user.id)
        if (currenciesData != false) {
            var exp = currenciesData.exp;
            if (typeof exp != "undefined") {
                exp -= exp;
                await Currencies.setData(user.id, { exp });
            }
        }
    }
    return api.sendMessage("Giờ ai cũng ngu như ai nhỉ :vv", event.threadID);
}