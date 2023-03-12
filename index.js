import TelegramApi from 'node-telegram-bot-api'
const t ='5996314407:AAGulNC0er7eFRV70HLwJhphU3CgN0U4Ppk'
const bot = new TelegramApi(t, {polling: true})

bot.setMyCommands([
    {command: '/start', description: 'перезапустить бота'},
    {command: '/info', description: 'я тебя узнаю)))'},
    {command: '/weather', description: 'покажу поготу в городе'},
    {command: '/story', description: 'раскажу плохую шутку(00)'}
])

const jokeOptions = {
    reply_markup:JSON.stringify({
        inline_keyboard: [
            [{text: 'Давай по новой???', callback_data: '/story'}]
        ]
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const start = async (id, message)=> {
   await bot.sendSticker(id, 'https://tlgrm.ru/_/stickers/301/4ac/3014acc8-6fd9-4f3c-8762-a28fb028c978/1.webp')
   await bot.sendMessage(id, message);
}
const info = async (id, message)=> {
   await bot.sendMessage(id, message)
}
const weather = async (id)=> {
   await bot.sendMessage(id, 'введи название города с командой //(.название города.)')
   await  bot.sendSticker(id, 'https://cdn.tlgrm.app/stickers/1a4/41f/1a441f85-c19e-4f87-b584-3293a3cbe78e/192/5.webp')
}
const getWeathr = async (id, city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=324328e3f2a5e89954d902ef8c226770&units=metric`;
        const res = await fetch(url);
        const data = await res.json()
        bot.sendMessage(id, `температура ${data.main.temp} °C; ${data.weather[0].description}; ветер ${data.wind.speed} m/s}; влажность ${data.main.humidity}%`)
    } catch (error) {
        bot.sendMessage(id, 'ты не правильно ввел название города!!!!!!!!!!!!')
    }
}
const getStory = async (id) => { 
    let random = getRandomInt(15)
    try {
        const url = 'https://raw.githubusercontent.com/Timkahi/json/main/joke.json';
        const res = await fetch(url);
        const data = await res.json()
        bot.sendMessage(id, data.story[random], jokeOptions)
    } catch (error) {
        bot.sendMessage(id, 'lol')
    }
} 

const startBot = ()=> {
    bot.on('message', async (msg)=> {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            return start(chatId, `Привет ${msg.chat.first_name}, я телеграмм бот.`)
        }
        if (text === '/info') {
            return info(chatId, `Тебя завут ${msg.chat.first_name} ${msg.chat.last_name}`)
        }
        if (text === '/weather') {
            weather(chatId)
        }
        if(text.toString().toLocaleLowerCase().slice(0,2)==='//') {
            const ci = text.toString().toLocaleLowerCase().slice(2).trim(' ')
            console.log(ci)
            return getWeathr(chatId, ci)
        }
        if (text === '/story') {
            getStory(chatId)
        }
        console.log(msg)
    })  
}
const botReplay = () => {
    bot.on('callback_query', (msg)=> {
        const text = msg.data
       // const chatId = msg.chat.id;
        if ( text == '/story') {
            getStory(453794958)
        }
        console.log(msg.data)
    })
}
startBot()
botReplay()
