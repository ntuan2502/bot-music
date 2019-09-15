module.exports = {
	name: 'avatar',
	description: 'Xem avatar.',
	execute(message) {
		message.reply(message.author.avatarURL);
	},
};