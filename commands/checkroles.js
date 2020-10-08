
module.exports = {
    name: 'avatar',
    description: 'Show your discord avatar',
    cooldown: 8,
    execute(message) {
        if (message.author.roles.cache.some(role => role.name === 'Tama')) {
            return message.channel.send(`${member} has ${role.name}`);
        }

        message.channel.send('You don\'t have a role called Mod.');

    },
};
