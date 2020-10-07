const Discord = require('discord.js');
module.exports = {
    name: 'avatar',
    cooldown: 5,
    execute(message) {
        if (!message.mentions.users.size) {

            // return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
            // const user = message.author.displayAvatarURL({ format: "png", dynamic: true });

            const aaa = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${message.author.username}'s Avatar`)
                .setImage(`${message.author.displayAvatarURL({ format: "png", dynamic: true })}`)

            message.channel.send(aaa);
        }
        // const user = message.mentions.users.displayAvatarURL({ format: "png", dynamic: true });
        const avatarList = message.mentions.users.map(user => {
            return `${user.displayAvatarURL({ format: "png", dynamic: true })}`;
        });
        const taggedUser = message.mentions.users.first();

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${taggedUser.username}'s Avatar`)
            .setImage(`${avatarList[0]}`)

        message.channel.send(exampleEmbed);
    },
};
