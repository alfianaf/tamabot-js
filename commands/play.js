module.exports = {
    name: 'play',
    description: 'Check roles',
    cooldown: 8,
    execute(message) {

        // Create a dispatcher
        const dispatcher = connection.play('https://cdn.discordapp.com/attachments/762528512225574913/763723274164895744/SweetSummerRainbowNostalgic_Treasure.mp3');

        dispatcher.on('start', () => {
            console.log('audio.mp3 is now playing!');
        });

        dispatcher.on('finish', () => {
            console.log('audio.mp3 has finished playing!');
        });

        // Always remember to handle errors appropriately!
        dispatcher.on('error', console.error);
    },
};
