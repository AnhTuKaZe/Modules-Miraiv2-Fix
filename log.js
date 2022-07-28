module.exports.config = {
  name: "log",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "chom",
  description: "log",
  commandCategory: "admin",
  usages: "",
  cooldowns: 3,
  denpendencies: {
  }
};

module.exports.run = async function ({ api, event, Threads, getText }) {
const permission = ["100045609437771", "100061321638702"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Bạn làm gì vậy :>", event.threadID, event.messageID);
  var { threadID, messageID, senderID } = event;
  //if (senderID == global.data.botID) return;

  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data;
  //console.log(data)
  //var prefix = data.PREFIX;
  /////////////////////// Evens
  var log = data.log;
  var joinNoti = data.joinNoti;
  var leaveNoti = data.leaveNoti;
  //////////////////////
  //var rankup = data.rankup;
  //var resend = data.resend;

  var roleplay = data.roleplay;
  var goibot = data.goibot;
  var tagadmin = data.tagadmin;
  var fixspam = data.fixspam;
  var spamban = data.spamban;

  //prefix == null ? rankup = `!` : rankup = `${prefix}`;
  log == null ? log = `true` : log = `${log}`; 
//rankup == null ? rankup = `false` : rankup = `${rankup}`;
//resend == null ? resend = `false` : resend = `${resend}`;
  //////////////////////////// event
  joinNoti == null ? joinNoti = `true` : joinNoti = `${joinNoti}`;
  leaveNoti == null ? leaveNoti = `true` : leaveNoti = `${leaveNoti}`;
  ////////////////////////////
  roleplay == null ? roleplay = `true` : roleplay = `${roleplay}`;
  goibot == null ? goibot = `true` : goibot = `${goibot}`;
  tagadmin == null ? tagadmin = `true` : tagadmin = `${tagadmin}`;
  fixspam == null ? fixspam = `true` : fixspam = `${fixspam}`;
  spamban == null ? spamban = `true` : spamban = `${spamban}`;

  return api.sendMessage(`╭─────╮\n Command\n╰─────╯\n❯💛 roleplay: ${roleplay}\n❯🖤 goibot: ${goibot}\n❯❤️ tagadmin: ${tagadmin}\n❯💙 fixspam: ${fixspam}\n❯💗 spamban: ${spamban}\n╭─────╮\n   Event\n╰─────╯\n❯🐸 log: ${log}\n❯🐉 joinNoti: ${joinNoti}\n❯🍀 leaveNoti: ${leaveNoti}`, threadID, messageID);
                    }