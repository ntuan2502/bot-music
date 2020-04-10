const {
	Util
} = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'pause',
	description: 'Tạm dừng.',
	async execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		const voiceChannel = message.member.voiceChannel;

		if (!voiceChannel) {
			return message.channel.send('Bạn phải ở trong một kênh thoại để mở nhạc!');
		}

		if (!serverQueue) {
			return message.channel.send(`Xin lỗi. Đang không có bài hát nào được phát hiện tại.`);
		}
		if(voiceChannel !== message.guild.me.voiceChannel){
			return message.channel.send(`Xin lỗi. Bạn đang không ở cùng phòng với BOT.`);
		}
		// if(serverQueue.dispatcher.paused()){
		// 	return message.channel.send(`Bài hát đã được dừng trước đó.`);
		// }
		console.log(serverQueue.playing);
		message.channel.send(`Đã dừng bài hát ${serverQueue.songs[0].title}!`);
		return serverQueue.playing = false;
	},
};