module.exports.config = {
    name:"\n",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "chom",
    description: "Random ảnh theo api - uptime",
    commandCategory: "noprefix",
    cooldowns: 1
};
module.exports.run = async ({ api, event, args, Users }) => {
  const { threadID, messageID } = event;
  let name = await Users.getNameUser(event.senderID);
    var upt = {
      body: "Thằng Ranh Con Mày Viết Sai Lệnh Rồi\nNgu Như Bòa"
   }
   return api.sendMessage(upt,event.threadID, event.messageID)
 }
