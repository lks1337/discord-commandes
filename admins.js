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
    }
})
