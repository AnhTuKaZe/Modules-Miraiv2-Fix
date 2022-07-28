module.exports.config = {
    name: "ping",
    version: "0.0.3",
    hasPermssion: 1,
    credits: "chom",
    description: "tag toàn bộ thành viên",
    commandCategory: "Nhóm",
    usages: "[Text]",
    cooldowns: 10
};

module.exports.run = async function({ api, event, args, Threads }) {
    // const permission = ["100063050334248", "100000520496560"];
    // if (!permission.includes(event.senderID))
    // return api.sendMessage("Tuổi lồn dùng lệnh này.", event.threadID, event.messageID);
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");

    try {
        var all = (await Threads.getInfo(event.threadID)).participantIDs;
        all.splice(all.indexOf(api.getCurrentUserID()), 1);
        all.splice(all.indexOf(event.senderID), 1);
        var body = (args.length != 0) ? args.join(" ") : "https://www.facebook.com/NguyenNgocAnhTu.VN",
            mentions = [],
            index = 0;

        for (let i = 0; i < all.length; i++) {
            if (i == body.length) body += body.charAt(body.length - 1);
            mentions.push({
                tag: body[i],
                id: all[i],
                fromIndex: i - 1
            });
        }

        return api.sendMessage({ body, mentions }, event.threadID, event.messageID);

    } catch (e) { return console.log(e); }
}