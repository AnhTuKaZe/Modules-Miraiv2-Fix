module.exports.config = {
    name: "enchant",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "chom",
    description: "Convert your text into minecraft enchantment table language",
    commandCategory: "text",
    cooldowns: 0
};
module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID, senderID, body } = event;
    var content = args.join(" ").toLowerCase();;
     		if (!content) return api.sendMessage(`Baka! You must give me something to enchant.`,event.threadID,event.messageID);
    let msgtext = content.replace(/a/gi, "ᔑ")
      .replace(/b/gi, "ʖ")
      .replace(/c/gi, "ᓵ")
      .replace(/d/gi, "↸")
      .replace(/e/gi, "ᒷ")
      .replace(/f/gi, "⎓")
      .replace(/g/gi, "⊣")
      .replace(/h/gi, "⍑")
      .replace(/i/gi, "╎")
      .replace(/j/gi, "⋮")
      .replace(/k/gi, "ꖌ")
      .replace(/l/gi, "ꖎ")
      .replace(/m/gi, "ᒲ")
      .replace(/n/gi, "リ")
      .replace(/o/gi, "𝙹")
      .replace(/p/gi, "!¡")
      .replace(/q/gi, "ᑑ")
      .replace(/r/gi, "∷")
      .replace(/s/gi, "ᓭ")
      .replace(/t/gi, "ℸ ̣")
      .replace(/u/gi, "⚍")
      .replace(/v/gi, "⍊")
      .replace(/w/gi, "∴")
      .replace(/x/gi, "·/")
      .replace(/y/gi, "||")
      .replace(/z/gi, "⨅");;
    return api.sendMessage(msgtext, threadID,messageID);
}
