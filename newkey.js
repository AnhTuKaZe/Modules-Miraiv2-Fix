module.exports.config = {
    name: "newkey",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "chom",
    description: "Thay Key Premium Fca Nhanh Chóng Và Pay Acc =))",
    commandCategory: "admin",
    usages: "Just Do it",
    cooldowns: 5
};

module.exports.run = function({ api,event,args }) {
    var fs = require('fs-extra'),{ join } = require('path');
        if (!args[0]) {
            return api.sendMessage("Bạn chưa nhập key mới để thay!", event.threadID);
        }
        else try {
            var FileFastConfig = require(join(process.cwd(), 'FastConfigFca.json'));
            FileFastConfig.PreKey = String(args[0]);
            fs.writeFileSync(join(process.cwd(), 'FastConfigFca.json'), JSON.stringify(FileFastConfig, null, 4));
            api.sendMessage("Đã thay key thành công!, Tiến Hành Restart Lại Bot !", event.threadID, () => process.exit(1));
        }
    catch (e) {
        return api.sendMessage("Không thể thay key, vui lòng thử lại!", event.threadID);
    }
}