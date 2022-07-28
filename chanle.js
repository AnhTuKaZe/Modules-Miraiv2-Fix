module.exports.config = {
    name: "chanle",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "chom",
    description: "Random chẵn lẻ",
    commandCategory: "game",
    usages: "[<C0/C2/C4/C6/C8/L1/L3/L5/L7/L9> <tiền cược>]\nNếu số đặt trùng với kết quả sẽ x3 tiền cược, đoán trúng chẵn lẻ nhận x1 tiền cược",
    cooldowns: 0
};


module.exports.run = async function ({
    args,
    api,
    event,
    Users,
    Currencies
}) {
    const joinNumberUser = args[0]
    if (!joinNumberUser) { return api.sendMessage(`» Vui lòng nhập đúng định dạng C/L+số money`, event.threadID, event.messageID) }
    const joinNumber = joinNumberUser.toLowerCase()
    const moneyUser = args[1]
    const checkNumber = joinNumber.replace(/[^0-9]/g, '')
    const checkCL = parseInt(checkNumber)
    var data = await Currencies.getData(event.senderID);
    var money = data.money
    const random = ["C0", "C2", "C4", "C6", "C8", "L1", "L3", "L5", "L7", "L9"]
    var clBot = random[Math.floor(Math.random() * random.length)];
    const checkNumberbot = clBot.replace(/[^0-9]/g, '')
    const checkCLbot = parseInt(checkNumberbot)
    if (joinNumber != "c0" && joinNumber != "c2" && joinNumber != "c4" && joinNumber != "c6" && joinNumber != "c8" && joinNumber != "l1" && joinNumber != "l2" && joinNumber != "l3" && joinNumber != "l5" && joinNumber != "l7" && joinNumber != "l9") {
        return api.sendMessage(`» Vui lòng nhập đúng định dạng C/L+số money`, event.threadID, event.messageID)
    }
    if (args[1] < 50 || isNaN(args[1])) {
        return api.sendMessage("» Mức đặt cược của bạn không phù hợp hoặc dưới 50$!!!", event.threadID, event.messageID);
    } else {
        if (money < moneyUser) {
            api.sendMessage(`» Bạn còn thiếu ${parseInt(moneyUser) - parseInt(money)}$ để chơi`, event.threadID, event.messageID)
        } else {
            if (checkCLbot % 2 == 0) {
                if (checkCLbot == checkCL) {
                    await Currencies.increaseMoney(event.senderID, parseInt(moneyUser*3));
                    return api.sendMessage(`» Bạn đã thắng\n» Cộng: ${moneyUser*3}$\n» Kết quả: ${clBot}`, event.threadID, event.messageID)
                } else
                if (checkCL % 2 == 0 && joinNumber.slice(0, 1) == "c") {
                    await Currencies.increaseMoney(event.senderID, parseInt(moneyUser));
                    return api.sendMessage(`» Bạn đã thắng\n» Cộng: ${moneyUser}$\n» Kết quả: ${clBot}`, event.threadID, event.messageID)
                } else
                    await Currencies.decreaseMoney(event.senderID, parseInt(moneyUser));
                return api.sendMessage(`» Bạn đã thua\n» Trừ: ${moneyUser}$\n» Kết quả: ${clBot}`, event.threadID, event.messageID)
                if (checkCL % 2 == 0 && joinNumber.slice(0, 1) == "l") {
                    await Currencies.decreaseMoney(event.senderID, parseInt(moneyUser));
                    return api.sendMessage(`Bạn đã thua\n» Trừ: ${moneyUser}$\nKết quả: ${clBot}`, event.threadID, event.messageID)
                } else
                    await Currencies.increaseMoney(event.senderID, parseInt(moneyUser));
                return api.sendMessage(`» Bạn đã thắng\n» Cộng: ${moneyUser}$\n» Kết quả: ${clBot}`, event.threadID, event.messageID)
            } else if (checkCLbot % 2 != 0) {
                if (checkCLbot == checkCL) {
                    await Currencies.increaseMoney(event.senderID, parseInt(moneyUser*3));
                    return api.sendMessage(`» Bạn đã thắng\n» Cộng: ${moneyUser*3}$\n» Kết quả: ${clBot}`, event.threadID, event.messageID)
                } else
                if (checkCL % 2 != 0 && joinNumber.slice(0, 1) == "l") {
                    await Currencies.increaseMoney(event.senderID, parseInt(moneyUser));
                    return api.sendMessage(`» Bạn đã thắng\n» Cộng: ${moneyUser}$\nKết quả: ${clBot}`, event.threadID, event.messageID)
                } else
                    await Currencies.decreaseMoney(event.senderID, parseInt(moneyUser));
                return api.sendMessage(`» Bạn đã thua\n» Trừ: ${moneyUser}$\n» Kết quả: ${clBot}`, event.threadID, event.messageID)
                if (checkCL % 2 != 0 && joinNumber.slice(0, 1) == "c") {
                    await Currencies.decreaseMoney(event.senderID, parseInt(moneyUser));
                    return api.sendMessage(`» Bạn đã thua\n» Trừ: ${moneyUser}$\nKết quả: ${clBot}`, event.threadID, event.messageID)
                } else
                    await Currencies.increaseMoney(event.senderID, parseInt(moneyUser));
                return api.sendMessage(`» Bạn đã thắng\n» Cộng: ${moneyUser}$\n» Kết quả: ${clBot}`, event.threadID, event.messageID)
            }
        }
    }
}