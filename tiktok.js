
module.exports.config = {
	name: "tiktok",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "chom",
	description: "Tải video tiktok",
	commandCategory: "Tiện ích",
	usages: "",
	cooldowns: 5
}, module.exports.onLoad = function() {
	console.log("===TIKTOK DOWNLOAD NO WATERMARK===")
}, module.exports.run = async function({ args,event,	api }) {
  const axios = require("axios");
  const fs = require("fs-extra");
    const request = require("request");
  var img = [];
  if(!args[0]){
    return api.sendMessage(`Chưa nhập nội dung ?`,event.threadID, event.messageID)
  }
  const res = (await axios.get(`http://api.leanhtruong.net/api-no-key/tiktok?url=${encodeURI(args[0])}`)).data
   let imga = (await axios.get(res.thumbail , { responseType: "arraybuffer" } )).data; 
         fs.writeFileSync(__dirname + "/cache/tiktok.png", Buffer.from(imga, "utf-8") );
         img.push(fs.createReadStream(__dirname + "/cache/tiktok.png"));
  var msg = {body: `Title: ${res.title}\nAuthor : ${res.author_video}\nTitle Music : ${res.data_music.title}\n\n1.Tải Video\n2.Tải Music\n\nReply tin nhắn để chọn!`,attachment: img}
  return api.sendMessage(msg, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "reply",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            video: res.data_nowatermark[0].url,
            mp3: res.data_music.url,
            title: res.title,
          authorvd: res.author_video,
          text : res.data_music.title
        })
    }) 
}
module.exports.handleReply = async function ({ args, event, Users, Currencies, api, handleReply }) {
 const axios = require("axios");
  const fs = require("fs-extra");
    const request = require("request");
    let { author, video,mp3, title,authorvd, text  , messageID } = handleReply;
    if (event.senderID != author) return api.sendMessage("Rác ?", event.threadID, event.messageID); 
    switch(handleReply.type) {
        case "reply": {
        switch(event.body){
          case"1":{
            var callback = () => api.sendMessage({body:`Chủ VIDEO : ${authorvd}\nTitle : ${title}\n`,attachment: fs.createReadStream(__dirname + "/cache/toptop.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/toptop.mp4"),event.messageID);
return request(encodeURI(`${video}`)).pipe(fs.createWriteStream(__dirname+'/cache/toptop.mp4')).on('close',() => callback());     
          }
            case"2":{
            var callback = () => api.sendMessage({body:`Song: ${text}`,attachment: fs.createReadStream(__dirname + "/cache/toptop.m4a")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/toptop.m4a"),event.messageID);
return request(encodeURI(`${mp3}`)).pipe(fs.createWriteStream(__dirname+'/cache/toptop.m4a')).on('close',() => callback());     
          }
        }
        }
    }
}