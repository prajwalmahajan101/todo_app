module.exports.healthController = (req, res, next) => {
	return res.status(200).json({
		msg: 'Api is Working Fine',
	});
};
