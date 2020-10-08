module.exports = {
    name: 'checkroles',
    description: 'Check roles',
    cooldown: 8,
    execute(message) {
        if (message.author.roles(role => role.name === 'Tama')) {
            try{ message.channel.send(`${member} has ${role.name}`);}
            catch (error) {
                console.error(error);
                message.reply('a');
            }
        }


    },
};
