const fs = require('fs')

module.exports = {
	name: 'time',
	description: 'Lấy thời gian hiện tại.',
	execute(message) {
		var vi_Time = new Date().toLocaleString("en-US", { hour: '2-digit', hour12: false, timeZone: "Asia/Ho_Chi_Minh" });
		vi_Time = new Date(vi_Time);
		var dateTime = vi_Time.toLocaleString();
		console.log(`Bây giờ là ${dateTime}`);
		message.channel.send(`Bây giờ là ${dateTime}`);
	},
};