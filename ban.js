module.exports.config = {
    name: "ban",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "chom",
    description: "Cảnh cáo thành viên  đủ 3 lần sẽ ban khỏi nhóm (nhớ set qtv cho bot nha)\nAuthor: NTKhang",
    commandCategory: "group",
    usages: "[args]",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
    let {messageID, threadID, senderID} = event;
    var info = await api.getThreadInfo(threadID);
    const out = msg => api.sendMessage(msg, threadID, messageID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return out(`Bot không có quyền để sử dụng lệnh này.`);
    var fs = require("fs-extra");
    
    if (!fs.existsSync(__dirname + `/cache/databan.json`)) {
            const dataaa = {bans: {}, banned: {}};
            fs.writeFileSync(__dirname + `/cache/databan.json`, JSON.stringify(dataaa));
                    }
  var databan = JSON.parse(fs.readFileSync(__dirname + `/cache/databan.json`)); //đọc nội dung file
  if(!databan.bans.hasOwnProperty(threadID)) {
            databan.bans[threadID] = {}; 
            fs.writeFileSync(__dirname + `/cache/databan.json`, JSON.stringify(databan, null, 2));
    
  }
  if (event.type != "message_reply" && Object.keys(event.mentions).length == 0) return out(`Vui lòng reply/tag người bị ban khỏi nhóm.`);
  var info = await api.getThreadInfo(threadID);
  if (!info.adminIDs.some(item => item.id == senderID) && !(global.config.ADMINBOT).includes(senderID)) return out(`Đéo có quyền đéo được dùng.`);
  var reason = "";
  if (event.type == "message_reply") {
    var iduser = [];
    iduser.push(event.messageReply.senderID);
    reason = (args.join(" ")).trim();
  }
  else if (Object.keys(event.mentions).length != 0) {
   var iduser = Object.keys(event.mentions);
   var stringname = "";
   var nametaglength = (Object.values(event.mentions)).length;
   var namearr = Object.values(event.mentions);
   for(let i = 0; i < nametaglength; i++) {
      stringname += (Object.values(event.mentions))[i];
   }
   var message = args.join(" ");
   for(let valuemention of namearr) {
      console.log(namearr);
      console.log(message);
      vitrivalue = message.indexOf(valuemention);
      console.log(vitrivalue);
      message = message.replace(valuemention,"");
   }
   var reason = message.replace(/\s+/g, ' ');
   }
   var arraytag = [];
   var arrayname = [];
   for(let iid of iduser) {
       var id = parseInt(iid);
       var nametag = (await api.getUserInfo(id))[id].name;
       arraytag.push({id: id, tag: nametag});
       if(!reason) reason += "Không có lý do nào được đưa ra";
       var dtwmybox = databan.bans[threadID];
       if(!dtwmybox.hasOwnProperty(id)) { 
         dtwmybox[id] = [];
       }
       var solan = (databan.bans[threadID][id]).length;
       arrayname.push(nametag);
       var pushreason = databan.bans[threadID][id];
       pushreason.push(reason);
       if(!databan.banned[threadID]) {
         databan.banned[threadID] = [];
       }
       if((databan.bans[threadID][id]).length > 0) {
         api.removeUserFromGroup(parseInt(id), threadID)
         var banned = databan.banned[threadID];
         banned.push(parseInt(id));
         fs.writeFileSync(__dirname + `/cache/databan.json`, JSON.stringify(databan, null, 2));
       }
   }
   api.sendMessage({body: `Đã ban thành viên ${arrayname.join(", ")} với lý do : ${reason}.`, mentions: arraytag}, threadID, messageID);
   fs.writeFileSync(__dirname + `/cache/databan.json`, JSON.stringify(databan, null, 2));
}