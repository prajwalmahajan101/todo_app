const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/todo_app_dev')
	.then(() => {
		console.log('Connected to DB');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = mongoose;
