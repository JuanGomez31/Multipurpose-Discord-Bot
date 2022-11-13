const {getTicketCategoriesOptions, getCategoryByID} = require("../../../../domain/ticketCategoriesManager");
const {createTicket} = require("../../../../domain/ticketManager");


module.exports = {
    async run(bot, interaction) {
        let category = interaction.options.getString('category');
        let categoryData = await getCategoryByID(interaction.guild.id, category)
        await interaction.reply({content: await createTicket(interaction.guild, interaction.member, categoryData), ephemeral: true})
    },
    async autoComplete(bot, interaction) {
        await interaction.respond(await getTicketCategoriesOptions(interaction.guild.id));
    }
}