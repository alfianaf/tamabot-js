const Discord = require('discord.js');
const SpotifyWebApi = require('spotify-web-api-node');

const client = new Discord.Client();

const token = 'YOUR_BOT_TOKEN';

const spotifyClientId = 'YOUR_SPOTIFY_CLIENT_ID';
const spotifyClientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET';
const spotifyRedirectUri = 'YOUR_SPOTIFY_REDIRECT_URI';

const prefix = '!';

const spotifyApi = new SpotifyWebApi({
  clientId: spotifyClientId,
  clientSecret: spotifyClientSecret,
  redirectUri: spotifyRedirectUri,
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        'You need to be in a voice channel to play music!'
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send(
        'I need the permissions to join and speak in your voice channel!'
      );
    }

    try {
      var connection = await voiceChannel.join();
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      return message.channel.send(`I could not join the voice channel: ${error}`);
    }

    const track = args.join(' ');
    try {
      const searchResults = await spotifyApi.searchTracks(track);
      if (searchResults.body.tracks.items.length === 0)
        return message.channel.send(`No tracks were found for "${track}"`);
      const trackUri = searchResults.body.tracks.items[0].uri;
      const dispatcher = connection
        .play(await spotifyApi.getTrack(trackUri).then(track => track.body.preview_url))
        .on('finish', () => {
          voiceChannel.leave();
        })
        .on('error', error => {
          console.error(error);
        });
      dispatcher.setVolumeLogarithmic(5 / 5);
    } catch (error) {
      console.error(error);
      return message.channel.send(error.message);
    }
  } else if (command === 'stop') {
    if (!message.member.voice.channel)
      return message.channel.send(
        'You have to be in a voice channel to stop the music!'
);
message.member.voice.channel.leave();
}
});

client.login(token);
/*

To use this code, you will need to install the Discord.js and Spotify API libraries, and replace `YOUR_BOT_TOKEN`, `YOUR_SPOTIFY_CLIENT_ID`, `YOUR_SPOTIFY_CLIENT_SECRET`, and `YOUR_SPOTIFY_REDIRECT_URI` with your bot's token and your Spotify API credentials. You can also customize the `prefix` variable to set the command prefix that the bot will use.

With this code, you can use the `!play` command to search for a track on Spotify and play the preview in a voice channel, and the `!stop` command to stop the music and disconnect the bot from the voice channel. You can extend this code to add more features and customize it to suit your needs. For more information, see the Discord.js and Spotify API documentation.

*/
