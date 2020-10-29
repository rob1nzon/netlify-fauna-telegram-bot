const Telegraf = require('telegraf');
const startAction = require('./actions/start')
var request = require('request');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const {MenuTemplate, MenuMiddleware} = require('telegraf-inline-menu')

// const menuTemplate = new MenuTemplate(ctx, msg => `${msg}`)

// menuTemplate.interact('¯\_(ツ)_/¯', 'a', {})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getTik(t) {
  console.log(t);
  var msg = 'None'; 
  var url = 'https://query2.finance.yahoo.com/v7/finance/options/'+t;
  request(url, 
    function (error, response, body) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    tiker=JSON.parse(body);
    return tiker['optionChain']['result'][0]['quote']['shortName']+' '+tiker['optionChain']['result'][0]['quote']['regularMarketPrice'];
    }
  );
  return msg;
}

bot.start(ctx => {
  return startAction(ctx)
})

answer = ['поку-ку-ку-ку-пай','продавай', 'шортим', '¯\_(ツ)_/¯']
bot.command('petu', (ctx) => ctx.reply(answer[getRandomInt(0,answer.length)]));
bot.command('t', (ctx) =>  {
  var url = 'https://query2.finance.yahoo.com/v7/finance/options/'+ctx.message.text.split(' ')[1];
  request(url, 
    function (error, response, body) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    tiker=JSON.parse(body);
    ctx.reply(tiker['optionChain']['result'][0]['quote']['shortName']+' '+tiker['optionChain']['result'][0]['quote']['regularMarketPrice']);
    }
  );
});
  // ctx.reply(' '+getTik(ctx.message.text.split(' ')[1]))})
// const menuMiddleware = new MenuMiddleware('/', menuTemplate)
// bot.command('tt', ctx => menuMiddleware.replyToContext(ctx, '123'))
// bot.use(menuMiddleware)

exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: '' };
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
  }

}
