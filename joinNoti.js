module.exports.config = {
    name: "joinNoti",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "chom",
    description: "Bật tắt joinNoti",
    commandCategory: "admin",
    usages: "",
    cooldowns: 2
};

module.exports.languages = {
  "vi": {"on": "Bật","off": "Tắt","successText": "gửi tin nhắn chào mừng khi có thành viên mới tham gia nhóm chat của bạn",},
  "en": {"on": "on","off": "off","successText": "send a welcome message when a new member joins your chat group",}
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["joinNoti"] == "undefined" || data["joinNoti"] == true) data["joinNoti"] = false;
  else data["joinNoti"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["joinNoti"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}