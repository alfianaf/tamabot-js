module.exports = {
    name: 'checkroles',
    description: 'Check roles',
    cooldown: 8,
    execute(message) {
        if (message.member.roles.cache.some(role => role.name === 'Tama')) {
            try{ message.channel.send(`${member} has ${role.name}`);}
            catch (error) {
                console.error(error);
                message.reply('a');
            }
        }
        message.channel.send(`e`);

    },
};
