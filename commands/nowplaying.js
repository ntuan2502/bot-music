module.exports = {
	name: 'nowplaying',
	description: 'Bài hát hiện tại đang mở.',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue){
			console.log('Hiện tại đang không phát gì!');
			return message.channel.send('Hiện tại đang không phát gì!');
		}
		console.log(`Đang phát hiện tại: "${serverQueue.songs[0].title}"`);
		return message.channel.send(`Đang phát hiện tại: "${serverQueue.songs[0].title}"`);
	},
};