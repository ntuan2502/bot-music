const fs = require('fs')

module.exports = {
	name: 'time',
	description: 'Lấy thời gian hiện tại.',
	execute(message) {
		function calcTime(offset) {
			d = new Date();
			utc = d.getTime() + (d.getTimezoneOffset() * 60000);
			nd = new Date(utc + (3600000*offset));
			return nd;
		}
		function addZero(i) {
			if (i < 10) {
			  i = "0" + i;
			}
			return i;
		  }
		var today = calcTime('+7');
		var date = addZero(today.getDate()) + '/' + addZero((today.getMonth() + 1)) + '/' + today.getFullYear();
		var time = addZero(today.getHours()) + ":" + addZero(today.getMinutes()) + ":" + today.getSeconds();
		var dateTime = time + ' ' + date;
		console.log(`Bây giờ là ${dateTime}`);
		message.channel.send(`Bây giờ là ${dateTime}`);
	},
};