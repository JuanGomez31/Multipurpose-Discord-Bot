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
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('open')
                .setDescription('Open ticket')
                .addStringOption(option =>
                    option
                        .setName("category")
                        .setDescription("Ticket category")
                        .setRequired(true)
                        .setAutocomplete(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('close')
                .setDescription('Close ticket')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a member to the ticket')
                .addUserOption(option =>
                    option
                        .setName("member")
                        .setDescription("Added memebr")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a member from the ticket')
                .addUserOption(option =>
                    option
                        .setName("member")
                        .setDescription("Removed member")
                        .setRequired(true)
                )
        );
}

module.exports = {
    getSlashCommandJSON
};
