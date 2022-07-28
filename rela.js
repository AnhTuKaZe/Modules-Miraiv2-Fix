module.exports.config = {
name: "rela",
version: "1.0.0",
hasPermssion: 0,
credits: "chom",
description: "1: Sử dụng lệnh + tag\n2: Sử dụng lệnh + info hoặc fake\n\nInfo sử dụng để xem thông tin như credit\nFake sử dụng để tạo banner fake thông tin",
commandCategory: "game",
usages: "[mention] | [info] | [fake]"
};

module.exports.languages = {"vi": {}}

//Đọc Package
const fs = require("fs-extra");
const { loadImage, createCanvas, registerFont, Canvas} = require("canvas");

//Cài đặt nhanh
var D = __dirname + "/cache/rela/"; //fila xuất
var expole = D + "rela.png", //Xuất ảnh ra file
    bg     = D + "bg.png", // đọc file ảnh background
    dicon  = D + "icon.png", // đọc file ảnh icon trái tim
    font   = D + "AmaticSC.ttf"; // đọc file font

//Link file
var token = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", // Token fb
    bglink = "https://blogger.googleusercontent.com/img/a/AVvXsEgiT494Po7Onhcft4jFS2cTSb2-7wbRYaoCCGFH09X53RtuI3YABGgYfMJsCAmsDs8hfpMU2k28PKwImiP6Go9LiOquM0CYR4bEgzH8yXIfsJ8CJHdnRcogIOef0tgdzIjTBsGROv-12T60AI2njz0p_N9ipS5T4_KMatV8Erl6GYJ6PLou2HeIRWrA=s1278",
    iconlink = "https://blogger.googleusercontent.com/img/a/AVvXsEgQpVe6Q9RLyMZolNU3K7PqmAyKbIz53aIcAux5P9X7gbXydjEbkbZSKHxiwTLrY_XmgSeJJgrTi8-jh6g8RuWvq8h4mfQOA470attJaNuHWI9AP28SVUiTF8gaggPUeeQ4zq7OT5kgO4qvQsloqIVxJue7cFZmDwaxHNI8UVHqxrCsA_BXwvEYskq9=s45",
    fontlink = "https://drive.google.com/u/0/uc?id=1ZzgC7nyGaBw-zP3V2GKK0azoFgF5aXup&export=download";

//onload ( leak của aesn )
module.exports.onLoad = async() => {
  const { resolve } = global.nodemodule["path"];
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { downloadFile } = global.utils;
  if (!existsSync(D)) mkdirSync(D, { recursive: true });
  if (!existsSync(bg)) await downloadFile(bglink, resolve(bg));
  if (!existsSync(dicon)) await downloadFile(iconlink, resolve(dicon));
  if (!existsSync(font)) await downloadFile(fontlink, resolve(font));
}

//Mảng data
var data = [
  "Trách phận vô duyên...",
  "hơi thấp nhưng không sao. Hãy cố gắng lên!",
  "3 phần duyên nợ, 7 phần cố gắng",
  "tỷ lệ mà mối quan hệ này có thể nên duyên cũng khá là nhỏ đấy! Phải cố gắng hơn nữa",
  "Date với nhau đi. Để mối quan hệ này có thể tiến xa hơn",
  "Hãy chủ động bắt chuyện hơn nữa. Hai bạn khá là hợp đôi",
  "Hãy tin vào duyên số đi, vì nó có thật đấy!",
  "Hợp đôi lắm đấy. Quan tâm chăm sóc cho mối quan hệ này nhiều hơn nữa nhé!",
  "Lưu số nhau đi, bao giờ cưới thì gọi nhau lên lễ đường!",
  "Cưới đi chờ chi!"
];


//Bắt đầu modules
module.exports.run = async function({ api, event, args, Threads, Users, permssion}) {

//Lấy mentions (Tên người tag)
var mentions1 = event.mentions[Object.keys(event.mentions)];
if(!mentions1) { 
  // check args (Check đầu vào)
  if(args[0] == "info"){return api.sendMessage(`©Code By DVB Developer\n©Design By DVB Design\n\n=============\n- Hỗ trợ code: Nguyễn Thái Hảo\n- Ý tưởng: Lê Định\n\n=============\nNếu muốn góp ý tính năng vui lòng inbox https://m.me/bangprocode`,event.threadID,event.messageID)}
  else{return api.sendMessage(`1: Sử dụng lệnh + tag\n2: Sử dụng lệnh + info hoặc fake\n\nInfo sử dụng để xem thông tin như credit\nFake sử dụng để tạo banner fake thông tin`,event.threadID,event.messageID)};
};

//Lấy name
name1 = await Users.getNameUser(event.senderID);
name2 = await mentions1.replace("@", "");

//Hàm tải ảnh đầu vảo
background = await loadImage(bg);
icon = await loadImage(dicon);

// Lấy uid2 ( uid người tag)
uid2 = Object.keys(event.mentions)[0];

// check args (Check đầu vào)
if(args[0] == "fake"){
 
//Chạy handle reply
return api.sendMessage(`Nhập số tym của bạn ví dụ 8|8|8|8|8`, event.threadID, (error, info) => {
      global.client.handleReply.push({
      type: "create",
      name: this.config.name,
      author: event.senderID,
      messageID: info.messageID
    });
  }, event.messageID);
};

//Hàm tạo mảng random
MissionC = Array.from({length: 5}, () => Math.floor(Math.random() * 8));

//Hàm tính tổng
var allmath = (MissionC[0]+MissionC[1]+MissionC[2]+MissionC[3]+MissionC[4]) * 2.5;

//Kích hoạt chức năng so sánh để lấy text
var message = sosanh(allmath);
 
//Tải & Kích hoạt chức năng lấy avt
var getboyavt = await loadImage(await getavt(event.senderID)),
    getgirlavt = await loadImage(await getavt(uid2));

//Kích hoạt chức năng render (Tạo ảnh)
var render = await irender(allmath, message, name1, name2, getboyavt, getgirlavt);

//lưu ảnh sau khi render render (Lưu cache)
fs.writeFileSync(expole, Buffer.from(render,'utf8'));

//Tin nhắn gửi đi -  được phép tùy chỉnh
var send = {
  body: "Chúc mừng "+name1+" & "+name2+`\n`+ message,
  attachment: fs.createReadStream(expole)
};

//Hàm gửi tin nhắn lên fca
api.sendMessage(send,event.threadID,event.messageID);
 
};

module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies }) {
    var info = await api.getUserInfo(event.senderID);
    var nameSender = info[event.senderID].name;
    var arraytag = [];
        arraytag.push({id: event.senderID, tag: nameSender});
    if (handleReply.author != event.senderID) return;
    const {threadID, messageID, senderID } = event;
    switch (handleReply.type) {
    case "create": {
    var tym = event.body;
    MissionC = tym.split("|");
     
    //Hàm lấy avt
    var getboyavt = await loadImage(await getavt(senderID)),
        getgirlavt = await loadImage(await getavt(uid2));
    try{
     
    //Hàm soát mảng
    if(!MissionC.length == "5"){return api.sendMessage(`Thiếu số hoặc sai định dạng`, threadID, messageID)}
     
    //Hàm tính tổng
    var allmath = (parseInt(MissionC[0])+parseInt(MissionC[1])+parseInt(MissionC[2])+parseInt(MissionC[3])+parseInt(MissionC[4])) * 2.5;
    }catch(e){
      api.sendMessage(`Thiếu số hoặc sai định dạng \n nỗi: ${e}`, threadID, messageID);
    };
   
    //Kích hoạt chức năng so sánh để lấy text
    var message = sosanh(allmath);
     
    //Kích hoạt chức năng render (Tạo ảnh)
    var render = await irender(allmath, message, name1, name2, getboyavt, getgirlavt);
   
    //lưu ảnh sau khi render render (Lưu cache)
    fs.writeFileSync(expole, Buffer.from(render,'utf8'));
   
    //Tin nhắn gửi đi -  được phép tùy chỉnh
    var send = {
    body: "Chúc mừng "+name1+" & "+name2+`\n`+ message +`\n ${MissionC}`,
    attachment: fs.createReadStream(expole)
    }
     
    //Hàm gửi tin nhắn lên fca
    api.sendMessage(send, threadID, messageID);

    // Bí mật =))
    if ((this.config.credits) != "DVB Developer") { return api.sendMessage(`Có gì cho Bằng xin lại cái credit nhá :3`, event.threadID, event.messageID)}
}
}
};

////////////////////////////
/// Function (Chức nắng) ///
////////////////////////////

//Chức năng so sánh xuất text
function sosanh(rd) {
  let ss;
  if(rd < 10) {
    ss = data[0];
  }else if(rd < 20){
    ss = data[1];
  }else if(rd < 30){
    ss = data[2];
  }else if(rd < 40){
    ss = data[3];
  }else if(rd < 50){
    ss = data[4];
  }else if(rd < 60){
    ss = data[5];
  }else if(rd < 70){
    ss = data[6];
  }else if(rd < 80){
    ss = data[7];
  }else if(rd < 90){
    ss = data[8];
  }else {
    ss = data[9];
  }
  return ss;
};

//Chức năng lấy avt
async function getavt(uid) {
  var axios = require("axios");
  var { data } = await axios.get(`https://graph.facebook.com/v12.0/${uid}/picture?height=240&width=240&access_token=${token}`,{ responseType:"arraybuffer" });
  return data;
};

//Chức năng render ảnh (Xuất ảnh)
function irender( tile, msg, boyname, girlname, getboyavt, getgirlavt) {
  registerFont(font, {family: "AmaticSCbold"});
  var canvas = createCanvas(background.width, background.height);
  var ctx = canvas.getContext("2d");

  //Vẽ 2 avt
  ctx.drawImage(getboyavt, 114, 581, 98 , 98);
  ctx.drawImage(getgirlavt, 509, 581, 98 , 98);
  ctx.restore();
  ctx.save();

  //Vẽ background (nền)
  ctx.drawImage(background, 0, 0);
  ctx.font = "150px AmaticSCbold";
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFFFFE";
  ctx.fillText(tile+"%", 360, 340);
  ctx.restore();
  ctx.save();

  //Vẽ & tính trái tim
  var math = 806;
  math -= 50;
  for(var i = 0; i < 5; i+=1) {
    var leftmath = 170;
    math += 50;
    for(var ii = 0; ii < MissionC[i]; ii+=1) {
      leftmath += 55;
      ctx.drawImage(icon, leftmath , math);
    }
  }
  ctx.restore();
  ctx.save();

  //Vẽ chữ
  ctx.font = "50px AmaticSCbold";
  ctx.textAlign = "center";
  ctx.fillStyle = "#000000";
  ctx.fillText(boyname, 163, 746);
  ctx.fillText(girlname, 557, 746);
  ctx.restore();
  ctx.save();
 
  //Vẽ chữ
  ctx.font = "45px AmaticSCbold";
  ctx.textAlign = "start";
  ctx.fillStyle = "#000000";
  //Kích hoạt chức năng căn chỉnh chữ
  const xuongdong = wrapText(ctx, msg, 640);
  ctx.fillText(xuongdong.join("\n"), 60, 1145);
  ctx.restore();
  ctx.save();

  //Xuất ảnh
  return canvas.toBuffer("image/png");
};

//Chức năng chỉnh & căn text
function wrapText(ctx, text, max){
  const lines = [];
  if (ctx.measureText(text).width > max){
    const words = text.split(" ");
    let line = "";
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= max) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) words[1] = temp.slice(-1) + words[1];
        else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(line+words[0]).width < max)
        line += words.shift()+" ";
      else {
        lines.push(line.trim());
        line = "";
      }
      if (words.length === 0) lines.push(line.trim());
    }
    }else{
      lines.push(text);
    }
    return lines;
}; 