module.exports.config = {
	name: "base64",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "chom",
	description: "",
	commandCategory: "Other",
	usages: "base64",
	cooldowns: 5,
	dependencies: {
	"axios":""}
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let ecod = args.join(" ");
const res = await axios.get(`https://some-random-api.ml/base64?encode=${ecod}`);
var base64 = res.data.base64;
return api.sendMessage(`${base64}`, event.threadID, event.messageID)
}