const Telegraf = require('telegraf');
const startAction = require('./actions/start')
var request = require('request');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(ctx => {
  return startAction(ctx)
})
bot.command('oldschool', (ctx) => ctx.reply('Hello man'))
bot.command('t', (ctx) => {
  console.log(ctx.message.text);
  var options = {
  url: 'https://query2.finance.yahoo.com/v7/finance/options/'+ctx.message.text.split(' ')[1]};
  function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log(body);
      tiker=JSON.parse(body);
      ctx.reply(tiker['optionChain']['result'][0]['quote']['shortName']+' '+tiker['optionChain']['result'][0]['quote']['regularMarketPrice']);
      
  }
  else {
    ctx.reply(response.statusCode);
  }
  }
  request(options, callback);

})

exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: '' };
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
  }

}
