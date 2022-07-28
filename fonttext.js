module.exports.config = {
  name: "fonttext",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "chom",
  description: "chuyển đổi font chữ",
  commandCategory: "font chữ",
  usages: "fonttext <nội dung>",
  cooldowns: 5
};

module.exports.run = async ({ event, api, args }) => {
 var text = args.join("");
     text = text;
       text = text.replace(/ /g, ` `)
.replace(/a/g, `𝐚`)
.replace(/b/g, `𝐛`)
.replace(/c/g, `𝐜`)
.replace(/d/g, `𝐝`)
.replace(/e/g, `𝐞`)
.replace(/f/g, `𝐟`)
.replace(/g/g, `𝐠`)
.replace(/h/g, `𝐡`)
.replace(/i/g, `𝐢`)
.replace(/j/g, `𝐣`)
.replace(/k/g, `𝐤`)
.replace(/l/g, `𝐥`)
.replace(/m/g, `𝐦`)
.replace(/n/g, `𝐧`)
.replace(/o/g, `𝐨`)
.replace(/p/g, `𝐩`)
.replace(/q/g, `𝐪`)
.replace(/r/g, `𝐫`)
.replace(/s/g, `𝐬`)
.replace(/t/g, `𝐭`)
.replace(/u/g, `𝐮`)
.replace(/v/g, `𝐯`)
.replace(/x/g, `𝐱`)
.replace(/y/g, `𝐲`)
.replace(/w/g, `𝐰`)
.replace(/z/g, `𝐳`)
.replace(/Q/g, `𝐐`)
.replace(/W/g, `𝐖`)
.replace(/E/g, `𝐄`)
.replace(/R/g, `𝐑`)
.replace(/T/g, `𝐓`)
.replace(/Y/g, `𝐘`)
.replace(/U/g, `𝐔`)
.replace(/I/g, `𝐈`)
.replace(/O/g, `𝐎`)
.replace(/P/g, `𝐏`)
.replace(/A/g, `𝐀`)
.replace(/S/g, `𝐒`)
.replace(/D/g, `𝐃`)
.replace(/F/g, `𝐅`)
.replace(/G/g, `𝐆`)
.replace(/H/g, `𝐇`)
.replace(/J/g, `𝐉`)
.replace(/K/g, `𝐊`)
.replace(/L/g, `𝐋`)
.replace(/Z/g, `𝐙`)
.replace(/X/g, `𝐗`)
.replace(/C/g, `𝐂`)
.replace(/V/g, `𝐕`)
.replace(/B/g, `𝐁`)
.replace(/N/g, `𝐍`)
.replace(/M/g, `𝐌`)
.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, " ");
var arr = text.replace("\n", ".").split("\n").filter(item => item.length != 0);
var num = (arr.length/6)-1;
var main = arr.slice(0,6);
var extra = arr.splice(6);
var msg = "";
var mainlength = main.length;
for(let i = 0; i < mainlength; i++) {
  var txt = main[i];
  for(let o = 0; o < num; o++) {
    txt += extra[i+(o*6)];
  }
  msg += txt+"\n";
}
return api.sendMessage(msg+""+"", event.threadID, event.messageID);
}