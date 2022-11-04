const {InteractionType} = require("discord-api-types/v10");
const SlashCommand = require("../models/SlashCommand");
const SlashSubCommand = require("../models/SlashSubCommand");


module.exports = {
    name: "interactionCreate",
    async run(interaction, bot) {

        if(InteractionType.ApplicationCommand) {
            let slashCommand = SlashCommand.getCommandByName(interaction.commandName)
            if(slashCommand) {
                let commandFile = slashCommand.getFile();
                await commandFile.run(bot, interaction);
            } else {
                let group = interaction.options.getSubcommandGroup(false);
                let subCommandName = interaction.options.getSubcommand(false);
                slashCommand = SlashSubCommand.getSubCommand(interaction.commandName,subCommandName, group);
                let commandFile = slashCommand.getFile();
                await commandFile.run(bot, interaction);
            }
        }


    }
}
