const express = require('express');
const router = express.Router();

const wrapAsync = require('../middleware/wrap-middleware');
const authMiddleware = require('../middleware/auth-middleware');

const TaskService = require('../../domain/services/task-service');
const { RequestTaskDTO, ResponseTaskDTO } = require('../dtos/task-dto')


router.use(authMiddleware);

router.get('/', wrapAsync(async (req, res) => {
	const tasks = await TaskService.getTasksByUserId(req.user.id);
	const responseDtos = tasks.map(task => new ResponseTaskDTO(task));

	res.status(200).json({ isSuccess: true, tasks: responseDtos });
}));

router.get('/:id', wrapAsync(async (req, res) => {
	const task = await TaskService.getTaskById(req.params.id);
	const responseDto = new ResponseTaskDTO(task);

	res.status(200).json({ isSuccess: true, task: responseDto });
}));

router.post('/', wrapAsync(async (req, res) => {
	const taskDto = new RequestTaskDTO(req.body);
	if (taskDto.isSuccess === false) {
		return res.status(400).json({ isSuccess: false, message: taskDto.errorMessage });
	}

	const task = await TaskService.createTask(taskDto, req.user.id);
	const responseDto = new ResponseTaskDTO(task);
	
	res.status(201).json({ isSuccess: true, task: responseDto });
}));

router.put('/:id', wrapAsync(async (req, res) => {
		const taskDto = new RequestTaskDTO(req.body);
		const updatedTask = await TaskService.updateTask(req.params.id, taskDto, req.user.id);
		
		const responseDto = new ResponseTaskDTO(updatedTask);
		res.status(200).json({ isSuccess: true, task: responseDto });
}));

router.delete('/:id', wrapAsync(async (req, res) => {
		await TaskService.deleteTask(req.params.id, req.user.id);
		res.status(204).send();
}));

module.exports = router;