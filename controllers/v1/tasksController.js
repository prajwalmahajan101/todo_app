const Task = require('../../models/Task');

module.exports.createTask = async (req, res, next) => {
	try {
		const {title, description, status} = req.body;
		const task = new Task({
			title,
			description,
			status,
		});

		await task.save();
		return res.status(201).json({
			msg: 'Task Successfully Created',
			data: {
				task: {
					id: task.id,
					title: task.title,
					description: task.description,
					status: task.status,
					createdAt: task.createdAt,
					updatedAt: task.updatedAt,
				},
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports.getAllTasks = async (req, res, next) => {
	try {
		const query = req.query;
		//TODO: Validation
		const tasks = await Task.find({...query});
		return res.status(200).json({
			msg: 'Fetched All Tasks',
			data: {
				tasks,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports.getTaskById = async (req, res, next) => {
	try {
		const {id} = req.params;
		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).json({
				msg: `Task with id ${id} not Found`,
			});
		}
		return res.status(200).json({
			msg: 'Task Fetched',
			data: {
				task,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports.updateTaskById = async (req, res, next) => {
	try {
		const {id} = req.params;
		const {title, description, status} = req.body;
		const updatableData = {};
		if (title) updatableData.title = title;
		if (description) updatableData.description = description;
		if (status) updatableData.status = status;

		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).json({
				msg: `Task with id ${id} not Found`,
			});
		}

		const updatedTask = await Task.findByIdAndUpdate(id, updatableData, {
			new: true,
		});

		return res.status(200).json({
			msg: 'Task Updated',
			data: {
				updatedTask,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports.deleteTaskById = async (req, res, next) => {
	try {
		const {id} = req.params;
		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).json({
				msg: `Task with id ${id} not Found`,
			});
		}
		await Task.findByIdAndDelete(id);
		return res.status(200).json({
			msg: 'Task Deleted Successfully',
			data: {
				task,
			},
		});
	} catch (err) {
		next(err);
	}
};
