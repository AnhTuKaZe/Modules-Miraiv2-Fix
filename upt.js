module.exports.config = {
  name: "upt",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "chom",
  description: "Xem thông tin thời gian sử dụng gấu",
  commandCategory: "other",
  cooldowns: 1,
  dependencies: {
    "systeminformation": "",
    "pidusage": ""
  }
};

function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)}${units[l]}`;
}

module.exports.run = async function ({ api, event }) {
  const { time, cpu } = global.nodemodule["systeminformation"];
  const timeStart = Date.now();

  try {
    const pidusage = await global.nodemodule["pidusage"](process.pid);
    var { uptime } = await time();
    var hours = Math.floor(uptime / (60 * 60));
    var minutes = Math.floor((uptime % (60 * 60)) / 60);
    var seconds = Math.floor(uptime % 60);
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    var upt = {
       body: "🌸 𝑻𝒉𝒐̛̀𝒊 𝒈𝒊𝒂𝒏 𝒉𝒐𝒂̣𝒕 𝒅𝒐̣̂𝒏𝒈: " + hours + ":" + minutes + ":" + seconds +
      "\n👀 𝑻𝒐̂̉𝒏𝒈 𝒏𝒈𝒖̛𝒐̛̀𝒊 𝒅𝒖̀𝒏𝒈: " + global.data.allUserID.length +
      "\n🏘️ 𝑻𝒐̂̉𝒏𝒈 𝒏𝒉𝒐́𝒎: "+ global.data.allThreadID.length +
      "\n🗂️ 𝑹𝒂𝒎 𝒔𝒖̛̉ 𝒅𝒖̣𝒏𝒈: " + byte2mb(pidusage.memory) +
      "\n📡 𝑷𝒊𝒏𝒈: " + (Date.now() - timeStart) + "ms" +
      "\n🐳 𝑷𝒓𝒆𝒇𝒊𝒙: "+ global.config.PREFIX,
    }
    return api.sendMessage(upt,event.threadID, event.messageID)
  }
  catch (e) {
    console.log(e)
  }
}
