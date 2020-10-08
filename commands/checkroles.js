module.exports = {
    name: 'checkroles',
    description: 'Check roles',
    cooldown: 8,
    execute(message) {
        if (message.member.roles.cache.some(role => role.name === 'e')) {
            message.channel.send(`${message.member} has ${role.name}`);
        }
        message.channel.send(`e`);

    },
};
