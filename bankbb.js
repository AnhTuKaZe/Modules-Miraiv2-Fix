module.exports.config = {
    name: "bankbb",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "chom",
    description: "Play rps.",
    commandCategory: "game",
    usages: "[kéo/búa/bao]",
    cooldowns: 0
};
module.exports.run = async function ({ api, args, event, Threads, Users }) {
    const { threadID, messageID, senderID } = event;

  if (!global.rps) global.rps = new Map();
  var gameThread = global.rps.get(threadID) || {};

  if (args[0] == 'create') {
    if (global.rps.has(threadID)) return api.sendMessage('Hiện tại đã có nhóm chơi không thể khởi tạo.', threadID, messageID);
    if (!args[1]) return api.sendMessage('Bạn chưa nhập số thành viên yêu cầu!', threadID, messageID);
    if (isNaN(args[1]) == true) return api.sendMessage('Số thành viên yêu cầu không hợp lệ!', threadID, messageID);
    if (args[1] < 2) return api.sendMessage('Không được nhập số thành viên ít hơn 2 thành viên!', threadID, messageID);
    global.rps.set(threadID, { author: senderID, start: false, max: args[1], player: [senderID], choose: [], win: [], lose: [], draw: [] });
    return api.sendMessage('Đã tạo thành công nhóm chơi mới!\nSố thành viên yêu cầu để bắt đầu game: ' + args[1] + ' thành viên\nTrạng thái: 1/' + args[1], threadID, messageID);
  }
  if (args[0] == 'join') {
    if (!gameThread) return api.sendMessage('Nhóm này hiện chưa có nhóm chơi!', threadID, messageID);
    if (gameThread.start == true) return api.sendMessage('Nhóm này đã bắt đầu trò chơi! bạn không thể tham gia', threadID, messageID);
    if (gameThread.player.some(i => i.toString() == senderID)) return api.sendMessage('Bạn đã tham gia nhóm này.', threadID, messageID);
    gameThread.player.push(senderID);
    if (gameThread.player.length == gameThread.max) {
      api.sendMessage('Trạng thái: ' + gameThread.player.length + '/' + gameThread.max, threadID);
      var list = await api.getThreadInfo(threadID);
      setTimeout(() => {
        gameThread.start = true;
        api.sendMessage('Đã đủ ' + gameThread.max + ' người tham gia, đang tạo game vui lòng chờ...', threadID);
        var bot = ['bao', 'kéo', 'búa'];
        var rps_bot = bot[Math.floor(Math.random() * bot.length)];
        setTimeout(() => {
          api.sendMessage('Tạo thành công, vui lòng kiểm tra tin nhắn của bot (Nếu không thấy thì kiểm tra trong spam hoặc tin nhắn chờ!)', threadID);
          for (var id of gameThread.player) {
            api.sendMessage('vui lòng reply(Phản hồi) tin nhắn này và chọn số thích ứng với lựa chọn của bạn\n\n1.Kéo\n2.Bao\n3.Búa', id, (err, info) => {
              global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                threadID,
                rps_bot,
                list
              })
            })
          }
        }, 1000)
      }, 100);
    }
    else {
      return api.sendMessage('Trạng thái: ' + gameThread.player.length + '/' + gameThread.max, threadID);
    }
  }
  if (args[0] == 'end') {
    if (!gameThread) return api.sendMessage('Nhóm này hiện chưa có nhóm chơi!', threadID, messageID);
    if (gameThread.author != senderID) return api.sendMessage('Bạn không phải chủ nhóm.', threadID, messageID);
    global.rps.delete(threadID);
    return api.sendMessage('Đã xóa nhóm chơi!', threadID, messageID);
  }
}
module.exports.handleReply = async function ({ event, api, Threads, Users, handleReply }) {
  var gameThread = global.rps.get(handleReply.threadID) || {};
  var { win, lose, draw } = gameThread;
  var { rps_bot, list } = handleReply;
  if (gameThread.player.find(i => i.toString() == event.senderID)) {
    var success = true;
    if (event.body == '1') {
      gameThread.choose.push({ senderID: event.senderID, choose: event.body });
      if (rps_bot == 'bao') {
        gameThread.win.push({ senderID: event.senderID, choose: event.body });
      }
      else if (rps_bot == 'kéo') {
        gameThread.draw.push({ senderID: event.senderID, choose: event.body });
      }
      else {
        gameThread.lose.push({ senderID: event.senderID, choose: event.body });
      }
      api.sendMessage('Bạn đã chọn kéo!', event.threadID, event.messageID);
    }
    else if (event.body == '2') {
      gameThread.choose.push({ senderID: event.senderID, choose: event.body });
      if (rps_bot == 'bao') {
        gameThread.draw.push({ senderID: event.senderID, choose: event.body });
      }
      else if (rps_bot == 'kéo') {
        gameThread.lose.push({ senderID: event.senderID, choose: event.body });
      }
      else {
        gameThread.win.push({ senderID: event.senderID, choose: event.body });
      }
      api.sendMessage('Bạn đã chọn bao!', event.threadID, event.messageID);
    }
    else if (event.body == '3') {
      gameThread.choose.push({ senderID: event.senderID, choose: event.body });
      if (rps_bot == 'bao') {
        gameThread.lose.push({ senderID: event.senderID, choose: event.body });
      }
      else if (rps_bot == 'kéo') {
        gameThread.win.push({ senderID: event.senderID, choose: event.body });
      }
      else {
        gameThread.draw.push({ senderID: event.senderID, choose: event.body });
      }
      api.sendMessage('Bạn đã chọn búa!', event.threadID, event.messageID);
    }
    else {
      var success = false;
      api.sendMessage('Bạn cần phải chọn 1 -> 3 thôi nha!', event.threadID, event.messageID);
    }
  }
  else {
    return api.sendMessage('Bạn không phải người trong game!', event.threadID, event.messageID);
  }
  if (gameThread.player.length == gameThread.choose.length) {
    api.sendMessage('Tất cả mọi người đã chọn xong, cùng xem kết quả nào...', handleReply.threadID);
    var msg_win = ''
    var msg_lose = ''
    var msg_draw = ''
    for (var p of gameThread.win) {
      if (p.choose == 1) {
        var s = 'kéo';
      }
      else if (p.choose == 2) {
        var s = 'bao';
      }
      else {
        var s = 'búa';
      }
      if (!list.nicknames[p.senderID]) var name = list.userInfo.find(i => i.id == event.p).name;
      else var name = list.nicknames[p.senderID];
      msg_win += '- ' + name + '(' + s + ')\n';
    }
    for (var c of gameThread.lose) {
      if (c.choose == 1) {
        var s = 'kéo';
      }
      else if (c.choose == 2) {
        var s = 'bao';
      }
      else {
        var s = 'búa';
      }
      if (!list.nicknames[c.senderID]) var name = list.userInfo.find(i => i.id == c.senderID).name;
      else var name = list.nicknames[c.senderID];
      msg_lose += '- ' + name + '(' + s + ')\n'
    }
    for (var u of gameThread.draw) {
      if (u.choose == 1) {
        var s = 'kéo';
      }
      else if (u.choose == 2) {
        var s = 'bao';
      }
      else {
        var s = 'búa';
      }
      if (!list.nicknames[u.senderID]) var name = list.userInfo.find(i => i.id == u.senderID).name;
      else var name = list.nicknames[u.senderID];
      msg_draw += '- ' + name + '(' + s + ')\n'
    }
    if (gameThread.win.length == 0) var msg_win = '- Không có ai.\n';
    if (gameThread.lose.length == 0) var msg_lose = '- Không có ai.\n';
    if (gameThread.draw.length == 0) var msg_draw = '- Không có ai.\n';
    setTimeout(() => {
      api.sendMessage('》Bot chọn là ' + rps_bot + '\n\n》Những người chiến thắng:\n' + msg_win + '\n》Những người thua:\n' + msg_lose + '\n》Những người hòa: \n' + msg_draw, handleReply.threadID);
      global.rps.delete(handleReply.threadID);
    }, 900);
  }
  else {
    if (success == true) {
      if (!list.nicknames[event.senderID]) var name = list.userInfo.find(i => i.id == event.senderID).name;
      else var name = list.nicknames[event.senderID];
      var not_ready = `${gameThread.player.length - gameThread.choose.length}`;
      api.sendMessage(name + ' Đã chọn xong, còn ' + not_ready + ' người chưa chọn!', handleReply.threadID);
    }
  }
}