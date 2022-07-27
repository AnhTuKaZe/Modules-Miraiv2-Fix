module.exports.config = {
  name: "appstate",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "chom",
  description: "Làm mới appstate.json",
  commandCategory: "Hệ thống admin-bot",
  usages: "appstate",
  cooldowns: 5,
  dependencies: {
  }
};

module.exports.run = async function ({ api, event, args }) {
  const fs = global.nodemodule["fs-extra"];
  if (event.senderID != 100045609437771) return api.sendMessage(`[❗] Donate → Mbbank/Momo: 0332413262. Lazy_Project`, event.threadID, event.messageID)
  let appstate = api.getAppState();
  // convert JSON object to a string
  const data = JSON.stringify(appstate);
  // write file to disk
  fs.writeFile(`${__dirname}/../../appstate.json`, data, 'utf8', (err) => {
    if (err) {
      return api.sendMessage(`Error writing file: ${err}`, event.threadID);
    } else {
      return api.sendMessage(`Đã làm mới appstate thành công`, event.threadID);
    }
  });

}
