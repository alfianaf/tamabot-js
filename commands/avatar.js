const Discord = require('discord.js');
module.exports = {
	name: 'avatar',
	execute(message, args) {

        const taggedUser = message.mentions.users.first();


        if (!message.mentions.users.size) {
        
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
        // const user = message.mentions.users.displayAvatarURL({ format: "png", dynamic: true });
        const avatarList = message.mentions.users.map(user => {
            return `${user.displayAvatarURL({ format: "png", dynamic: true })}`;
        });
        
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${taggedUser.username}'s Avatar`)
            .setImage(`${avatarList[0]}`)
        
        message.channel.send(exampleEmbed);
	},
};
