client.on('message', async(message) => {
if(message.content.startsWith(settings.prefix + 'avatar')) {
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
