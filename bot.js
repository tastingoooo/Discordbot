const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const settings = require("./settings.json");
const fs = require("fs");
const { default: Collection } = require("@discordjs/collection");

client.on("ready", () => {
  console.log(`${client.user.tag} 逼..逼逼...機油好難喝...`);
});

client.on("messageCreate", (msg) => {
  if (msg.content.startsWith(settings.prefix + "help")) {
    msg.channel.send(
      "目前指令：\n#抽卡機率\n#抽卡 [內容]\n#單抽 [內容]\n#晚餐\n#天氣 [城市]\n#地震"
    );
  }
  if (msg.content.startsWith(settings.prefix + "抽卡機率")) {
    msg.channel.send(
      "R = 70%    SR = 26%    SSR = 3.5%   UR = 0.5%     可憐哪=2.82%"
    );
  }
  if (
    msg.content.includes("屌") ||
    msg.content.includes("懶覺") ||
    msg.content.includes("老二") ||
    msg.content.includes("陰莖")
  ) {
    if (msg.author.id == "437298318003929111")
      msg.channel.send("這裡是群聊，不是男同俱樂部");
  }
  if (msg.content.startsWith(settings.prefix + "晚餐")) {
    fs.readFile("./dinner.txt", "UTF-8", (err, data) => {
      try {
        const dinner = data.split(",");
        let rnd = Math.floor(Math.random() * dinner.length);
        msg.channel.send(dinner[rnd]);
      } catch {
        console.log(err);
      }
    });
  }
  if (msg.content.startsWith(settings.prefix + "抽卡")) {
    if (msg.author.bot)
      //過濾機器人的話
      return;
    if (msg.content == "#抽卡機率") return;
    let rnd = [
      Random(1, 200),
      Random(1, 200),
      Random(1, 200),
      Random(1, 200),
      Random(1, 200),
      Random(1, 200),
      Random(1, 200),
      Random(1, 200),
      Random(1, 200),
      Random(1, 200),
    ];
    let sw = msg.content.replace("#抽卡 ", "");
    sw = sw.replace("#", "");
    msg.channel.send("<@" + msg.author.id + ">" + "的" + sw + "結果： ");
    msg.channel.send(
      rnd[0] +
        " " +
        rnd[1] +
        " " +
        rnd[2] +
        " " +
        rnd[3] +
        " " +
        rnd[4] +
        " " +
        rnd[5] +
        " " +
        rnd[6] +
        " " +
        rnd[7] +
        " " +
        rnd[8] +
        " " +
        rnd[9]
    );
    if (rnd.every((e) => e == "<:puzzle_R:966583940347473930>"))
      msg.channel.send("可憐哪");
  }
  if (msg.content.startsWith(settings.prefix + "單抽")) {
    //過濾機器人的話
    if (msg.author.bot) return;
    let rnd = Random(1, 200);
    let sw = msg.content.replace("#單抽 ", "");
    sw = sw.replace("#", "");
    msg.channel.send("<@" + msg.author.id + ">" + "的" + sw + "結果： ");
    msg.channel.send(rnd);
    if (
      rnd != "<:puzzle_R:966583940347473930>" &&
      rnd != "<:puzzle:732572783393112131>"
    ) {
      msg.channel.send("牛逼"); //單抽非R跟SR
    }
  }
  if (msg.content.startsWith(settings.prefix + "天氣")) {
    if (msg.author.bot) return; //過濾機器人的話
    let city = msg.content.replace("#天氣 ", ""); //將使用者的話轉成城市
    const KEY = "f2fdf3e0e00fc060f2295b4e4328c27d";

    async function getWeather() {
      let weather = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=" +
          KEY +
          "&lang=zh_tw&units=metric"
      );
      let weatherjson = await weather.json();
      for (i = 1; i <= 3; i++) {
        const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle(weatherjson.city.name)
          /* .setURL("https://discord.js.org/") */ //可以在標題上放網址
          /* .setAuthor({//這裡可以設置作者
        name: "Some name",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
        url: "https://discord.js.org",
      }) */ /* 
      .setDescription("Some description here")
      .setThumbnail("https://i.imgur.com/AfFp7pu.png") */ //可以放右上圖片
          .addFields(
            {
              name: "天氣",
              value: weatherjson.list[i].weather[0].description,
              inline: true,
            },
            {
              name: "溫度",
              value: weatherjson.list[i].main.temp + "°C",
              inline: true,
            },
            {
              name: "體感溫度",
              value: weatherjson.list[i].main.feels_like + "°C",
              inline: true,
            }
            //{ name: "\u200B", value: "\u200B" } //類似空格的存在
          )
          .addFields(
            {
              name: "濕度",
              value: weatherjson.list[i].main.humidity + "%",
              inline: true,
            },
            {
              name: "風速",
              value: weatherjson.list[i].wind.speed + "m/s",
              inline: true,
            },
            {
              name: "降雨機率",
              value: weatherjson.list[i].pop * 100 + "%",
              inline: true,
            }
          )
          .setDescription(weatherjson.list[i].dt_txt);
        /* .setImage("https://i.imgur.com/AfFp7pu.png") */ //放大的圖片;

        msg.channel.send({ embeds: [exampleEmbed] });
      }
    }
    getWeather();
  }
  if (msg.content.startsWith(settings.prefix + "地震")) {
    if (msg.author.bot) return; //過濾機器人的話
    const KEY = "CWB-74ABA257-63B3-4FED-962F-08CE3ADF83D7";
    const url =
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=" +
      KEY +
      "&limit=1&format=JSON";
    async function getEarthquake(city) {
      let earthquake = await fetch(url);
      let earthquakejson = await earthquake.json();

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("地震報告")
        .setURL(earthquakejson.records.earthquake[0].web)
        .setDescription(earthquakejson.records.earthquake[0].reportContent)
        .setImage(earthquakejson.records.earthquake[0].reportImageURI);

      msg.channel.send({ embeds: [exampleEmbed] });
    }
    getEarthquake();
  }
});

function Random(min, max) {
  //亂數轉貼圖
  let rnd = Math.floor(Math.random() * max) + min;
  if (rnd <= 140) return (rnd = "<:puzzle_R:966583940347473930>");
  else if (rnd <= 141) return (rnd = "<:puzzle_UR:966628628345520168>");
  else if (rnd <= 193) return (rnd = "<:puzzle:732572783393112131>");
  else if (rnd <= 196) return (rnd = "<:puzzle_SSR:966584102084050954>");
  else if (rnd <= 198) return (rnd = "<:laplus:647631621977014273>");
  else return (rnd = "<:la:1045056091802841108>");
}

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

client.login(settings.token);
