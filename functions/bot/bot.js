const Telegraf = require('telegraf');
const startAction = require('./actions/start')
var request = require('request');
const {MenuTemplate, MenuMiddleware} = require('telegraf-inline-menu')

const menuTemplate = new MenuTemplate(ctx => `${ctx.from.first_name}, chto zret Nikolay?`)

menuTemplate.interact('a chto vsmisle?', 'a', {
  // do: ctx => ctx.reply('As am I!')
  do: ctx => {
        var headers = {
          'Cookie': process.env.COOKIES
      };
      
      var options = {
          url: 'https://camera.rt.ru/api/v1/user/cameras/7ffd5676-ea4f-4abb-9ec7-45bb0e10d71f/streamer_token.json',
          headers: headers
      };
      var token
      function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body);
              token=JSON.parse(body);
              var headers = {
                  'Cookie': 'utoken='+token['utoken']
              };

              var options2 = {
                  url: 'https://cdn.camera.rt.ru/image/precise/original/7ffd5676-ea4f-4abb-9ec7-45bb0e10d71f/last.jpg?token='+token['streamer_token'],
                  headers: headers,
                  encoding: null
              };

              function callback2(error, response, body) {
                  if (!error && response.statusCode == 200) {
                      ctx.replyWithPhoto({ source: body});
                      // ctx.deleteMessage();
                  }
              }
              request(options2, callback2);
          }
          else {
            ctx.reply(response.statusCode);
          }
      }
      request(options, callback);
  }
})


const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(ctx => {
  return startAction(ctx)
})
const menuMiddleware = new MenuMiddleware('/', menuTemplate)
bot.command('new', ctx => menuMiddleware.replyToContext(ctx))
bot.use(menuMiddleware)

bot.on('message', (ctx) => {
    if (ctx.message.text=='/kek@nicolayzret_bot') {
      // console.log(ctx);
      // 
      var headers = {
        'Cookie': process.env.COOKIES
    };
    
    var options = {
        url: 'https://camera.rt.ru/api/v1/user/cameras/'+process.env.UID+'/streamer_token.json',
        headers: headers
    };
    var token
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            token=JSON.parse(body);
            var headers = {
                'Cookie': 'utoken='+token['utoken']
            };

            var options2 = {
                url: 'https://cdn.camera.rt.ru/image/precise/original/'+process.env.UID+'/last.jpg?token='+token['streamer_token'],
                headers: headers,
                encoding: null
            };

            function callback2(error, response, body) {
                if (!error && response.statusCode == 200) {
                    ctx.replyWithPhoto({ source: body});
                    // ctx.deleteMessage();
                }
            }
            request(options2, callback2);
        }
        else {
          ctx.reply(response.statusCode);
        }
    }
    request(options, callback);
   
    }
})

// bot.on('message', (ctx) => console.log(ctx))

exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: '' };
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
  }

}
