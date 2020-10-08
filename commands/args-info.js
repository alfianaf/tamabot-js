module.exports = {
    args: true,
    name: 'args-info',
    description: 'Argument info',
	execute(message, args) {
        // if (!args.length) {
        //     return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        // }
        if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

        message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};