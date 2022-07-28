module.exports.config = {
 name: "chuhoa",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "chom",
 description: "Viết chữ tiếng Việt bằng tiếng Trung theo kiểu ảnh :v",
 commandCategory: "image",
 usages: "[0 -> 7] | [ 1 -> 3 ] | [Text] | [Text 2] (Tuy vào type nhé)",
 cooldowns: 5
};

module.exports.run = async ({ event, api, args }) => {
    if (this.config.credits != 'chom') return;
    let { senderID, threadID, messageID } = event;
    const { loadImage, createCanvas } = require("canvas");
    const request = require("request");
    const fs = require("fs-extra");
    const axios = require("axios");
    let pathImg = __dirname + `/cache/${senderID+20}.png`;
    let pathAva = __dirname + `/cache/${senderID+30}.png`;
    let pathLine = __dirname + `/cache/${senderID+40}.png`;
    let pathTick = __dirname + `/cache/${senderID+50}.png`;
    const path = require("path");
    const Canvas = require("canvas");
    const __root = path.resolve(__dirname, "cache");
    if(!args[0]) return api.sendMessage('Sai cú pháp\n[0 -> 7] | [ 1 -> 3 ] | [Text] | [Text 2] (Tuy vào type nhé)', threadID, messageID);
    var dsCover = [{
        tpCover: "https://i.imgur.com/oJkqkrR.jpg",
        tpColor: "#222222"
    },
    {
        tpCover: "https://i.imgur.com/8L45MNH.jpg",
        tpColor: "#48413a"
    },
    {
        tpCover: "https://i.imgur.com/E09sVju.jpg",
        tpColor: "#FF0000"
    },
    {
        tpCover: "https://i.imgur.com/ZeibJSB.jpg",
        tpColor: "#747757"
    },
    {
        tpCover: "https://i.imgur.com/AcDZzsE.jpg",
        tpColor: "#00FFFF"
    },
    {
        tpCover: "https://i.imgur.com/IllSr6K.jpg",
        tpColor: "#FFFFFF"
    },
    {
        tpCover: "https://i.imgur.com/v2ktKQ3.jpg",
        tpColor: "#00FF00"
    },
    {
        tpCover: "https://i.imgur.com/NA6apUQ.png",
        tpColor: "#000000"
    },
    ];
    const content = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|");
    let background = (
    await axios.get(encodeURI(dsCover[content[0]].tpCover), {
      responseType: "arraybuffer",
     })
    ).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    if(!fs.existsSync(__dirname+`/cache/UTM ThuPhap Thien An.ttf`)) { 
      let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1z_WTixiFx_LD99o2Vf9XSzaNyDxPaKcS&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`/cache/UTM ThuPhap Thien An.ttf`, Buffer.from(getfont2, "utf-8"));
    };
    let baseImage = await loadImage(pathImg);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    var name = content[0]
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    Canvas.registerFont(__dirname+`/cache/UTM ThuPhap Thien An.ttf`, {
            family: "UTM ThuPhap Thien An"
    });
    ctx.textAlign = "center";
    ctx.fillStyle = dsCover[content[0]].tpColor;
    var q = content[2]
    var p = content[3]
    var n = content[4]
    if (content[1] == '1') {
      var m = 150 - ctx.measureText(q).width;
      if (m < 30) {m = 30}
      if (m > 90) {m = 90}
      ctx.font = m + "px UTM ThuPhap Thien An";
      ctx.fillText(q, canvas.width / 2, canvas.height / 2 +25);
  }
   if (content[1] == '2') {
      var m = 140 - ctx.measureText(q).width;
      if (m < 30) {m = 30}
      if (m > 90) {m = 90}
      ctx.font = m + "px UTM ThuPhap Thien An";
      ctx.fillText(q, canvas.width / 2, canvas.height / 2 - 95);
      ctx.fillText(p, canvas.width / 2, canvas.height / 2 + 110);
   }
   if (content[1] == '3') {
    var m = 130 - ctx.measureText(q).width;
    if (m < 30) {m = 30}
    if (m > 90) {m = 90}
    ctx.font = m + "px UTM ThuPhap Thien An";
    ctx.fillText(q, canvas.width / 2, canvas.height / 2 - 145);
    ctx.fillText(p, canvas.width / 2, canvas.height / 2);
    ctx.fillText(n, canvas.width / 2, canvas.height / 2 + 155);
   }
   if (content[1] == '4') {
    var m = 130 - ctx.measureText(q).width;
    if (m < 30) {m = 30}
    if (m > 90) {m = 90}
    ctx.font = m + "px UTM ThuPhap Thien An";
    ctx.fillText(q, canvas.width / 2, canvas.height / 2 - 145);
    ctx.fillText(p, canvas.width / 2, canvas.height / 2);
    ctx.fillText(n, canvas.width / 2, canvas.height / 2 + 155);
   }
   if (content[1] == '5') {
    var m = 130 - ctx.measureText(q).width;
    if (m < 30) {m = 30}
    if (m > 90) {m = 90}
    ctx.font = m + "px UTM ThuPhap Thien An";
    ctx.fillText(q, canvas.width / 2, canvas.height / 2 - 145);
    ctx.fillText(p, canvas.width / 2, canvas.height / 2);
    ctx.fillText(n, canvas.width / 2, canvas.height / 2 + 155);
   }
   if (content[1] == '5') {
    var m = 130 - ctx.measureText(q).width;
    if (m < 30) {m = 30}
    if (m > 90) {m = 90}
    ctx.font = m + "px UTM ThuPhap Thien An";
    ctx.fillText(q, canvas.width / 2, canvas.height / 2 - 145);
    ctx.fillText(p, canvas.width / 2, canvas.height / 2);
    ctx.fillText(n, canvas.width / 2, canvas.height / 2 + 155);
   }
   const imageBuffer = canvas.toBuffer();
   fs.writeFileSync(pathImg, imageBuffer);
   return api.sendMessage(
     { attachment: fs.createReadStream(pathImg) },
     threadID,messageID
   );
}