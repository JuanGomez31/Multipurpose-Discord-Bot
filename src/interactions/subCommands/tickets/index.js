const {SlashCommandBuilder} = require("discord.js");

function getSlashCommandJSON() {
    return new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Tickets Commands")
        .addSubcommandGroup(group =>
            group
                .setName('categories')
                .setDescription('Ticket categories commands')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('create')
                        .setDescription('Create a Ticket Category')
                        .addStringOption(option =>
                            option
                                .setName("name")
                                .setDescription("Name of ticket category")
                                .setRequired(true)
                        )
                        .addStringOption(option =>
                            option
                                .setName("description")
                                .setDescription("Ticket category description")
                                .setRequired(true)
                        )
                        .addRoleOption(option =>
                            option
                                .setName("role")
                                .setDescription("Manager main role")
                                .setRequired(true)
                        )
                        .addChannelOption(option =>
                            option
                                .setName("transcription_channel")
                                .setDescription("Transcription Channel")
                                .setRequired(false)
                        )
                )
        );
}

module.exports = {
    getSlashCommandJSON
};
