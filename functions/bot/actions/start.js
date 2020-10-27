const { newUser} = require('../components/fauna')
const { getUser } = require('../components/helper')

module.exports = async ctx => {
  const { id, isBot, name } = getUser(ctx.from)

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`)
  }

  try {
    let isNewUser = await newUser(id)
    if (isNewUser) {
      return ctx.reply(`Added ${name} to db!`)
    }else{
      return ctx.reply(`${name}, for smotret' kak Nicolay zret say /kek@nicolayzret_bot `)
    }
   
  } catch (e) {
    return ctx.reply(`Error occured`)
  }

}