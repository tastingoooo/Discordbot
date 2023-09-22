require("dotenv").config();
const weapon = require("./weapon.json");
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const settings = require("./settings.json");
const fs = require("fs");
client.on("ready", () => {
  console.log(`${client.user.tag} 逼..逼逼...機油好難喝...`);
});

client.on("messageCreate", (msg) => {
  if (msg.content.startsWith(settings.prefix + "help")) {
    msg.channel.send(
      "目前指令：\n#抽卡機率\n#抽卡 [內容]\n#單抽 [內容]\n#晚餐\n#天氣 [城市(要完全符合)]\n#地震 [數字(前幾筆)]"
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
  if (
    msg.content.includes(/* settings.prefix + */ "抽") &&
    msg.content.includes(/* settings.prefix + */ "卡")
  ) {
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
  if (msg.content.startsWith(settings.prefix + "weather")) {
    if (msg.author.bot) return; //過濾機器人的話
    let city = msg.content.replace("#weather ", ""); //將使用者的話轉成城市
    const KEY = process.env.OpenWeatherKEY;

    async function getOpenWeather() {
      let weather = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=" +
          KEY +
          "&lang=zh_tw&units=metric"
      );
      let weatherjson = await weather.json();
      for (i = 2; i <= 4; i++) {
        const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle(weatherjson.city.name)
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

        msg.channel.send({ embeds: [exampleEmbed] });
      }
    }
    getOpenWeather();
  }
  if (msg.content.startsWith(settings.prefix + "地震")) {
    if (msg.author.bot) return; //過濾機器人的話
    let number = msg.content.replace("#地震", "");
    number = number.replace(" ", "");
    let i = number ? number : 0;
    const KEY = process.env.OpenDataKEY;
    const url =
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=" +
      KEY +
      "&format=JSON";
    async function getEarthquake() {
      let earthquake = await fetch(url);
      let earthquakejson = await earthquake.json();

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x696969)
        .setTitle("地震報告")
        .setURL(earthquakejson.records.Earthquake[i].Web)
        .setDescription(earthquakejson.records.Earthquake[i].ReportContent)
        .setImage(earthquakejson.records.Earthquake[i].ReportImageURI);

      msg.channel.send({ embeds: [exampleEmbed] });
    }
    getEarthquake();
  }
  if (msg.content.startsWith(settings.prefix + "天氣")) {
    if (msg.author.bot) return; //過濾機器人的話
    let city = msg.content.replace("#天氣 ", ""); //將使用者的話轉成城市
    const KEY = process.env.OpenDataKEY;

    async function getWeather() {
      let weather = await fetch(
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=" +
          KEY +
          "&locationName=" +
          city
      );
      let weatherjson = await weather.json();
      for (i = 0; i <= 2; i++) {
        const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle(weatherjson.records.location[0].locationName)
          .addFields(
            {
              name: "天氣",
              value:
                weatherjson.records.location[0].weatherElement[0].time[i]
                  .parameter.parameterName,
              inline: true,
            },
            {
              name: "溫度",
              value:
                weatherjson.records.location[0].weatherElement[2].time[i]
                  .parameter.parameterName +
                "~" +
                weatherjson.records.location[0].weatherElement[4].time[i]
                  .parameter.parameterName +
                "°C",
              inline: true,
            },
            {
              name: "降雨機率",
              value:
                weatherjson.records.location[0].weatherElement[1].time[i]
                  .parameter.parameterName + "%",
              inline: true,
            }
          )
          .setDescription(
            weatherjson.records.location[0].weatherElement[0].time[i].startTime
          );

        msg.channel.send({ embeds: [exampleEmbed] });
      }
    }
    getWeather();
  }
  if (msg.content.startsWith(settings.prefix + "時間")) {
    if (msg.author.bot) return; //過濾機器人的話
    let value = msg.content.replace("#時間 ", ""); //將使用者的話轉成城市
  }
  if (msg.content.startsWith(settings.prefix + "對決")) {
    equipment = weapon.weapon.length;
    battle(
      weapon.weapon[Math.floor(Math.random() * equipment)],
      weapon.weapon[Math.floor(Math.random() * equipment)]
    );
    function battle(player1, player2) {
      //初始化數值
      let sw = msg.content.replace("#對決 ", "");
      sw = sw == "#對決" ? "bot" : sw;
      let name = ["<@" + msg.author.id + ">", sw];
      let turn = 0;
      let health1 = 1000;
      let health2 = 1000;
      let str = "";
      //先後手
      let dice1 = Math.floor(Math.random() * 100);
      let dice2 = Math.floor(Math.random() * 100);
      str += "--------------前置--------------\n";
      str += name[0] + `骰出了${dice1}點。\n`;
      str += name[1] + `骰出了${dice2}點。\n`;
      let temp =
        dice1 >= dice2 ? `${name[0]}先手！\n\n` : `${name[1]}先手！\n\n`;
      let nickName =
        dice1 >= dice2 ? ["[我方]", "[敵方]"] : ["[敵方]", "[我方]"];
      name =
        dice1 >= dice2
          ? ["<@" + msg.author.id + ">", sw]
          : [sw, "<@" + msg.author.id + ">"];

      //抽取武器
      str += temp;
      str += name[0] + `抽到了${player1.name}\n`;
      str += name[1] + `抽到了${player2.name}\n`;
      str += "------------前置結束------------\n";
      str += "```\n";
      //輪流攻擊，死了就跳出
      while (health1 > 0 && health2 > 0) {
        health2 = attack(player1, health2);
        if (health2 <= 0) break;
        health1 = attack(player2, health1);
      }
      str += "\n60秒後返回營地‧‧‧";
      str += "```";
      health1 < 0 ? (str += `${name[1]}勝利！`) : (str += `${name[0]}勝利！`);

      msg.channel.send(str);
      //就隨機傷害
      function damage() {
        let rnd = Math.floor(Math.random() * 290) + 10;
        return rnd;
      }
      function attack(player, health) {
        let total = "";
        let skillRandom = Math.floor(Math.random() * player.skill.length);
        //打幾下就跑幾次
        for (let i = 0; i < player.skill[skillRandom].hit; i++) {
          if (health <= 0) break;
          let temp;
          //把隨機傷害*係數取整數
          temp = Math.floor(damage() * player.skill[skillRandom].ratio);
          //將string加上去
          total = total == "" ? total + temp : total + "、" + temp;
          health = health - temp;
        }
        str +=
          nickName[turn % 2] +
          "使用了***" +
          player.skill[skillRandom].skillName +
          `***，造成了${total}點傷害。\n`;
        if (health > 0) {
          str += nickName[(turn + 1) % 2] + `剩下${health}滴血！\n`;
        } else {
          str += nickName[(turn + 1) % 2] + `貓車！\n`;
        }
        turn++;
        if (health <= 0) return health;
        return health;
      }
    }
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
