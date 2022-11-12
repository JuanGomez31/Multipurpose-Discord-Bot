const {getTicketCategoriesOptions} = require("../../../../domain/ticketCategoriesManager");


module.exports = {
    async run(bot, interaction) {

    },
    async autoComplete(bot, interaction) {
        await interaction.respond(await getTicketCategoriesOptions(interaction.guild.id));
    }
}