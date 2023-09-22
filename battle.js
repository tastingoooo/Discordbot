const weapon = require("./weapon.json");

/* console.log(weapon);
console.log(weapon.weapon[0].skill[0]); */
async function getOpenWeather() {
  let weather = await fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=%E5%8F%B0%E4%B8%AD%E5%B8%82&appid=f2fdf3e0e00fc060f2295b4e4328c27d&lang=zh_tw&units=metric"
  );
  let weatherjson = await weather.json();
  console.log(weatherjson);
}
getOpenWeather();
/* equipment = weapon.weapon.length;
battle(
  weapon.weapon[Math.floor(Math.random() * equipment)],
  weapon.weapon[Math.floor(Math.random() * equipment)]
);
function battle(player1, player2) {
  //初始化數值
  let name = ["甲", "乙"];
  let turn = 0;
  let health1 = 1000;
  let health2 = 1000;
  let dice1 = Math.floor(Math.random() * 100);
  let dice2 = Math.floor(Math.random() * 100);
  //先後手
  console.log("------------前置------------");
  console.log(name[0] + `骰出了${dice1}點。\n`);
  console.log(name[1] + `骰出了${dice2}點。\n`);
  let temp = dice1 >= dice2 ? `${name[0]}先手！` : `${name[1]}先手！`;
  //抽取武器
  console.log(temp + "\n");
  console.log(name[0] + `抽到了${player1.name}`);
  console.log(name[1] + `抽到了${player2.name}`);
  //輪流攻擊，死了就跳出
  while (health1 > 0 && health2 > 0) {
    health2 = attack(player1, health2);
    if (health2 <= 0) break;
    health1 = attack(player2, health1);
  }
  console.log("結束！");
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
    console.log(
      name[turn % 2] +
        "使用了" +
        player.skill[skillRandom].skillName +
        `造成了${total}點傷害。`
    );
    if (health > 0) {
      console.log(name[(turn + 1) % 2] + `剩下${health}滴血`);
    } else {
      console.log(name[(turn + 1) % 2] + `死亡！`);
    }
    turn++;
    if (health <= 0) return health;
    return health;
  }
}
 */
