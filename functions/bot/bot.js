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

bot.start(ctx => {
  return startAction(ctx)
})
answer = ['поку-ку-ку-ку-пай','продавай', 'шортим', '¯\_(ツ)_/¯']
bot.command('petu', (ctx) => ctx.reply(answer[getRandomInt(0,answer.length)]));

bot.on('message', (ctx) => {
  console.log(ctx.message.text)
  ctx.reply(ctx.message.text.toUpperCase())
  })
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
