        // #CONFIGURATION
        const settings = {
            token: "", // le token du bot
            prefix: "", // le prefix du bot
            maincolor: "#303136"
        }
        // #MODULES

const Discord = require('discord.js'),
client = new Discord.Client({ fetchAllMembers: true })

client.login(settings.token).catch(err => console.log(err)); // connexion du bot

client.on('ready', () => {console.clear(), console.log(` ${client.user.username} (https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)})

client.on('message', async(message) => {
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
        }else if([settings.prefix + 'banlist', settings.prefix + 'bans'].includes(message.content)) {
            if(!message.member.permissions.has('ADMINISTRATOR')) return; // vérifie si l'utilisateur a les perms admins
            const fetchBans = message.guild.fetchBans();
            const bannedMembersSize = (await fetchBans)
            .map(u => u).length
            const bannedMembers = (await fetchBans)
            .map((member) => `\`${member.user.id}\` : **${member.user.username}**`)
            .join("\n") 
            let Embed = new Discord.MessageEmbed()
            .setTitle('Liste des bots')
            .setDescription(bannedMembers ? bannedMembers : `Personne n'est banni sur **${message.guild.name}** !`)
            .setColor(settings.maincolor)
            .setFooter(`Compteur: ${bannedMembersSize}`);
            message.channel.send(Embed); // envoie l'embed
            }else if(message.content.startsWith(settings.prefix + 'avatar')) {
                if(!message.member.permissions.has('ADMINISTRATOR')) return; // vérifie si l'utilisateur a les perms admins
                const args = message.content.slice(settings.prefix.length).trim().split(' ');
                let user = "";
                if(!args[1]) user = await client.users.fetch(message.author.id) // si il n'y a pas de mention
                if(args[1] && message.mentions.members.size > 0) user = await client.users.fetch(message.mentions.users.first().id) // si c'est une mention
                if(args[1] && message.mentions.members.size == 0 && client.users.fetch(args[1])) user = await client.users.fetch(args[1]).then(u => u) // si c'est un id      
                console.log(user)
                let Embed = new Discord.MessageEmbed()
                    .setColor(settings.maincolor)
                    .setTitle(user.username)
                    .setImage(user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
                    message.channel.send(Embed)
                }
})
