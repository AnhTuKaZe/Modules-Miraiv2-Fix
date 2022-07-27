module.exports.config = {
  name: "4k",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "chom",
  description: "lmao",
  commandCategory: "Other",
  usages: "",
    cooldowns: 0,
};
module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    const res = await axios.get(`https://api.reiyuura.me/api/anime/wallpaper2`);
    var data = res.data.result;
    var msg = [];
    let img1 = `${res.data.result[0].image}`;
    let img2 = `${res.data.result[1].image}`;
    let img3 = `${res.data.result[2].image}`;
    let img4 = `${res.data.result[3].image}`;
    let img5 = `${res.data.result[4].image}`;
	let img6 = `${res.data.result[5].image}`;
	let img7 = `${res.data.result[6].image}`;
	let img8 = `${res.data.result[7].image}`;
	let img9 = `${res.data.result[8].image}`;

    let imgs1 = (await axios.get(`${img1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img1.png", Buffer.from(imgs1, "utf-8"));
    let imgs2 = (await axios.get(`${img2}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img2.png", Buffer.from(imgs2, "utf-8"));
    let imgs3 = (await axios.get(`${img3}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img3.png", Buffer.from(imgs3, "utf-8"));
    let imgs4 = (await axios.get(`${img4}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img4.png", Buffer.from(imgs4, "utf-8"));
    let imgs5 = (await axios.get(`${img5}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img5.png", Buffer.from(imgs5, "utf-8"));
	let imgs6 = (await axios.get(`${img6}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img6.png", Buffer.from(imgs6, "utf-8"));
	let imgs7 = (await axios.get(`${img7}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img7.png", Buffer.from(imgs7, "utf-8"));
	let imgs8 = (await axios.get(`${img8}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img8.png", Buffer.from(imgs8, "utf-8"));
	let imgs9 = (await axios.get(`${img9}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img9.png", Buffer.from(imgs9, "utf-8"));

    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/img1.png"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img2.png"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img3.png"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img4.png"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img5.png"));
	allimage.push(fs.createReadStream(__dirname + "/cache/img6.png"));
	allimage.push(fs.createReadStream(__dirname + "/cache/img7.png"));
	allimage.push(fs.createReadStream(__dirname + "/cache/img8.png"));
	allimage.push(fs.createReadStream(__dirname + "/cache/img9.png"));
	
    {
        msg += `ảnh đây nhé`
    }
    
    return api.sendMessage({
        body: msg,
        attachment: allimage
    }, event.threadID);
}