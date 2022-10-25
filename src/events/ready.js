module.exports = {
    once: true,
    name: 'ready',
    run(bot) {
        console.log(bot.user.username+" encendido")
    }
}