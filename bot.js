    const {Client, RichEmbed, Discord} = require('discord.js') ;
    const client = new Client ;
    const settings = require('./settings.json') ;
    const request = require("request");
    const cheerio = require("cheerio");
    
    client.on('ready',()=>{
        console.log(`${client.user.tag} 逼..逼逼...機油好難喝...`) ;
    }) ;

    client.on('message',msg=>{
        if(msg.content.startsWith(settings.prefix+'help'))
        {
            msg.channel.send('目前指令：\n#抽卡機率\n#抽卡\n晚餐\n降雨') ;
        }
        if(msg.content.startsWith(settings.prefix+'抽卡機率'))
        {
            msg.channel.send('R = 70%    SR = 26%    SSR = 3%   UR = 1%     可憐哪=2.82%');
        }
        if(msg.content.includes('屌'))
        {
            msg.channel.send('這裡是群聊，不是男同俱樂部');
        }
        if(msg.content.startsWith(settings.prefix+'晚餐'))
        {
            const food = ['丼飯','壽司','火鍋','意麵','粥','滷肉飯','牛排','鐵板燒','滷味','麻辣燙','牛肉麵','水餃','蒸餃','煎餃','拉麵','麥當勞','肯德基','MOS','排骨酥麵','羹麵',
                          '雞排','臭豆腐','炒麵/飯','義大利麵','焗烤','披薩','鹽酥雞','鹹水雞','大阪燒','便利商店','豆漿店','自己煮','燴飯','奶子','不要吃','異國料理','咖哩飯','泡麵','夜市',
                            '燒烤','早午餐/盤餐','港式','韓式','便當','居酒屋','漢堡','燒臘','小籠包','法式鵝肝佐魚子醬','關東煮','米糕','油飯','大腸包小腸','章魚燒','大腸麵線',
                            '蚵仔麵線','酸辣魚','泰式料理','越南小吃','豆花','藥燉排骨','生魚片','沙拉','蛋包飯','鍋燒'];
            var rnd = Math.floor(Math.random()*food.length);
            msg.channel.send(food[rnd]);
        }
        if(msg.content.startsWith(settings.prefix+'降雨'))
        {
            const area = msg.content.replace('#降雨 ','');
            request(
            {
                url: "https://weather.sina.com.tw/tw_tomorrow.shtml",
                method: "GET"
            }, (error, res, body) => 
            {
                // 如果有錯誤訊息，或沒有 body(內容)，就 return
                if (error || !body) {
                    msg.channel.send('爬取失敗');
                }
                const $ = cheerio.load(body); // 載入 body
                const list = $(".twday_borc tbody tr td");
                for (let i = 0; i < list.length; i=i+4) 
                {
                    const city = list.eq(i).text();
                    const weather = list.eq(i+1).text();
                    const temperature = list.eq(i+2).text();
                    const rain = list.eq(i+3).text();
                    
                    if(city.includes(area))
                        msg.channel.send(city+'\t'+weather+'\t溫度：'+temperature+'\t降雨機率：'+rain);
                }
            });
        }
        if(msg.content.startsWith(settings.prefix+'抽卡'))
        {
            if(msg.author.bot)//過濾機器人的話
                return ;
            if(msg.content == '#抽卡機率')
                return ;
            var rnd=[Random(1,100),Random(1,100),Random(1,100),Random(1,100),Random(1,100),Random(1,100),Random(1,100),Random(1,100),Random(1,100),Random(1,100)];
            var sw = msg.content.replace('#抽卡 ','');
            sw = sw.replace('#','')
            msg.channel.send(msg.author+'的'+sw+'結果： ');
            msg.channel.send(rnd[0]+" "+rnd[1]+" "+rnd[2]+" "+rnd[3]+" "+rnd[4]+" "+rnd[5]+" "+rnd[6]+" "+rnd[7]+" "+rnd[8]+" "+rnd[9]);
            if(rnd.every(e => e == '<:puzzle_R:966583940347473930>'))
                msg.channel.send('可憐哪')
        }
    }) ;

    function Random(min,max){//亂數轉貼圖
        var rnd = Math.floor(Math.random()*max)+min;
        if(rnd <= 70)
            return rnd = '<:puzzle_R:966583940347473930>';
        else if(rnd <= 96)
            return rnd = '<:puzzle:732572783393112131>';
        else if(rnd <= 99)
            return rnd = '<:puzzle_SSR:966584102084050954>';
        else 
            return rnd = '<:puzzle_UR:966628628345520168>';
    }

    client.login(settings.token) ;