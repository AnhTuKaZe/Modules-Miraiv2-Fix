module.exports.config = {
	name: "tid",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "chom",
	description: "Lấy id box", 
	commandCategory: "box",
	usages: "uidbox",
	cooldowns: 5, 
	dependencies: '',
};

module.exports.run = async function({ api, event }) {
  api.sendMessage(event.threadID, event.threadID);
};