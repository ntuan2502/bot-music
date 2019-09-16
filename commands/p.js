const {
	Util
} = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'p',
	description: 'Mở bài hát.',
	async execute(message) {
		const args = message.content.split(' ');
		const queue = message.client.queue;
		const serverQueue = message.client.queue.get(message.guild.id);

		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send('Bạn phải ở trong một kênh thoại để mở nhạc!');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
			return message.channel.send('Vui lòng cấp quyền để mở và phát nhạc!');
		}

		const songInfo = await ytdl.getInfo(args[1], { quality: 'highestaudio' });
		const song = {
			title: songInfo.title,
			url: songInfo.video_url,
		};

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

			queueContruct.songs.push(song);

			try {
				var connection = await voiceChannel.join();
				queueContruct.connection = connection;
				this.play(message, queueContruct.songs[0]);
				console.log(`Đang phát "${song.title}"!`);
				message.channel.send(`Đang phát "${song.title}"!`);
			} catch (err) {
				console.log(err);
				queue.delete(message.guild.id);
				return message.channel.send(err);
			}
		} else {
			serverQueue.songs.push(song);
			console.log(`"${song.title}" đã được thêm vào hàng chờ!`);
			return message.channel.send(`"${song.title}" đã được thêm vào hàng chờ!`);
		}
	},

	play(message, song) {
		const queue = message.client.queue;
		const guild = message.guild;
		const serverQueue = queue.get(message.guild.id);

		if (!song) {
			// serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
		}

		const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
			.on('end', () => {
				console.log('Kết thúc!');
				serverQueue.songs.shift();
				this.play(message, serverQueue.songs[0]);
				if (serverQueue.songs[0]) {
					message.channel.send(`Đang phát "${serverQueue.songs[0].title}!"`);
					console.log(`Đang phát "${serverQueue.songs[0].title}!"`);
				}
				else {
					message.channel.send(`Danh sách phát hiện tại đang trống!`);
					console.log(`Danh sách phát hiện tại đang trống!`);
				}
			})
			.on('error', error => {
				console.error(error);
			});
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	}
};