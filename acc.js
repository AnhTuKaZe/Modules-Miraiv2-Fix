module.exports.config = {
    name: 'acc',
    version: '1.1.1',
    hasPermssion: 0,
    credits: '𝐋𝐚𝐳𝐲𝐊𝐚𝐳𝐞-𝐁𝐎𝐓',
    description: 'Lấy thời gian người dùng tạo tài khoản Facebook',
    commandCategory: 'Ngày tạo FB',
    usages: '< >'
};
const {get} = require('axios');
module.exports.run = function({ api, event, args }){
  const uid = event.type == 'message_reply' ? event.messageReply.senderID: !!Object.keys(event.mentions)[0] ? Object.keys(event.mentions)[0]: !!args[0] ? args[0]: event.senderID;
  get(`https://golike.com.vn/func-api.php?user=${uid}`).then(response => {
      var txt;
      if (response.data.status == 404) txt = `Không tìm thấy`;
      if (response.data.status == 200) txt = `${response.data.data.date.replace(' ', ' | ')}`;
      api.sendMessage(txt, event.threadID, event.messageID);
  }).catch(e => api.sendMessage(e, event.threadID, event.messageID));
};
