module.exports.config = {
    name: "resetmoney",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "chom",
    description: "Reset số tiền của cả nhóm về 0",
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
            var money = currenciesData.money;
            if (typeof money != "undefined") {
                money -= money;
                await Currencies.setData(user.id, { money });
            }
        }
    }
    return api.sendMessage("Số money của thành viên nhóm về 0 hết rùi nha :vv", event.threadID);
}