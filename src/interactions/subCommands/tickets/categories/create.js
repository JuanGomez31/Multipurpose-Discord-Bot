const {createTicketCategory} = require("../../../../domain/ticketCategoriesManager");
const {memberIsAdmin} = require("../../../../domain/serverManager");
const {INSUFFICIENT_PERMISSIONS} = require("../../../../config/lang.json");

module.exports = {
    async run(bot, interaction) {
        if (!memberIsAdmin(interaction.member)) {
            await interaction.reply({content: INSUFFICIENT_PERMISSIONS, ephemeral: true});
            return;
        }
        let name = interaction.options.getString('name');
        let description = interaction.options.getString('description');
        let role = interaction.options.getRole('role');
        let transcriptionChannel = interaction.options.getChannel("transcription_channel") ?? false;
        await interaction.reply({content: await createTicketCategory(interaction.guild, name, description, role, transcriptionChannel), ephemeral: true})
    }
}