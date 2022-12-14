const discordTranscripts = require('discord-html-transcripts');
const {insertTicket, getTickets, deleteTicket, insertGuestToTicket, deleteGuestFromTicket} = require("../dataAPI/ticketsDAO");
const {createChannel, canCreateChannelInGuild, canCreateChannelInCategory,
    getSimpleEmbed, memberIsAdmin, getTicketLogEmbed, getAddedMemberEmbed, getRemovedMemberEmbed,
    getSimpleEmbedOnlyDescription
} = require("./serverManager");
const {ChannelType} = require("discord-api-types/v10");
const {MAX_CHANNELS_IN_CATEGORY_REACHED, MAX_CHANNELS_IN_GUILD_REACHED,
    TICKET_CREATED, MEMBER_ALREADY_HAVE_TICKET, TICKET_CLOSED,
    THIS_IS_NOT_A_TICKET, INSUFFICIENT_PERMISSIONS, GUEST_IS_ALREADY_IN_THE_TICKET,
    GUEST_ISN_T_IN_THE_TICKET
} = require("../config/lang.json");
const {PermissionsBitField} = require("discord.js");
const {getCategoryByID} = require("./ticketCategoriesManager");


async function createTicket(guild, member, categoryID) {
    let category = await getCategoryByID(guild.id, categoryID);
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

async function addMemberToTicket(guild, channel, member, user) {
    let ticket = await getTicketByID(guild.id, channel.id);
    if(!ticket) {
        return getSimpleEmbedOnlyDescription(THIS_IS_NOT_A_TICKET);
    } else if(ticket.guests.find((guestID) => guestID = user.id)) {
        return getSimpleEmbedOnlyDescription(GUEST_IS_ALREADY_IN_THE_TICKET);
    } else if(ticket.assignedID !== member.id && !memberIsAdmin(member)) {
        return getSimpleEmbedOnlyDescription(INSUFFICIENT_PERMISSIONS);
    }
    await insertGuestToTicket(guild.id, channel.id, user.id);
    await channel.permissionOverwrites.create(user.id, {ViewChannel: true});
    return getAddedMemberEmbed(user.id, member.id);
}

async function removeMemberFromTicket(guild, channel, member, user) {
    let ticket = await getTicketByID(guild.id, channel.id);
    if(!ticket) {
        return getSimpleEmbedOnlyDescription(THIS_IS_NOT_A_TICKET);
    } else if(!ticket.guests.find((guestID) => guestID = user.id)) {
        return getSimpleEmbedOnlyDescription(GUEST_ISN_T_IN_THE_TICKET);
    } else if(ticket.assignedID !== member.id && !memberIsAdmin(member)) {
        return getSimpleEmbedOnlyDescription(INSUFFICIENT_PERMISSIONS);
    }
    await deleteGuestFromTicket(guild.id, channel.id, user.id);
    channel.permissionOverwrites.delete(user.id);
    return getRemovedMemberEmbed(user.id, member.id);
}



async function closeTicket(guild, channel, member) {
    let ticket = await getTicketByID(guild.id, channel.id);
    if(!ticket) {
        return THIS_IS_NOT_A_TICKET;
    }
    if(ticket.user !== member.id && ticket.assignedID !== member.id && !memberIsAdmin(member)) {
        return INSUFFICIENT_PERMISSIONS;
    }
    let category = await getCategoryByID(guild.id, ticket.categoryID);
    if(category && category.transcriptionChannel !== 'false') {
        await sendTicketTranscription(guild, channel, category, member, ticket);
    }
    channel.delete();
    return TICKET_CLOSED;
}

function removeTicket(guildID, channelID) {
    deleteTicket(guildID, channelID)
}


async function sendTicketTranscription(guild, channel, category, member, ticket) {
    let transcriptionChannel = guild.channels.cache.get(category.transcriptionChannel);
    let transcriptionFile = await discordTranscripts.createTranscript(channel, {
        limit: -1, returnType: 'attachment',
        filename: `${channel.name}.html`, saveImages: true,
        poweredBy: false
    });
    transcriptionChannel.send({embeds: [getTicketLogEmbed(category.name, ticket.user , member.id)]}).catch();
    transcriptionChannel.send({files: [transcriptionFile]}).catch();
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

async function getTicketByID(guildID, channelID) {
    let tickets = await getTickets(guildID);
    return tickets.find((ticket) => ticket.id = channelID);
}


module.exports = {
    createTicket,
    addMemberToTicket,
    removeMemberFromTicket,
    removeTicket,
    closeTicket
}