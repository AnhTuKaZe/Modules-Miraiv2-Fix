const axios = require('axios');
module.exports.config = {
	name: "keobov2", // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: "1.0.0", // phiên bản của module này
	hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: "chom", // Công nhận module s�� hữu là ai
	description: "", // Thông tin chi tiết về lệnh
	commandCategory: "game", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
	usages: "[option] [text]", // Cách sử dụng lệnh
	cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
    envConfig: {
        key: "sen12345"
    }
};


module.exports.handleEvent = async({ api, event, Currencies, Users }) => {
    const { key } = global.configModule[this.config.name];
    const { threadID, senderID, body } = event;
    if(!("keobo" in global.client)) global.client.keobo = {};
    if (!([senderID] in global.client.keobo)) return;
    const { increaseMoney, decreaseMoney } = Currencies;
    let input = body.trim().toLowerCase();
    if(input == "kéo") {
        if (global.client.keobo[senderID].count == 0) api.unsendMessage(global.client.keobo[senderID].msgID);
        global.client.keobo[senderID].count++;
        if (global.client.keobo[senderID].count > 1) return;
        setTimeout(async () => {
            let { data } = await axios.get(encodeURI(`https://PowerlessSqueakyRecursion.minhnguyen200.repl.co/keobo/${global.client.keobo[senderID].count}_${global.client.keobo[senderID].bo}_${key}`))
                                        .catch(e => { return api.sendMessage("Đã có lỗi xảy ra...", threadID, () => console.log(e)) });
            let pName = await Users.getNameUser(senderID) || "Ai đó";
            let reward = global.client.keobo[senderID].bet*data.reward
            return api.sendMessage({
                body: pName + (data.output == true ? `, bạn đã kéo thành công!\nNhận được: ${reward}$` : `, bạn đã kéo hụt!\nMất ${global.client.keobo[senderID].bet}$`),
                attachment: (await axios.get(encodeURI(data.image), { responseType: "stream" }).catch(e => console.log(e))).data
            }, threadID, async () => {
                await increaseMoney(senderID, parseInt(reward));
                delete global.client.keobo[senderID];
            });
        }, 4000);
    }
}

module.exports.handleReply = async ({ api, event, handleReply }) => {
    const { threadID, senderID, body } = event;
    if (handleReply.author != senderID) return;
    if(!("keobo" in global.client)) global.client.keobo = {};
    const input = parseInt(body.trim());
    if(isNaN(input)) return api.sendMessage("Bạn phải nhập một số!", threadID);
    if(1 > input || input > 5) return api.sendMessage("Bạn chỉ có thể chọn từ 1 đến 5", threadID);
    const sendM = (msg, bo) => api.sendMessage(msg, threadID, (err, info) => {
        global.client.keobo[senderID] = {
            spam: 4,
            count: 0,
            bo,
            author: senderID,
            bet: handleReply.bet,
            msgID: info.messageID
        }
    });
    api.unsendMessage(handleReply.messageID);
    var msg = `Bạn đã chọn bò ${input}!\nNhập "kéo" để bắt đầu\nvà liên tục nhập "kéo" trong 4s sau đó để kéo bò`;
    sendM(msg, input);

}

module.exports.run = async ({ api, event, Threads, args, Currencies }) => {
    const { threadID, messageID, senderID } = event;
    const { increaseMoney, decreaseMoney } = Currencies;
    
    if(!args[0]) {
        //getPrefix
        const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
        const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
        return api.sendMessage({
            body: `[-o KÉO BÒ  o-]\n=o> Để bắt đầu chơi, dùng: \n${prefix+this.config.name} [số tiền] (tối thiểu 50$)\nBò càng thưởng nhiều thì tỉ lệ kéo trúng càng thấp.`,
            attachment: (await axios.get('https://i.ibb.co/LdhS9J9/keobo-Banner.jpg', { responseType: "stream" }).catch(e => console.log(e))).data
        }, threadID);
    }
    var bet = parseInt(args[0]);
    if (isNaN(bet)) return api.sendMessage("Bạn phải nhập một số!", threadID);
    if (bet < 50) return api.sendMessage("Bạn phải nhập một số lớn hơn 50!", threadID);
    await decreaseMoney(senderID, bet);
    return api.sendMessage({
        body: `Chọn bò:\n1. Bò 1 [${args[0]}$]\n2. Bò 2 [${args[0] * 2}$]\n3. Bò 3 [${args[0] * 12}$]\n4. Bò 4 [${args[0] * 144}$]\n5. Bò 5 [${args[0] * 2880}$]\nReply tin nhắn này với số`,
        attachment: (await axios.get('https://i.ibb.co/2dgF3vf/keobogif.gif', { responseType: "stream" }).catch(e => console.log(e))).data
    }, threadID, (err, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: senderID,
            bet
        });
    }, messageID);
}