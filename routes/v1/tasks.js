const express = require('express');
const router = express.Router();
const {
	getAllTasks,
	createTask,
	getTaskById,
	updateTaskById,
	deleteTaskById,
} = require('../../controllers/v1/tasksController');

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.patch('/:id', updateTaskById);
router.delete('/:id', deleteTaskById);

module.exports = router;
