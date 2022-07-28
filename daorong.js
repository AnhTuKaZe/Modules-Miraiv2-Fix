const path = require("path");
const { mkdirSync, writeFileSync, existsSync, createReadStream, readdirSync } = require("fs-extra")
const axios = require("axios")

module.exports.config = {
    name: "daorong",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "chom",
    description: "Đảo rồng nhiều người",
    commandCategory: "Game",
    usages: "[]",
    cooldowns: 0
};


module.exports.onLoad = async () => {
    const dir = __dirname + `/daorong/datauser/`;
    const _dir = __dirname + `/daorong/datauser/`;
    const __dir = __dirname + `/daorong/cache/`;
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    if (!existsSync(_dir)) mkdirSync(_dir, { recursive: true });
    if (!existsSync(__dir)) mkdirSync(__dir, { recursive: true });
    return;
}

module.exports.checkPath = function (type, senderID) {
    const pathGame = path.join(__dirname, 'daorong', 'datauser', `${senderID}.json`);
    const pathGame_1 = require("./daorong/datauser/" + senderID + '.json');
    if (type == 1) return pathGame
    if (type == 2) return pathGame_1
}

module.exports.image = async function(link) {
    var images = [];
    let download = (await axios.get(link, { responseType: "arraybuffer" } )).data; 
        writeFileSync( __dirname + `/daorong/cache/daorong.png`, Buffer.from(download, "utf-8"));
        images.push(createReadStream(__dirname + `/daorong/cache/daorong.png`));
    return images
}

module.exports.run = async function ({ api, event, args, client,Threads,__GLOBAL, Users, Currencies,getText }) {
   const { senderID, messageID, threadID } = event;
     const axios = require('axios');
    const request = require('request');
    const fs = require('fs-extra');
    const pathData = path.join(__dirname, 'daorong', 'datauser', `${senderID}.json`);
    switch (args[0]) {
        case 'register':
        case '-r': {
            const nDate = new Date().toLocaleString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh'
            });
            if (!existsSync(pathData)) {
                var obj = {};
                obj.name = (await Users.getData(senderID)).name;
                obj.ID = senderID;
                obj.shield = 3
                obj.coins = 20000
                obj.Island = {};
                obj.Island.level = 1
                obj.Island.coinsLV = 200
                obj.Island.data = {};
                obj.Island.data.tower = 0
                obj.Island.data.tree = 0
                obj.Island.data.pool = 0
                obj.Island.data.pet = 0
                obj.spin = 20
                obj.timeRegister = nDate
                writeFileSync(pathData, JSON.stringify(obj, null, 4));
                return api.sendMessage("🔱 Đăng kí thành công tiến vào đấu trường", threadID, messageID);
            } else return api.sendMessage("⚔🔱 Bạn đã có trong cơ sở dữ liệu", threadID, messageID);

        }
        case 'spin': {
            if (!existsSync(pathData)) {
                return api.sendMessage({body: `Bạn chưa đăng kí game!`, attachment: await this.image('https://imgur.com/ZhrgXGJ.gif')}, threadID, messageID);
            }
            if(this.checkPath(2, senderID).spin == 0) return api.sendMessage('» Bạn đã hết lượt quay vui lòng mua thêm lượt hoặc đợi 5phut để hệ thống tự tặng bạn thêm lượt quay', threadID, messageID);
            this.checkPath(2, senderID).spin = parseInt(this.checkPath(2, senderID).spin) - 1;
            writeFileSync(this.checkPath(1, senderID), JSON.stringify(this.checkPath(2, senderID), null, 4));
            var items = [`${this.checkPath(2, senderID).Island.level * 1000} coins`, `${this.checkPath(2, senderID).Island.level * 3000} coins`, `${this.checkPath(2, senderID).Island.level * 5000} coins`, 'Hùm Long', 'Tử Xà Long', 'Sao bé bự', '1 lượt quay', '2 lượt quay', '7 lượt quay', '5 lượt quay' , 'Hắc Long 30 sao'];
            var getItem = items[Math.floor(Math.random() * items.length)];
            var i = this.getSpin(items, getItem, senderID);
            api.sendMessage({body: `Chúc mừng bạn quay trúng : ${getItem}`, attachment: await this.image('https://imgur.com/0Z0parX.jpg')}, threadID, messageID);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const data = readdirSync(__dirname + `/daorong/datauser`);
            if(i == 3) {
                if(data.length < 4) return api.sendMessage(`Cần ít nhất có 3 người chơi trên server để trộm rồng :3`, threadID, messageID);
                const dem = [];
                for (let i of data) { 
                    if(i != `${senderID}.json`) {
                        dem.push(require(`./daorong/datauser/${i}`));
                    }
                }
                dem.sort((a, b) => a.coins + b.coins);
                var msg = `Số tiền cao nhất là: ${dem[0].coins / 2}\n`
                const randomIndex = dem.sort(function() { return .5 - Math.random() });
                for(var i = 0; i < 3; i ++) {
                    msg += `${i+1}. ${randomIndex[i].name} - Rồng level ${randomIndex[i].Island.level}\n`
                }
                msg += 'Vui lòng reply với lựa chọn bạn muốn trộm rồng của đối phương'
                return api.sendMessage(`==========\n${msg}`, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "steal",
                        dem,
                        randomIndex
                    })
                }, messageID);
            }
            else if(i == 5) {
                if(data.length < 4) return api.sendMessage(`Cần ít nhất có 3 người chơi trên server để tấn công người chơi`, threadID, messageID);
                var msgf = `[====ATTACK====]\n`, number = 1, p = [];
                for (let i of data) { 
                    if(i != `${senderID}.json`) {
                        var o = require(`./daorong/datauser/${i}`);
                        p.push(o)
                        msgf += `${number++}. ${o.name} - Đảo level ${o.Island.level}\n`
                    }
                }
                return api.sendMessage(msgf, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "attack",
                        p
                    })
                }, messageID);
            }
            break;
        }
        case 'build': 
        case 'xaydung': {
            if (!existsSync(pathData)) {
                return api.sendMessage({body: "Bạn chưa đăng kí game!", attachment: await this.image('https://imgur.com/nFGX42pt.jpg')}, threadID, messageID);
            }
            var a = require(`./daorong/datauser/${senderID}.json`);
            return api.sendMessage(`» Nâng cấp đảo\n1.Chuồng nuôi - ${a.Island.coinsLV * (a.Island.data.tower + 1)} coins (${a.Island.data.tower}/50)\n2.Chuồng ấp - ${a.Island.coinsLV * (a.Island.data.tree + 1)} coins(${a.Island.data.tree}/50)\n3.Chuồng lai - ${a.Island.coinsLV * (a.Island.data.pool + 1)} coins (${a.Island.data.pool}/50)\n4.Môi trường sống - ${a.Island.coinsLV * (a.Island.data.pet + 1)} coins (${a.Island.data.pet}/50)\n==============`, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "build"
                })
            }, messageID);
        }
        case 'shop': {
            if (!existsSync(pathData)) {
                return api.sendMessage({body: "Bạn chưa đăng kí game!", attachment: await this.image('https://imgur.com/bZqS5tx.jpg')}, threadID, messageID);
            }
     return api.sendMessage({body: `── [ Shop ] ──  \n\n🔱Danh sách rồng bạn có thể mua\n[🔱1].Hàn Phi Tuyết\n[🔱2].Bất Tử Điểu\n[🔱3].Rồng Rùa\n[🔱4].Ngũ Sắc\n[🔱5].Hắc Long 35 sao\n[🔱6].Huyền Vũ Long\n[🔱7].Việt Hải Long Vương\n[🔱8].Kỳ Long\n[🔱9].Thần Long\n[⭐️] Hãy reply tin nhắn bot và kèm theo số`, attachment: await this.image('https://imgur.com/ULwGlLx.jpg')}, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "shop"
                })
            }, messageID);
        }
        case 'đấu': {
            if (!existsSync(pathData)) {
                return api.sendMessage({body: "Bạn chưa đăng kí game!", attachment: await this.image('https://imgur.com/DDx1Emo.jpg')}, threadID, messageID);
            }
     return api.sendMessage({body: `── [ CHỌN ĐẢO THI ĐẤU ] ──  \n\n❤️ Chọn đảo để thi đấu\n[🗺1].Đảo dung nham\n[🗺2].Đảo Tuyết\n[🗺3].Đảo thần tiên\n`, attachment: await this.image('https://imgur.com/varoTlL.jpg')}, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "đấu"
                })
            }, messageID);
        }
        case 'me':
        case 'info': {
            if (!existsSync(pathData)) {
                return api.sendMessage({body: "Bạn chưa đăng kí game!", attachment: await this.image('https://imgur.com/gWuh3JT.jpg')}, threadID, messageID);
            }
            var a = require(`./daorong/datauser/${senderID}.json`);
            return api.sendMessage(`⭐️ KHO ĐỒ NÂNG CẤP ⭐️\n- ... ${a.Island.level}\n- Số lượt quay còn lại: ${a.spin}\n- Coins: ${a.coins}\n- Đảo:\n• ... (${a.Island.data.tower}/50)\n• ... (${a.Island.data.tree}/50)\n• ... (${a.Island.data.pool}/50)\n• ... (${a.Island.data.pet}/50)`, threadID, messageID);
        }
        case 'top': {
            if (!existsSync(pathData)) {
                return api.sendMessage({body: "Bạn chưa đăng kí game!", attachment: await this.image('https://imgur.com/k3JyZfJ.jpg')}, threadID, messageID);
            }
            const data = readdirSync(__dirname + `/daorong/datauser`);
            if(data.length < 3) return api.sendMessage(`Cần ít nhất có 3 người chơi trên server để xem top`, threadID, messageID);
            var p = []
            for (let i of data) { 
                var o = require(`./daorong/datauser/${i}`);
                p.push(o)
                msgf += `${number++}. ${o.name} - Đảo level ${o.Island.level}\n`
            }
            p.sort((a, b) => b.Island.level - a.Island.level);
            var msg = '===TOP 3 CHUỒNG LEVEL CAO NHẤT===\n'
            for(var i = 0; i < 3; i++) {
                msg += `${i+1}. ${p[i].name} với đảo level ${p[i].Island.level}\n`
            }
            return api.sendMessage(msg, threadID, messageID);
        }
        default: {
            return api.sendMessage({body: `===[ ĐẢO RỒNG ]===\n» R: Đăng kí\n» SPIN: Vòng quay game\n» BUILD: Nâng cấp đảo\n» SHOP: Shop mua rồng\n» INFO: Xem thông tin về bạn\n» TOP: Xem top level trên server\n» CHANGE: Quy đổi tiền của bot sang tiền game và ngược lại\nĐẤU\n------------\nSENBOT`, attachment: await this.image('https://imgur.com/02aVCzn.jpg')}, threadID, messageID);
        }
    }
}
module.exports.handleReply = async ({ event, api, Currencies, handleReply, Users, getText}) => {

  const { body, threadID, messageID, senderID } = event;
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
    switch (handleReply.type) {
        case 'build': {
            var a = require(`./daorong/datauser/${senderID}.json`);
            var l = ['tower', 'tree', 'pool', 'pet']
            if(a.coins < a.Island.coinsLV * (a.Island.data[l[parseInt(body) - 1]] + 1)) return api.sendMessage(`Bạn không đủ số coins trong game để xây dựng!`, threadID, messageID);
            a.coins = a.Island.coinsLV * (a.Island.data[l[parseInt(body) - 1]] + 1);
            await Currencies.decreaseMoney(senderID, a.Island.coinsLV * (a.Island.data[l[parseInt(body) - 1]] + 1));
            api.unsendMessage(handleReply.messageID)
            if(body == 1) {
                if(a.Island.data.tower == 50) return api.sendMessage('Cấp bậc khu vực này đang ở mức tối đa nên không thể xây dựng', threadID, messageID);
                a.Island.data.tower = a.Island.data.tower + 10;
                api.sendMessage(`Xây dựng thành công: ${a.Island.data.tower}/50`, threadID, messageID);
            }
            if(body == 2) {
                if(a.Island.data.tree == 50) return api.sendMessage('Cấp bậc khu vực này đang ở mức tối đa nên không thể xây dựng', threadID, messageID);
                a.Island.data.tree = a.Island.data.tree + 10;
                api.sendMessage(`Xây dựng thành công: ${a.Island.data.tree}/50`, threadID, messageID);
            }
            if(body == 3) {
                if(a.Island.data.pool == 50) return api.sendMessage('Cấp bậc khu vực này đang ở mức tối đa nên không thể xây dựng', threadID, messageID);
                a.Island.data.pool = a.Island.data.pool + 10;
                api.sendMessage(`Xây dựng thành công: ${a.Island.data.pool}/50`, threadID, messageID);
            }
            if(body == 4) {
                if(a.Island.data.pet == 50) return api.sendMessage('Cấp bậc khu vực này đang ở mức tối đa nên không thể xây dựng', threadID, messageID);
                a.Island.data.pet = a.Island.data.pet + 10;
                api.sendMessage(`Nâng cấp thành công: ${a.Island.data.pet}/50`, threadID, messageID);
            }
            if(a.Island.data.tower == 50 && a.Island.data.tree == 50 && a.Island.data.pool == 50 && a.Island.data.pet == 50) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                api.sendMessage(`Nâng cấp của bạn đã đạt được cấp tối đa!\nBạn sẽ được nâng cấp lên đảo ${(a.Island.level) + 1}`, threadID, messageID);
                a.Island.level = a.Island.level + 1;
                a.Island.coinsLV = a.Island.coinsLV + 100;
                a.Island.data.tower = 0;
                a.Island.data.tree = 0;
                a.Island.data.pool = 0;
                a.Island.data.pet = 0;
            }
            return writeFileSync(this.checkPath(1, senderID), JSON.stringify(a, null, 4));
        }
        case 'shop': {
            if(body == 1) {
                return api.sendMessage({body: `⭐️ MUA THÀNH CÔNG ⭐️\n[🚘]Tên :Hàn Phi Tuyết
[⚜️]Thông Tin : Hệ tuyết
`, attachment: await this.image('https://imgur.com/21h9GjC.gif')}, threadID, messageID);
            }
            else if(body == 2) {
                return api.sendMessage({body: `⭐️ MUA THÀNH CÔNG ⭐️\n[🚘]Tên :Bất Tử Điểu
[⚜️]Thông Tin : Hệ lửa
`, attachment: await this.image('https://imgur.com/ibKdCxZ.gif')}, threadID, messageID);
            }
            else if(body == 3) {

                return api.sendMessage({body: `⭐️ MUA THÀNH CÔNG ⭐️\n[🚘]Tên :Rồng Rùa
[⚜️]Thông Tin : Hệ lửa / Nước
`, attachment: await this.image('https://imgur.com/u5A54FB.gif')}, threadID, messageID);
             }
            else if(body == 4) {
                return api.sendMessage({body: `⭐️ MUA THÀNH CÔNG ⭐️\n[🚘]Tên :Ngũ Sắc
[⚜️]Thông Tin : Hệ Tâm Linh
`, attachment: await this.image('https://imgur.com/AmA2F7f.gif')}, threadID, messageID);
            }
            else if(body == 5) {
                return api.sendMessage({body: `⭐️ MUA THÀNH CÔNG ⭐️\n[🚘]Tên : Hắc Long 35 sao
[⚜️]Thông Tin : Bóng Tối
`, attachment: await this.image('https://imgur.com/0gj6SaM.gif')}, threadID, messageID);
            }
            else if(body == 6) {
                return api.sendMessage({body: `⭐️ MUA THÀNH CÔNG ⭐️
[🚘] Tên: Huyễn Vũ Long 
[⚜️] Thông Tin: Hệ Mộc
`, attachment: await this.image('https://imgur.com/75F61Cd.gif')}, threadID, messageID);
            }
            else if(body == 7) {
                return api.sendMessage({body: `⭐️ MUA THÀNH CÔNG ⭐️
[🚘] Tên: Việt Hải Long
[⚜️] Thông Tin: Hệ Nước
`, attachment: await this.image('https://imgur.com/6ls6O2A.gif')}, threadID, messageID);
            }
            else if(body == 8) {
                return api.sendMessage({body: `⭐️ MUA THÀNH CÔNG ⭐️
[🚘] Tên: Kỳ Long
[⚜️] Thông Tin: Hệ Tâm Linh
`, attachment: await this.image('https://imgur.com/EDpNf25.gif')}, threadID, messageID);
            }
            else if(body == 9) {
                return api.sendMessage({body: `⭐️ MUA THÀNH CÔNG ⭐️
[🚘] Tên: Thần Long
[⚜️] Thông Tin: Hệ Tâm Linh
`, attachment: await this.image('https://imgur.com/8l5FXH7.gif')}, threadID, messageID);
            }
            else {
                return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
            }
        }

         case 'mua': {
            if(body == 1) {
                return api.sendMessage('Vui lòng reply tin nhắn này với số tiền bạn muốn đổi! Chiết khấu 0%', threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "botcoins"
                    })
                }, messageID);
            }
            else if(body == 2) {
                return api.sendMessage('Vui lòng reply tin nhắn này với số tiền bạn muốn đổi! Chiết khấu 0%', threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "coinsbot"
                    })
                }, messageID);
            }
            else if(body == 3) {
                return api.sendMessage('Vui lòng reply tin nhắn này với số lượt quay bạn muốn mua! (10 lượt quay 2000$)', threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "spinn"
                    })
                }, messageID);
            }
            else {
                return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
            }
        }
        case 'đua': {
            if(body == 1) {
  var coindaorong = Math.floor(Math.random() * 80000) + 10000;
  var huhong = Math.floor(Math.random() * 90) + 20;
                return api.sendMessage({body: `⭐️ THI ĐẤU ⭐️\n[🗺] MAPS: Đảo dung nham.\n[🏆] Chúc Mừng bạn đã chiến thắng đối thủ\n» Giải thưởng của bạn là: ${coindaorong}$\n» Thua: ${huhong}%`, attachment: await this.image('https://imgur.com/PUCFwqp.jpg')}, threadID, messageID);
        }
            else if(body == 2) {
               var coindaorong = Math.floor(Math.random() * 80000) + 10000;
  var huhong = Math.floor(Math.random() * 90) + 20;
                return api.sendMessage({body: `⭐️ THI ĐẤU ⭐️\n[🗺] MAPS: Đảo tuyết.\n[🏆] Chúc Mừng bạn đã chiến thắng đối thủ\n» Giải thưởng của bạn là: ${coindaorong}$\n» Thua: ${huhong}%`, attachment: await this.image('https://imgur.com/FLMkCGK.jpg')}, threadID, messageID);
        }
            else if(body == 3) {
   var coindaorong = Math.floor(Math.random() * 80000) + 10000;
  var huhong = Math.floor(Math.random() * 90) + 20;
                return api.sendMessage({body: `⭐️ THI ĐẤU ⭐️\n[🗺] MAPS: Thần Tiên.\n[🏆] Chúc Mừng bạn đã chiến thắng đối thủ\n» Giải thưởng của bạn là: ${coindaorong}$\n» Thua: ${huhong}%`, attachment: await this.image('https://imgur.com/k3JyZfJ.jpg')}, threadID, messageID);
            }
        }        
        case 'spinn': {
            await checkMoney(senderID, parseInt(body));
            api.unsendMessage(handleReply.messageID)
            await Currencies.decreaseMoney(senderID, parseInt(body));
            a.spin = a.spin + parseInt(body)
            writeFileSync(this.checkPath(1, senderID), JSON.stringify(a, null, 4));
            return api.sendMessage(`Mua thành công ${body} lượt quay (${parseInt(body) * 200}$`, threadID, messageID);
        }
        case 'botcoins': {
            var a = require(`./daorong/datauser/${senderID}.json`);
            await checkMoney(senderID, parseInt(body));
            api.unsendMessage(handleReply.messageID)
            await Currencies.decreaseMoney(senderID, parseInt(body));
            a.coins = a.coins + parseInt(body)
            writeFileSync(this.checkPath(1, senderID), JSON.stringify(a, null, 4));
            return api.sendMessage(`Nạp thành công ${body} coins vào game!`, threadID, messageID);
        }
        case 'coinsbot': {
            var a = require(`./daorong/datauser/${senderID}.json`);
            if(a.coins < parseInt(body)) return api.sendMessage('Bạn không đủ tiền để thực hiện giao dịch này!', threadID, messageID);
            api.unsendMessage(handleReply.messageID)
            await Currencies.increaseMoney(senderID, parseInt(body));
            a.coins = a.coins - parseInt(body)
            writeFileSync(this.checkPath(1, senderID), JSON.stringify(a, null, 4));
            return api.sendMessage(`Rút thành công ${body} coins về tài khoản bot!`, threadID, messageID);
        }
    }
    async function checkMoney(senderID, maxMoney) {
        var i, w;
        i = (await Currencies.getData(senderID)) || {};
        w = i.money || 0
        if (w < parseInt(maxMoney)) return api.sendMessage('Bạn không đủ tiền để thực hiện giao dịch này!', threadID, messageID);
    }
}
module.exports.getSpin = function (items, getItem, senderID) {
    const path = this.checkPath(1, senderID)
    var pathData = this.checkPath(2, senderID)
    var i = items.findIndex(index => index == getItem);
    if(i == 0) pathData.coins = parseInt(pathData.coins) + pathData.Island.level * 1000
    if(i == 1) pathData.coins = parseInt(pathData.coins) + pathData.Island.level * 3000
    if(i == 2) pathData.coins = parseInt(pathData.coins) + pathData.Island.level * 5000
    if(i == 4) {
        if(pathData.shield != 3) {
            pathData.spin = parseInt(pathData.spin) + 1
            pathData.shield = parseInt(pathData.shield) + 1;
        }
    }
    if(i == 6) pathData.spin = parseInt(pathData.spin) + 1
    if(i == 7) pathData.spin = parseInt(pathData.spin) + 2
    if(i == 8) pathData.spin = parseInt(pathData.spin) + 5
    writeFileSync(path, JSON.stringify(pathData, null, 4));
    return i
}