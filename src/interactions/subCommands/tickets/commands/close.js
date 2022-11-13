const {closeTicket} = require("../../../../domain/ticketManager");


module.exports = {
    async run(bot, interaction) {
        await interaction.reply({content: await closeTicket(interaction.guild, interaction.channel, interaction.member), ephemeral: true})
    }
}