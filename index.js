// const fs = require('fs');
// const Discord = require('discord.js');
// const { prefix, token } = require('./config.json');
// const client = new Discord.Client();
// client.commands = new Discord.Collection();
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// //voice channel
// const { OpusEncoder } = require('@discordjs/opus');

// // // Create the encoder.
// // // Specify 48kHz sampling rate and 2 channel size.
// const encoder = new OpusEncoder(48000, 2);

// // // Encode and decode.
// const encoded = encoder.encode(buffer);
// const decoded = encoder.decode(encoded);

// // var pathToFfmpeg = require('ffmpeg-static');


// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);

//     // set a new item in the Collection
//     // with the key as the command name and the value as the exported module
//     client.commands.set(command.name, command);
// }
// const cooldowns = new Discord.Collection();
 
// client.once('ready', () => {
//     console.log('Ready!');
// });
// client.on('message', async message => {
// 	// Join the same voice channel of the author of the message
// 	if (message.member.voice.channel) {
//         const connection = await message.member.voice.channel.join();
//         const dispatcher = connection.play('https://cdn.discordapp.com/attachments/762528512225574913/763723274164895744/SweetSummerRainbowNostalgic_Treasure.mp3');

//         dispatcher.on('start', () => {
//             console.log('audio.mp3 is now playing!');
//         });

//         dispatcher.on('finish', () => {
//             console.log('audio.mp3 has finished playing!');
//         });

//         // Always remember to handle errors appropriately!
//         dispatcher.on('error', console.error);
// 	}
// });
// client.on('message', message => {
//     if (!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).trim().split(/ +/);
//     const commandName = args.shift().toLowerCase();

//     if (!client.commands.has(commandName)) return;

//     const command = client.commands.get(commandName);
//     if (command.guildOnly && message.channel.type === 'dm') {
//         return message.reply('I can\'t execute that command inside DMs!');
//     }
//     if (command.args && !args.length) {
//         // return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
//         let reply = `You didn't provide any arguments, ${message.author}!`;

//         if (command.usage) {
//             reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
//         }

//         return message.channel.send(reply);
//     }

//     if (!cooldowns.has(command.name)) {
//         cooldowns.set(command.name, new Discord.Collection());
//     }

//     const now = Date.now();
//     const timestamps = cooldowns.get(command.name);
//     const cooldownAmount = (command.cooldown || 5) * 1000;

//     if (timestamps.has(message.author.id)) {
//         const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

//         if (now < expirationTime) {
//             const timeLeft = (expirationTime - now) / 1000;
            
//             // message.author.bot.delete({ timeout: 2000 });
//             return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`).then(msg=>{msg.delete({timeout:3000})});
//         }
//     }
    
//     // prune.prune(prune,1)
//     timestamps.set(message.author.id, now);
//     setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
//     try {
//         command.execute(message, args);
//     } catch (error) {
//         console.error(error);
//         message.reply('there was an error trying to execute that command!');
//     }
// });

// client.login(process.env.BOT_TOKEN);


const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");

const client = new Discord.Client();

const queue = new Map();

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else {
    message.channel.send("You need to enter a valid command!");
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
    
  if (!serverQueue)
    return message.channel.send("No Song!");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

client.login(process.env.BOT_TOKEN);