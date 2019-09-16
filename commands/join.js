const {
	Util
} = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'join',
	description: 'Vào phòng.',
	async execute(message) {
		const queue = message.client.queue;
		const serverQueue = message.client.queue.get(message.guild.id);

		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) {
			return message.channel.send('Bạn phải ở trong một kênh thoại để mở nhạc!');
		}
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
			return message.channel.send('Vui lòng cấp quyền để mở và phát nhạc!');
		}

		if (!serverQueue) {
			const queueContruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true,
			};

			queue.set(message.guild.id, queueContruct);

			try {
				var connection = await voiceChannel.join();
				queueContruct.connection = connection;
				return message.channel.send(`Đã vào phòng "${queueContruct.voiceChannel}"`);
			} catch (err) {
				console.log(err);
				queue.delete(message.guild.id);
				return message.channel.send(err);
			}
		}
	},
};