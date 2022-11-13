const {insertTicket, getTickets, deleteTicket} = require("../dataAPI/ticketsDAO");
const {createChannel, canCreateChannelInGuild, canCreateChannelInCategory, getSimpleEmbed} = require("./serverManager");
const {ChannelType} = require("discord-api-types/v10");
const {MAX_CHANNELS_IN_CATEGORY_REACHED, MAX_CHANNELS_IN_GUILD_REACHED, TICKET_CREATED, MEMBER_ALREADY_HAVE_TICKET} = require("../config/lang.json");
const {PermissionsBitField} = require("discord.js");


async function createTicket(guild, member, category) {
    if (!canCreateChannelInGuild(guild)) {
        return MAX_CHANNELS_IN_GUILD_REACHED;
    } else if (!canCreateChannelInCategory(guild, category.id)) {
        return MAX_CHANNELS_IN_CATEGORY_REACHED;
    } else if (!await memberCanCreateTicket(guild.id, member.id)) {
        return MEMBER_ALREADY_HAVE_TICKET;
    }
    let permissions = await getNewTicketPermissions(guild, member, category.roles)
    let embed = getSimpleEmbed(category.name, category.description);
    let channel = await createChannel(guild, `t-${member.id}`, ChannelType.GuildText, permissions, category.id);
    channel.send({embeds: [embed]}).catch();
    await insertTicket(guild.id, channel.id, member.id, category.id);
    return `${TICKET_CREATED} <#${channel.id}>`;
}

function removeTicket(guildID, channelID) {
    deleteTicket(guildID, channelID)
}

async function getNewTicketPermissions(guild, member, roles) {
    let permissions = [
        {
            id: guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
            id: member.id,
            allow: [PermissionsBitField.Flags.ViewChannel]
        }
    ];
    for (let role of roles) {
        permissions.push({
            id: role,
            allow: [PermissionsBitField.Flags.ViewChannel]
        })
    }
    return permissions;
}

async function memberCanCreateTicket(guildID, memberID) {
    let tickets = await getTickets(guildID);
    return !tickets.find((ticket) => ticket.user = memberID);
}



module.exports = {
    createTicket,
    removeTicket
}