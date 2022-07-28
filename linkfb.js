module. exports. config = {
    name: "getinfo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "chom",
    description: "Xem thông tin của người dùng facebook",
    commandCategory: "Thông tin",
    usages: "getinfo [reply/tag/id]",
    cooldowns: 3
    
};
module. exports. run = async({api,event,args}) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const axios = global.nodemodule['axios'];  
  
    if(!args[0]){
    if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;
      const req = await axios.get(`https://jrt-api.j-jrt-official.repl.co/love`);
   var jrt = req.data.data;
    const res = await axios.get(`http://api.leanhtruong.net/api/info?api_key=leanhtruong_zK1GnDhvDaNNWiWcbtZK&id=${uid}`);  
    var gender = res.data.gender == 'male' ? "Nam" : res.data.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.data.birthday ? `${res.data.birthday}` : "Không công khai";
    var love = res.data.user_love ? `${res.data.user_love}` : "Chưa kết hôn"
    var location = res.data.location ? `${res.data.location}` : "Không công khai"
    var hometown = res.data.hometown ? `${res.data.hometown}` : "Không công khai"
    var callback = () => api.sendMessage({body:`[⚜️] ━━ [ 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 ] ━━ [⚜️]\n➣ 𝗧𝗲̂𝗻:  ${res.data.fullname}\n➣ 𝗜𝗗: ${uid}\n➣ 𝗙𝗼𝗹𝗹𝗼𝘄:  ${res.data.follow_user}\n➣ 𝗚𝗶𝗼̛́𝗶 𝘁𝗶́𝗻𝗵: ${gender}\n➣ 𝗡𝗴𝗮̀𝘆 𝘀���𝗻𝗵:  ${birthday}\n➣ 𝗠𝗼̂́𝗶 𝗾𝘂𝗮𝗻 𝗵𝗲̣̂:   ${love}\n➣ Đ𝗲̂́𝗻 𝘁𝘂̛̀:   ${hometown}\n➣ 𝗡𝗼̛𝗶 𝗼̛̉:   ${location}\n➣ 𝗟𝗶𝗻𝗸 𝗙𝗕:  ${res.data.url_profile}\n\n[⚜️] ━━ [  𝗧𝗛𝗜́𝗡𝗛  ] ━━ [⚜️]\n${jrt}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
   } 
    else {
    if (args.join().indexOf('@') !== -1){
    var mentions = Object.keys(event.mentions)
      const req = await axios.get(`https://jrt-api.j-jrt-official.repl.co/love`);
   var jrt = req.data.data;
    const res = await axios.get(`http://api.leanhtruong.net/api/info?api_key=leanhtruong_lhe9xN6Rtd5Osu3oiR0q&id=${mentions}`);  
    var gender = res.data.gender == 'male' ? "Nam" : res.data.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.data.birthday ? `${res.data.birthday}` : "Không công khai";
    var love = res.data.user_love ? `${res.data.user_love}` : "Chưa kết hôn"
    var location = res.data.location ? `${res.data.location}` : "Không công khai"
    var hometown = res.data.hometown ? `${res.data.hometown}` : "Không công khai"
   var callback = () => api.sendMessage({body:`[⚜️] ━━ [ 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 ] ━━ [⚜️]\n➣ 𝗧𝗲̂𝗻:  ${res.data.fullname}\n➣ 𝗜𝗗: ${uid}\n➣ 𝗙𝗼𝗹𝗹𝗼𝘄:  ${res.data.follow_user}\n➣ 𝗚𝗶𝗼̛́𝗶 𝘁𝗶́𝗻𝗵: ${gender}\n➣ 𝗡𝗴𝗮̀𝘆 𝘀𝗶𝗻𝗵:  ${birthday}\n➣ 𝗠𝗼̂́𝗶 𝗾𝘂𝗮𝗻 𝗵𝗲̣̂:   ${love}\n➣ Đ𝗲̂́𝗻 𝘁𝘂̛̀:   ${hometown}\n➣ 𝗡𝗼̛𝗶 𝗼̛̉:   ${location}\n➣ 𝗟𝗶𝗻𝗸 𝗙𝗕:  ${res.data.url_profile}\n\n[⚜️] ━━ [  𝗧𝗛𝗜́𝗡𝗛  ] ━━ [⚜️]\n${jrt}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
    }
    else { if (args[0].indexOf(".com/")!==-1) {
    const res_ID = await axios.get(`http://api.leanhtruong.net/api/info?api_key=leanhtruong_lhe9xN6Rtd5Osu3oiR0q&id=${args[0]}`);  
      const req = await axios.get(`https://jrt-api.j-jrt-official.repl.co/love`);
   var jrt = req.data.data;
    const res = await axios.get(`http://api.leanhtruong.net/api/info?api_key=leanhtruong_lhe9xN6Rtd5Osu3oiR0q&id=${res_ID.data.id}`);  
    var gender = res.data.gender == 'male' ? "Nam" : res.data.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.data.birthday ? `${res.data.birthday}` : "Không công khai";
    var love = res.data.user_love ? `${res.data.user_love}` : "Chưa kết hôn"
    var location = res.data.location ? `${res.data.location}` : "Không công khai"
    var hometown = res.data.hometown ? `${res.data.hometown}` : "Không công khai"
     var callback = () => api.sendMessage({body:`[⚜️] ━━ [ 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 ] ━━ [⚜️]\n➣ 𝗧𝗲̂𝗻:  ${res.data.fullname}\n➣ 𝗜𝗗: ${uid}\n➣ 𝗙𝗼𝗹𝗹𝗼𝘄:  ${res.data.follow_user}\n➣ 𝗚𝗶𝗼̛́𝗶 𝘁𝗶́𝗻𝗵: ${gender}\n➣ 𝗡𝗴𝗮̀𝘆 𝘀𝗶𝗻𝗵:  ${birthday}\n➣ 𝗠𝗼̂́𝗶 𝗾𝘂𝗮𝗻 𝗵𝗲̣̂:   ${love}\n➣ Đ𝗲̂́𝗻 𝘁𝘂̛̀:   ${hometown}\n➣ 𝗡𝗼̛𝗶 𝗼̛̉:   ${location}\n➣ 𝗟𝗶𝗻𝗸 𝗙𝗕:  ${res.data.url_profile}\n\n[⚜️] ━━ [  𝗧𝗛𝗜́𝗡𝗛  ] ━━ [⚜️]\n${jrt}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${res_ID.data.id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
    }
    else {
    if (!parseInt(args[0])) {return api.sendMessage(`Vui lòng chỉ nhập 1 ID tài khoản Facebook`, event.threadID, event.messageID) }
      const req = await axios.get(`https://jrt-api.j-jrt-official.repl.co/love`);
   var jrt = req.data.data;
    const res = await axios.get(`http://api.leanhtruong.net/api/info?api_key=leanhtruong_lhe9xN6Rtd5Osu3oiR0q&id=${args[0]}`);  
    var gender = res.data.gender == 'male' ? "Nam" : res.data.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.data.birthday ? `${res.data.birthday}` : "Không công khai";
    var love = res.data.user_love ? `${res.data.user_love}` : "Chưa kết hôn"
    var location = res.data.location ? `${res.data.location}` : "Không công khai"
    var hometown = res.data.hometown ? `${res.data.hometown}` : "Không công khai"
     var callback = () => api.sendMessage({body:`[⚜️] ━━ [ 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 ] ━━ [⚜️]\n➣ 𝗧𝗲̂𝗻:  ${res.data.fullname}\n➣ 𝗜𝗗: ${uid}\n➣ 𝗙𝗼𝗹𝗹𝗼𝘄:  ${res.data.follow_user}\n➣ 𝗚𝗶𝗼̛́𝗶 𝘁𝗶́𝗻𝗵: ${gender}\n➣ 𝗡𝗴𝗮̀𝘆 𝘀𝗶𝗻𝗵:  ${birthday}\n➣ 𝗠𝗼̂́𝗶 𝗾𝘂𝗮𝗻 𝗵𝗲̣̂:   ${love}\n➣ Đ𝗲̂́𝗻 𝘁𝘂̛̀:   ${hometown}\n➣ 𝗡𝗼̛𝗶 𝗼̛̉:   ${location}\n➣ 𝗟𝗶𝗻𝗸 𝗙𝗕:  ${res.data.url_profile}\n\n[⚜️] ━━ [  𝗧𝗛𝗜́𝗡𝗛  ] ━━ [⚜️]\n${jrt}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${args[0]}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
    }
  }
}
}