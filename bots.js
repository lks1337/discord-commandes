client.on('message', message => {
    if(message.content === settings.prefix + 'bots') {
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
