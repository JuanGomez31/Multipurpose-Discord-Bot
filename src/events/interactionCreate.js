const {InteractionType} = require("discord-api-types/v10");
const SlashCommand = require("../models/SlashCommand");
const SlashSubCommand = require("../models/SlashSubCommand");

function getCommandFile(interaction) {
    let slashCommand = SlashCommand.getCommandByName(interaction.commandName)
    if(!slashCommand) {
        let group = interaction.options.getSubcommandGroup(false);
        let subCommandName = interaction.options.getSubcommand(false);
        slashCommand = SlashSubCommand.getSubCommand(interaction.commandName,subCommandName, group);
    }
    return slashCommand.getFile();
}


module.exports = {
    name: "interactionCreate",
    async run(interaction, bot) {

        if(interaction.type === InteractionType.ApplicationCommand) {
            await getCommandFile(interaction).run(bot, interaction);
        }

        if(interaction.type === InteractionType.ApplicationCommandAutocomplete) {
            await getCommandFile(interaction).autoComplete(bot, interaction);
        }


    }
}
