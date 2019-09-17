const fs = require('fs')

module.exports = {
	name: 'mui',
	description: 'Mụi.',
	execute(message) {
		message.channel.send('Xíu Mụi xinh đẹp!');
	},
};