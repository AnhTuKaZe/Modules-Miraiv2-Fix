const fs = require("fs");
module.exports.config = {
	name: "SDT",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "chom", 
	description: "no prefix",
	commandCategory: "Không cần dấu lệnh",
	usages: "SDT",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("SDT")==0 || (event.body.indexOf("SĐT")==0)) {
		var msg = {
				body: "\n0332413262"+
				"\nzalo.me/0332413262",
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
