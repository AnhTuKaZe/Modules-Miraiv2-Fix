module.exports.config = {
	name: "rs",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "chom",
	description: "Khởi Động Lại Bot.",
	commandCategory: "system",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>api.sendMessage("🚨 𝕃𝕒𝕫𝕪_ℙ𝕣𝕠𝕛𝕖𝕔𝕥 𝔻𝕒𝕟𝕘 𝕂𝕙𝕠̛̉𝕚 𝔻𝕠̣̂𝕟𝕘 𝕃𝕒̣𝕚 🚨", event.threadID, () =>process.exit(1))