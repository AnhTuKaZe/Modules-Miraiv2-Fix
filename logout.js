module.exports.config = {
    name: "logout",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "chom",
    description: "Đăng xuất",
    commandCategory: "admin",
    usages: "",
    cooldowns: 0
};

module.exports.run = async function({ api, event }){
    const permission = ["100045609437771", "100061321638702"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Bạn làm gì vậy :>", event.threadID, event.messageID);
api.sendMessage("Đang đăng xuất...",event.threadID,event.messageID)
api.logout()
}
