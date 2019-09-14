module.exports = {
	name: 'stop',
	description: 'Dừng tất cả bài hát hiện tại và trong hàng chờ.',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) {
			return message.channel.send(`Danh sách phát hiện tại đang trống!`);
		}
		if (!message.member.voiceChannel) {
			message.channel.send('Bạn phải ở trong kênh thoại để dừng toàn bộ danh sách phát!');
		}
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
		return message.channel.send(`Đã dừng toàn bộ danh sách phát!`);
	},
};