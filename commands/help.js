const fs = require('fs')

module.exports = {
	name: 'help',
	description: 'Hiển thị danh sách các lệnh.',
	execute(message) {
		let str = '';
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		str += `Tên lệnh - Mô tả \n`
		for (const file of commandFiles) {
			const command = require(`./${file}`);
			str += `!${command.name} - ${command.description} \n`;
		}

		message.channel.send(str);
	},
};