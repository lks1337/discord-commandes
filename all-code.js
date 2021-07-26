        // #CONFIGURATION
        const settings = {
            token: "", // le token du bot
            prefix: ".", // le prefix du bot
            maincolor: "#303136"
        }
        // #MODULES

const Discord = require('discord.js'),
client = new Discord.Client({ fetchAllMembers: true })

client.login(settings.token).catch(err => console.log(err)); // connexion du bot

client.on('ready', () => {console.clear(), console.log(` ${client.user.username} (https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)})

client.on('message', message => {
    if(message.content === settings.prefix + 'admins') {
    if(!message.member.permissions.has('ADMINISTRATOR')) return; // vérifie si l'utilisateur a les perms admins
    let admins = message.guild.members.cache.filter(m => m.permissions.has('ADMINISTRATOR')) // fait une liste des membres admins
    let Embed = new Discord.MessageEmbed()
    .setTitle('Liste des admins')
    .setDescription(admins.map(m => `\`${m.id}\` : ${m}`))
    .setColor(settings.maincolor)
    .setFooter(`Compteur: ${admins.size}`);
    message.channel.send(Embed); // envoie l'embed
    }else if(message.content === settings.prefix + 'bots') {
        if(!message.member.permissions.has('ADMINISTRATOR')) return; // vérifie si l'utilisateur a les perms admins
        let bots = message.guild.members.cache.filter(m => m.user.bot) // fait une liste des membres bots
        let Embed = new Discord.MessageEmbed()
        .setTitle('Liste des bots')
        .setDescription(bots.map(m => `\`${m.id}\` : ${m}`))
        .setColor(settings.maincolor)
        .setFooter(`Compteur: ${bots.size}`);
        message.channel.send(Embed); // envoie l'embed
        }
})
