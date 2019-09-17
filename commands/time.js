const fs = require('fs')

module.exports = {
	name: 'time',
	description: 'Lấy thời gian hiện tại.',
	execute(message) {
		var today = new Date().toLocaleString("en-US", {hour: '2-digit', timeZone: "Asia/Ho_Chi_Minh"});
		totay = new Date(today);
		var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = time + ' ' + date;
		console.log(`Bây giờ là ${dateTime}`);
		message.channel.send(`Bây giờ là ${dateTime}`);
	},
};