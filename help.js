module.exports.config = {
 name: "help",
 version: "1.1.2",
 hasPermssion: 0,
 credits: "chom",
 description: "Help MOD",
 commandCategory: "All lệnh",
 usages: "[lệnh]",
 cooldowns: 1,
};
module.exports.handleEvent = function ({ api, event }) {
 const { commands } = global.client;
  
 if (!event.body) return;

 const { threadID, messageID, body } = event;

 if (body.indexOf("help") != 0) return;

 const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);


 if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

 const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
 const command = commands.get(splitBody[1].toLowerCase());

 const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

 return api.sendMessage(`🌸
 ${command.config.name} 🌸
\n${command.config.description}\n\n🌸🍀 Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n🌸🍀 Thuộc nhóm: ${command.config.commandCategory}\n🌸🍀 Thời gian chờ: ${command.config.cooldowns} giây(s)\n🌸🍀 Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n🌸🍀 Prefix: ${prefix}\n\n👻 Support Bot: 𝕃𝕒𝕫𝕪_ℙ𝕣𝕠𝕛𝕖𝕔𝕥 👻`, threadID, messageID);
};

module.exports.run = async function({ api, args, Users, event, Threads, utils, client }) {
const { commands } = global.client;
const { threadID, messageID } = event;
const command = commands.get((args[0] || "").toLowerCase());
const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
if (!command) {
const command = commands.values();
var tl = ["Bạn yêu Tú khi nào vậy ?","Tú cute hơn bạn","tôi không có khả năng hiểu con gái","con bot này giúp bạn hỗ trợ trong việc học?","spam bot tôi sẽ ban bạn khỏi người dùng bot","đừng để tôi cáu nhé!","việc bạn đang làm là vô nghĩa","bạn đã làm tôi cáu😡","tôi yêu bạn vai lon","bạn có yêu tôi không ?","cái gì chưa biết chỉ cần biết là được","con chuột bị ốm uống thuốc chuột thì tại sao con chuột lại chết ?","chảy máu cam nhưng sao màu máu là màu đỏ ?","đây chỉ là sản phẩm kem chống nắng ?","Tôi không có khả năng hiểu được bạn","Ngày 20 tháng 6 là ngày sinh nhật của Tú ?","Con bot này giống bạn nó cũng yêu Tú như bạn yêu Tú vậy !","Đây là tình yêu bạn giành cho Tú hả ?","Bạn yêu Tú hả ?","228922 là một con số tuyệt vời.","Đây là một lệnh vô dụng","177013 là một con số tuyệt vời","Đã từng có 600+ code JAV ở phiên bản đầu tiên","Ngôn ngữ của Tú là ngôn ngữ của chúa","Nếu bạn gặp 1 người có tên là Tú hãy tránh xa người đó càng nhiều càng tốt. Nếu không cả gia phả nhà người đó sẽ ám bạn suốt đời, con cháu bạn sẽ bị ám bởi cái tên Sen cute","Đây là con bot tự viết code cho chính nó","7749 là con số đẹp cho tình yêu","bạn có yêu tôi không ?","bạn rất ngu"];
var tle = tl[Math.floor(Math.random() * tl.length)];
var lon = `[Bạn có biết?]: ${tle}.`;
return api.sendMessage(lon, event.threadID, event.messageID);
}
const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
return api.sendMessage(`🌸 ${command.config.name} 🍀\n${command.config.description}\n\n🍀🌸 Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n🍀🌸 Thuộc nhóm: ${command.config.commandCategory}\n🍀🌸 Thời gian chờ: ${command.config.cooldowns} giây(s)\n🍀🌸 Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n🍀🌸 Prefix: ${prefix}\n\n👻 Support Bot: 𝕃𝕒𝕫𝕪_ℙ𝕣𝕠𝕛𝕖𝕔𝕥 👻`, threadID, messageID);
};