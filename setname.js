module.exports.config = {
	name: "setname",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "chom",
	description: "Đổi biệt danh trong nhóm của bạn hoặc của người bạn tag",
	commandCategory: "Tiện ích",
	usages: "[name]",
	cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
	const name = args.join(" ")
	const mention = Object.keys(event.mentions)[0];
	if (!mention) return api.changeNickname(`${name}`, event.threadID, event.senderID);
	if (mention[0]) return api.changeNickname(`${name.replace(event.mentions[mention], "")}`, event.threadID, mention);
}
