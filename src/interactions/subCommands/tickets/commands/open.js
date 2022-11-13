const {getTicketCategoriesOptions} = require("../../../../domain/ticketCategoriesManager");
const {createTicket} = require("../../../../domain/ticketManager");


module.exports = {
    async run(bot, interaction) {
        let category = interaction.options.getString('category');
        await interaction.reply({content: await createTicket(interaction.guild, interaction.member, category), ephemeral: true})
    },
    async autoComplete(bot, interaction) {
        await interaction.respond(await getTicketCategoriesOptions(interaction.guild.id));
    }
}