module.exports = {
	name: 'purge',
	description: 'Xóa tin nhắn trong kênh.',
	async execute(message) {
		const args = message.content.split(' ');
		let deleteCount = 0;
		try {
			deleteCount = parseInt(args[1], 10);
		}catch(err) {
			return message.reply('Vui lòng chọn số tin nhắn để xóa. (max 100)')
		}
        

		if (!deleteCount || deleteCount < 2 || deleteCount > 100)
			return message.reply('Vui lòng chọn khoảng từ 2 đến 100 để xóa tin nhắn!');

		const fetched = await message.channel.fetchMessages({
			limit: deleteCount,
		});
		message.channel.bulkDelete(fetched)
			.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	},
};