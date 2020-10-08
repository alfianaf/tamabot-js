module.exports = {
    name: 'checkroles',
    description: 'Check user roles',
    execute(message) {
        if (message.guild.me.permissions.some(role => role.name === 'Tama')) {
            return message.channel.send(`${member} has ${role.name}`);
        }

        // if (member.hasPermission('KICK_MEMBERS', { checkAdmin: false, checkOwner: false })) {
        //     console.log('This member can kick without allowing admin to override');
        // }

        // message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    },
};

