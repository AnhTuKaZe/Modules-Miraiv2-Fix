module.exports.config = {
	name: "checkexp",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "chom",
	description: "Kiểm tra số exp của bản thân hoặc người được tag",
	commandCategory: "economy",
	usages: "[Tag]",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies }) {
	const { threadID, messageID, senderID, mentions } = event;

	if (!args[0]) {
		const exp = (await Currencies.getData(senderID)).exp;
		return api.sendMessage(`Số exp bạn hiện đang có: ${exp}exp`, threadID);
	}
	else if (Object.keys(event.mentions).length == 1) {
		var mention = Object.keys(mentions)[0];
		var exp = (await Currencies.getData(mention)).exp;
		if (!exp) exp = 0;
		return api.sendMessage({
			body: `Số exp của ${mentions[mention].replace("@", "")} hiện đang có là: ${exp}exp.`,
			mentions: [{
				tag: mentions[mention].replace("@", ""),
				id: mention
			}]
		}, threadID, messageID);
	}
	else if (Object.keys(event.mentions).length > 0) {
		const mention = Object.keys(mentions);
		var msg = "";
		for (const value of mention) {
			var exp = (await Currencies.getData(value)).exp;
			if (!exp) exp = 0;
			msg += (` - ${mentions[value].replace("@", "")}: ${exp}\n`);
		};
		return api.sendMessage(`Số exp của thành viên: \n${msg}`, threadID, messageID);
	}
	else return global.utils.throwError(this.config.name, threadID, messageID);
}