const express = require('express');
require('./utils/db');

const app = express();

app.use(express.json());

app.use('/api', require('./routes'));

app.use((err, req, res, next) => {
	console.log(err);
	return res.status(500).json({
		msg: 'Error Occurred. Working To fix it',
		error: err,
	});
});

app.listen(8080, () => {
	console.log('Server Started On http://localhost:8080');
});
