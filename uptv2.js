module.exports.config = {
  name: "uptv2",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "chom",// Đã mod thêm thời gian và ngày
  description: "Kiểm tra thời gian bot đã online",
  commandCategory: "Tiện ích",
  cooldowns: 5,
  dependencies: {
    "pidusage": "",
    "fast-speedtest-api": ""
  }
};

function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.run = async ({ api, event, args }) => {
    const fast = global.nodemodule["fast-speedtest-api"];
   const prefix = config.PREFIX
  const moment = require("moment-timezone");
    const speedTest = new fast({
      token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
      verbose: false,
      timeout: 10000,
      https: true,
      urlCount: 5,
      bufferSize: 8,
      unit: fast.UNITS.Mbps
    });
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY || HH:mm:ss");
   var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
    const resault = await speedTest.getSpeed();
  const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);
  const axios = global.nodemodule["axios"];
  const pidusage = await global.nodemodule["pidusage"](process.pid);
  const timeStart = Date.now();
  return api.sendMessage("", event.threadID, () => api.sendMessage(`======𝐶ℎ𝑎𝑡𝐵𝑜𝑡======\n❯Hôm nay là: ${thu}\n❯${gio}\n❯Time: ${hours} Giờ ${minutes} Phút ${seconds} Giây\n❯Users: ${global.data.allUserID.length}\n❯Ping: ${Date.now() - timeStart}ms\n❯Prefix: ${prefix}\n❯Fast: ${resault} Mbs\n======𝐶ℎ𝑎𝑡𝐵𝑜𝑡======`, event.threadID, event.messageID));
    }