const {getTicketsCategoryByID} = require("../dataAPI/ticketCategoriesDAO");
const {insertTicket, getTickets, removeTicket} = require("../dataAPI/ticketsDAO");
const {createChannel, canCreateChannelInGuild, canCreateChannelInCategory} = require("./serverManager");
const {ChannelType} = require("discord-api-types/v10");
const {MAX_CHANNELS_IN_CATEGORY_REACHED, MAX_CHANNELS_IN_GUILD_REACHED, TICKET_CREATED, MEMBER_ALREADY_HAVE_TICKET} = require("../config/lang.json");
const {PermissionsBitField} = require("discord.js");


async function createTicket(guild, member, category) {
    let categoryData = await getTicketsCategoryByID(guild.id, category);
    if (!canCreateChannelInGuild(guild)) {
        return MAX_CHANNELS_IN_GUILD_REACHED;
    } else if (!canCreateChannelInCategory(guild, category)) {
        return MAX_CHANNELS_IN_CATEGORY_REACHED;
    } else if (!await memberCanCreateTicket(guild.id, member.id)) {
        return MEMBER_ALREADY_HAVE_TICKET;
    }
    let permissions = getNewTicketPermissions(guild, member, categoryData.roles)
    let channel = await createChannel(guild, `t-${member.id}`, ChannelType.GuildText, permissions, category);
    await insertTicket(guild.id, channel.id, member.id);
    return `${TICKET_CREATED} <#${channel.id}>`;
}

function deleteTicket(guildID, channelID) {
    removeTicket(guildID, channelID)
}

function getNewTicketPermissions(guild, member, roles) {
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
    for(let role of roles) {
        permissions.push({
            id: role,
            allow: [PermissionsBitField.Flags.ViewChannel]
        })
    }
    return permissions;
}

async function memberCanCreateTicket(guildID, memberID) {
    let tickets = await getTickets()
    for (let ticketID in tickets[guildID]) {
        if (tickets[guildID][ticketID].user === memberID) {
            return false;
        }
    }
    return true;
}



module.exports = {
    createTicket,
    deleteTicket
}