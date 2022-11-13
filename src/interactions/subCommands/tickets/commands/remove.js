const {removeMemberFromTicket} = require("../../../../domain/ticketManager");


module.exports = {
    async run(bot, interaction) {
        let user = interaction.options.getUser('member');
        await interaction.reply({embeds: [await removeMemberFromTicket(interaction.guild, interaction.channel, interaction.member, user)]})
    }
}