module.exports.config = {
    name: "unban",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "chom",
    description: "Gỡ ban nhóm và người dùng trong 1 nốt nhạc",
    commandCategory: "admin",
    usages: "",
    cooldowns: 2,
    denpendencies: {}
}, module.exports.run = async ({
    event: a,
    api: e,
    Users: n,
    Threads: t,
    args: s
}) => {
    var {
        threadID: d,
        messageID: o,
        senderID: l
    } = a;
    const {
        commands: r
    } = global.client;
    if ("chom" != r.get("unban".toLowerCase()).config.credits) return e.sendMessage("Sai credit!", a.threadID, a.messageID);
    const g = global.data.threadData.get(parseInt(a.threadID)) || {},
        i = g.hasOwnProperty("PREFIX") ? g.PREFIX : global.config.PREFIX;
    switch (s[0]) {
        case "admin":
        case "ad": {
            const a = global.config.ADMINBOT;
            for (var c of a) {
                const a = (await n.getData(c)).data || {};
                a.banned = 0, a.reason = null, a.dateAdded = null, await n.setData(c, {
                    data: a
                }), global.data.userBanned.delete(c, 1)
            }
            e.sendMessage("Đã gỡ ban cho toàn bộ admin bot!", d, o);
            break
        }
        case "allbox":
        case "allthread": {
            const a = global.data.threadBanned.keys();
            for (const e of a) {
                const a = (await t.getData(e)).data || {};
                a.banned = 0, a.reason = null, a.dateAdded = null, await t.setData(e, {
                    data: a
                }), global.data.userBanned.delete(e, 1)
            }
            e.sendMessage("Đã gỡ ban cho toàn nhóm trên server", d, o);
            break
        }
        case "box":
        case "thread":
            var b = a.threadID;
            (h = (await t.getData(b)).data || {}).banned = 0, h.reason = null, h.dateAdded = null, await t.setData(b, {
                data: h
            }), global.data.userBanned.delete(b, 1), e.sendMessage("Đã gỡ ban cho nhóm này!", d, o);
            break;
        case "allmember":
        case "alluser": {
            const a = global.data.userBanned.keys();
            for (const e of a) {
                const a = (await n.getData(e)).data || {};
                a.banned = 0, a.reason = null, a.dateAdded = null, await n.setData(e, {
                    data: a
                }), global.data.userBanned.delete(e, 1)
            }
            e.sendMessage("Đã gỡ ban cho toàn bộ người dùng trên server", d, o);
            break
        }
        case "qtvall":
        case "Qtvall":
        case "allqtv":
            var h = [];
            h = await t.getAll();
            for (let a = 0; a < h.length; a++) {
                const e = h[a].threadInfo.adminIDs;
                for (let a = 0; a < e.length; a++) {
                    const t = e[a].id,
                        s = (await n.getData(t)).data || {};
                    s.banned = 0, s.reason = null, s.dateAdded = null, await n.setData(t, {
                        data: s
                    }), global.data.userBanned.delete(t, 1)
                }
            }
            e.sendMessage("Đã gỡ ban cho toàn bộ QTV Box trên sever!", d, o);
            break;
        case "qtv":
        case "Qtv":
            var m = (await t.getData(a.threadID)).threadInfo.adminIDs;
            for (let a = 0; a < m.length; a++) {
                const e = m[a].id,
                    t = (await n.getData(e)).data || {};
                t.banned = 0, t.reason = null, t.dateAdded = null, await n.setData(e, {
                    data: t
                }), global.data.userBanned.delete(e, 1)
            }
            e.sendMessage("Đã gỡ ban cho toàn bộ QTV Box này!", d, o);
            break;
        case "member":
        case "mb":
        case "user":
            if (!s[1]) {
                var u = a.participantIDs;
                for (let a = 0; a < u.length; a++) {
                    const e = u[a],
                        t = (await n.getData(e)).data || {};
                    t.banned = 0, t.reason = null, t.dateAdded = null, await n.setData(e, {
                        data: t
                    }), global.data.userBanned.delete(e, 1)
                }
                return e.sendMessage("Đã gỡ ban cho toàn bộ thành viên trong nhóm này!", d, o)
            }
            if (-1 !== s.join().indexOf("@")) {
                var D = Object.keys(a.mentions),
                    f = (await n.getData(D)).userID,
                    v = (await n.getData(D)).name;
                const t = (await n.getData(f)).data || {};
                return t.banned = 0, t.reason = null, t.dateAdded = null, await n.setData(f, {
                    data: t
                }), global.data.userBanned.delete(f, 1), e.sendMessage(`${v} đã được gỡ ban!`, d, o)
            }
            break;
        default:
            e.sendMessage(`Bạn có thể dùng:\n\n${i}${this.config.name} admin => gỡ ban cho toàn bộ admin bot\n\n${i}${this.config.name} allbox => gỡ ban cho toàn bộ nhóm trên sever\n\n${i}${this.config.name} box => gỡ ban cho nhóm hiện tại [1 nhóm ]\n\n${i}${this.config.name} alluser => gỡ ban cho toàn bộ người dùng trên sever\n\n${i}${this.config.name} allqtv => gỡ ban cho toàn bộ QTV Box trên sever\n\n${i}${this.config.name} qtv => gỡ ban cho toàn bộ QTV Box [1 box ]\n\n${i}${this.config.name} member => gỡ ban cho toàn bộ thành viên trong nhóm [1 nhóm ]\n\n${i}${this.config.name} member @[tag] => gỡ ban cho người được tag`, d, o)
    }
};