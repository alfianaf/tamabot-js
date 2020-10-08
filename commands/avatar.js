const Discord = require('discord.js');
module.exports = {
    name: 'avatar',
    description: 'Show your discord avatar',
    cooldown: 8,
    execute(message) {
        if (!message.mentions.users.size) {
            const aaa = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${message.author.username}'s Avatar`)
            .setImage(`${message.author.displayAvatarURL({ format: "png", dynamic: true })}`);
            return message.channel.send(aaa);
        }

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
