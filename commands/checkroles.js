module.exports = {
    name: 'checkroles',
    description: 'Check roles',
    cooldown: 8,
    execute(message) {
        if (member.roles.cache.some(role => role.name === 'Tama')) {
            return message.channel.send(`${member} has role Tama`);
        }
        message.channel.send(`e`);

    },
};
