module.exports = {
	name: 'user-info',
    description: 'Show information about your discord',

	execute(message, args) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);

	},
};