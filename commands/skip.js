module.exports = {
	name: 'skip',
	description: 'Chuyển bài.',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voiceChannel) {
			return message.channel.send('Bạn phải ở trong kênh thoại để chuyển bài!');
		}
		if (!serverQueue) {
			return message.channel.send('Danh sách phát hiện tại đang trống!');
		}
		serverQueue.connection.dispatcher.end();
	},
};