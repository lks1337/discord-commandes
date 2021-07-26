client.on('message', async(message) => {
if([settings.prefix + 'banlist', settings.prefix + 'bans'].includes(message.content)) {
            if(!message.member.permissions.has('ADMINISTRATOR')) return; // vérifie si l'utilisateur a les perms admins
            const fetchBans = message.guild.fetchBans(); // fetch (cherche) les bans
            const bannedMembersSize = (await fetchBans)
            .map(u => u).length // .length car c'est un array et on cherche le nombre d'utilisateur dans l'array
            const bannedMembers = (await fetchBans)
            .map((member) => `\`${member.user.id}\` : **${member.user.username}**`)
            .join("\n") 
            let Embed = new Discord.MessageEmbed()
            .setTitle('Liste des bots')
            .setDescription(bannedMembers ? bannedMembers : `Personne n'est banni sur **${message.guild.name}** !`)
            .setColor(settings.maincolor)
            .setFooter(`Compteur: ${bannedMembersSize}`);
            message.channel.send(Embed); // envoie l'embed
            }
  })
