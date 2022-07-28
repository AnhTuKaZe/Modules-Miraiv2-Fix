module.exports.config = {
    name: "reload",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "chom",
    description: "Khởi động lại Bot",
    commandCategory: "Penguin",
    usages: "reload + time",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
 const permission = ["100045609437771"];
             if (!permission.includes(event.senderID))
             return api.sendMessage("《Muốn reload sao ừ bạn không đủ tuổi》", event.threadID, event.messageID);
    const { threadID, messageID } = event;
    var time = args.join(" ");
    var rstime = "68";
    if (!time) rstime = "69";
    else rstime = time;
    api.sendMessage(`[Bot] => Sẽ reload lại bot sau ${rstime} giây nữa !`, threadID);
    return setTimeout(() => { api.sendMessage("[Bot] => Đang Reload Bot !",event.threadID,() => process.exit(1) )}, rstime * 1000);
}