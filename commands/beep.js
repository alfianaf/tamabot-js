module.exports = {
	name: 'beep',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send('Boop.');
	},
};