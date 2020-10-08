module.exports = {
    name: 'checkroles',
    description: 'Check roles',
    cooldown: 8,
    execute(message) {
        if (message.member.roles.cache.some(role => role.name === 'Tama')) {
            return message.channel.send(`${message.member} has role Tama`);
        }
        message.channel.send(`e`);

    },
};
