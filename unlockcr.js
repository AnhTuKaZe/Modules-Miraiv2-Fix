const fs = require("fs");
module.exports.config = {
	name: "unlockcr",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "chom", 
	description: "no prefix",
	commandCategory: "Không cần dấu lệnh",
	usages: "unlockcr",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("unlockcr")==0 || (event.body.indexOf("Unlockcr")==0)) {
		var msg = {
				body: `\n𝗧𝗨𝗧 𝗨𝗡𝗟𝗢𝗖𝗞 𝗧𝗥𝗔́𝗜 𝗧𝗬𝗠 𝗖𝗥𝗨𝗦𝗛 `+
                `\nʙᴜ̛ᴏ̛́ᴄ 1 : `+
                `\n- ʜᴀ̃ʏ ɴᴏ́ɪ ᴄʜᴜʏᴇ̣̂ɴ ᴛʜᴀ̣̂ᴛ ɴʜɪᴇ̂̀ᴜ ᴠᴀ̀ ᴅᴀ̂̀ɴ ʟᴀ̀ᴍ ǫᴜᴇɴ sᴀᴜ 1 ᴛᴜᴀ̂̀ɴ`+
                `\n- ʜᴀ̃ʏ ʀᴜ̉ ᴄʀᴜsʜ ᴄᴀʟʟ ᴠᴀ̀ ɴᴏ́ɪ ᴄʜᴜʏᴇ̣̂ɴ ᴠᴏ̛́ɪ ᴍɪ̀ɴʜ , ᴄᴀʟʟ 2-3 ᴛɪᴇ̂́ɴɢ ᴍᴏ̂̃ɪ ɴɢᴀ̀ʏ `+
                `\nʙᴜ̛ᴏ̛́ᴄ 2 : ` +
                `\n- ɴᴇ̂́ᴜ ᴄʀᴜᴄʜ ᴆᴀ̃ ᴄʜᴜ̉ ᴆᴏ̣̂ɴɢ ʜᴏ̉ɪ ᴄᴀʟʟ ʙᴀ̣ɴ ᴆᴀ̃ ᴄᴏ́ sᴜ̛̣ ᴛɪɴ ᴛᴜ̛ᴏ̛̉ɴɢ`+
                `\n- ʙᴀ̣ɴ ʜᴀ̃ʏ ᴛᴀ̆ɴɢ ᴛʜᴏ̛̀ɪ ɢɪᴀɴ ᴄᴀʟʟ ʟᴇ̂ɴ ᴠᴀ̀ ɴʜᴀ̆́ɴ ᴛɪɴ ᴄʜᴏ ᴄᴏ̂ ᴀ̂́ʏ ɴʜɪᴇ̂̀ᴜ ʜᴏ̛ɴ`+
                `\nʙᴜ̛ᴏ̛́ᴄ 3 : `+
                `\n- sᴀᴜ 2 ᴛᴜᴀ̂̀ɴ ᴄʀᴜsʜ ᴆᴀ̃ ᴄᴏ́ ᴛɪ̀ɴʜ ᴄᴀ̉ᴍ ᴠᴏ̛́ɪ ʙᴀ̣ɴ . ɴʜᴜ̛ɴɢ ᴋʜᴏᴀɴ ᴍᴏ̛̉ ʟᴏ̛̀ɪ `+
                `\n- ʜᴀ̃ʏ ᴆᴏ̛̣ɪ ᴛʜᴇ̂ᴍ ᴠᴀ̀ɪ ɴɢᴀ̀ʏ `+
                `\n- sᴀᴜ 2 ɴɢᴀ̀ʏ sᴀᴜ ʙᴀ̣ɴ ʜᴀ̃ʏ ɴʜᴀ̣̂ᴘ ᴛʜᴀ̂̀ɴ ᴄʜᴜ́` +
                `\n• ᴇ̂ ᴛᴀᴏ ᴄᴏ́ ᴄᴀ́ɪ ɴᴀ̀ʏ ɴᴏ́ɪ ɴᴇ̀ " ᴛᴀᴏ ᴛʜɪ́ᴄʜ ᴍᴀ̀ʏ "`+
                `\n( ᴏ̛̀ ʀᴏ̂̀ɪ ɴᴏ́ ᴆᴏ̂̀ɴɢ ʏ́ ᴛʜɪ̀ ᴄᴀ́ᴄ ʙᴀ̣ɴ ᴆᴀ̃ ᴜɴʟᴏᴄᴋ ᴛʜᴀ̀ɴʜ ᴄᴏ̂ɴɢ ᴛʀᴀ́ɪ ᴛʏᴍ ᴄʀᴜᴄʜ ᴆᴀ̉ᴍ ʙᴀ̉ᴏ ᴛᴜᴛ ɴᴀ̀ʏ ᴆᴀ́ᴘ 1s ) `+
                `\nʙᴜ̛ᴏ̛́ᴄ 4 : `+
                `\nᴄᴀ́ᴄ ʙᴀ̣ɴ ᴆᴀ̃ ᴛʀᴏ̛̉ ᴛʜᴀ̀ɴʜ ɴɢᴜ̛ᴏ̛̀ɪ ʏᴇ̂ᴜ `+
                `\n( ʟᴜ̛ᴜ ʏ́ )`+
                `\n\n• ɴᴇ̂́ᴜ ᴄʀᴜsʜ ᴛᴜ̛̀ ᴄʜᴏ̂́ɪ ᴛʜɪ̀ ᴄᴀ́ᴄ ʙᴀ̣ɴ ᴠᴜ̛́ᴛ ᴍᴇ̣ ᴄʀᴜsʜ ᴆɪ ʏᴇ̂ᴜ ᴄᴏɴ ᴋʜᴀ́ᴄ`,
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
