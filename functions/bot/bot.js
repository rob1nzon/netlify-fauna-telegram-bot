const Telegraf = require('telegraf');
const startAction = require('./actions/start')

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(ctx => {
  return startAction(ctx)
})
bot.command('oldschool', (ctx) => ctx.ctx.replyWithPhoto('https://picsum.photos/200/300/?random'))

exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: '' };
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
  }

}
