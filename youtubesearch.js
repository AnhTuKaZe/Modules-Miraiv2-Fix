const fs = require("fs")
module.exports.config = {
  name: "youtubesearch",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "chom",
  description: "Tim kiem video",
  commandCategory: "Media",
  usages: "yts Em có nghe ",
  cooldowns: 2,
  dependencies:  {
        "request": "",
         "fs": "",
         "ytdl-core": "",
         "youtube-search": "",
         "youtube-search-lib": "",
         "simple-youtube-api": ""
  },
};

module.exports.run = async({api,event,args,client,Users,__GLOBAL,Currencies}) => {
var search = global.nodemodule['youtube-search'];
const YouTube = global.nodemodule['simple-youtube-api'];
const youtube = new YouTube('AIzaSyAMzo1oC1aqhaKBYLe_Wj1Ua1wl_4ruGPI');
let link = [], msg = "", num = 0;
var con = args.join(" ")
let results = await youtube.searchVideos(`${con}`, 3);
      for (let value of results) {
        if (typeof value.id == 'undefined') return;
        link.push(value.id);
        msg += (`${num+=1}. ${value.title}==https://youtu.be/${value.id}\n\n`);
      }
      return api.sendMessage(`Có ${link.length} kết quả trùng với từ khoá "${con}": \n${msg}`, event.threadID);
    }