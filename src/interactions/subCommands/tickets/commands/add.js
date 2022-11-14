const {addMemberToTicket} = require("../../../../domain/ticketManager");


module.exports = {
    async run(bot, interaction) {
        let user = interaction.options.getUser('member');
        await interaction.reply({embeds: [await addMemberToTicket(interaction.guild, interaction.channel, interaction.member, user)]})
    }
}