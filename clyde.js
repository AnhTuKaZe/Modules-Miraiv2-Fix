module.exports.config = {
	name: "clyde",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "chom",
	description: "Lô",
	commandCategory: "Game", 
	cooldowns: 5,
    dependencies: {
    "axios": "",
    "request": "",
    "fs-extra": ""
	}
};

module.exports.run = async function ({ args, api, event, Currencies, client, Users}) {
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
let type = args.join(" ");
 		if (!type) return api.sendMessage(`Vui lòng nhập chữ !`,event.threadID,event.messageID);
    else {
axios.get(`https://nekobot.xyz/api/imagegen?type=clyde&text=${encodeURIComponent(type)}&raw=2`).then(res => {
	let img = res.data.message;
	let ext = res.data.message.substring(res.data.message.lastIndexOf(".") + 1);
	let callback = function () {
		api.sendMessage({
			            body: ``,
						attachment: fs.createReadStream(__dirname + `/cache/clyde.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/clyde.${ext}`), event.messageID);
	};
	   request(res.data.message).pipe(fs.createWriteStream(__dirname + `/cache/clyde.${ext}`)).on("close", callback);
})
}
}