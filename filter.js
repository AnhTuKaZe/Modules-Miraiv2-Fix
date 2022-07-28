module.exports.config = {
  name: "filter",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "chom", 
  description: "Bộ lọc tin nhắn nhóm",
  commandCategory: "system",
  usages: "<word> => <câu trả lời>: dùng để thêm từ filter: muốn random thì điền theo form <câu trả lời 1 | câu trả lời 2...> hoặc add lại nhiều lần\nfilter del <word>: để xóa cụm filter\nfilter list hoặc filter all: xem danh sách filter",
  cooldowns: 5
};

module.exports.handleEvent = ({ api, event }) => {
  const { existsSync } = require("fs-extra");
  const { body } = event;
  
  const pathFilter = __dirname + "/noprefix/filterNTK.json";
  
  if (!body || !existsSync(pathFilter)) return;
  const dataFilter = require(pathFilter);
  for (let word of dataFilter) {
    if (body.toLowerCase().indexOf(word.key) != -1) {
       return api.sendMessage(word.value[Math.floor(Math.random()*word.value.length)], event.threadID, event.messageID);
    }
  }
};

module.exports.run = ({ api, event, args }) => {
  const { existsSync, writeFileSync } = require("fs-extra");
  const pathFilter = __dirname + "/noprefix/filterNTK.json";
  if (!existsSync(pathFilter)) writeFileSync(pathFilter, "[]");
  const dataFilter = require(pathFilter);
  
  if (args[0] == "del") {
    const wordDelete = args[1];
    if (!wordDelete) return api.sendMessage("Bạn chưa nhập từ cần xóa", event.threadID, event.messageID); 
    const indexOfFilter = dataFilter.findIndex(item => item.value == wordDelete);
    dataFilter.splice(indexOfFilter, 1);
    api.sendMessage(`Đã xóa từ khóa filter ${wordDelete}`, event.threadID, event.messageID);
  }
  else if (["list", "all"].includes(args[0])) {
    if (dataFilter.length == 0) return api.sendMessage("Chưa có từ filter nào", event.threadID, event.messageID);
    var msg = "";
    for (let item of dataFilter) {
      msg += `• Key: ${item.key}\n• Reply: ${item.value.join(" | ")}\n`;
      return api.sendMessage(msg, event.threadID, event.messageID);
    }
  }
  else {
    if (!args[0] || !args.join(" ").includes("=>")) return global.utils.throwError("filter", event.threadID, event.messageID);
    const content = args.join(" ").split("=>");
    if (!content[0] || !content[1]) return global.utils.throwError("filter", event.threadID, event.messageID);
    const key = content[0].toLowerCase().trim();
    var value = content.slice(1).join("=>").split("|");
    value = value.map(item => item = item.trim());
    if (!dataFilter.some(item => item.key == key)) dataFilter.push({ key, value: [] });
    const data = dataFilter.find(item => item.key == key);
    data.value = [...data.value, ...value];
    const indexOfFilter = dataFilter.findIndex(item => item.value == value);
    dataFilter[indexOfFilter] = data;
    api.sendMessage(`Đã thêm từ khóa filer "${key}" với ${value.length > 1 ? "những" : ""} câu trả lời ${value.length > 1 ? "random" : ""}\n- ${value.join("\n- ")}`, event.threadID, event.messageID);
  }

  writeFileSync(pathFilter, JSON.stringify(dataFilter, null, 2));
};
