const express = require('express')
const authMiddleWare=require("../../middlewares/auth")
const router = express.Router()
const ctrlWrapper=require("../../middlewares/ctrlWrapper")
const {tasks}=require("../../controllers/index")

router.get('/',authMiddleWare, ctrlWrapper(tasks.listTasks))

router.get('/:taskId', authMiddleWare,ctrlWrapper(tasks.getTaskById))

router.post('/', authMiddleWare,ctrlWrapper(tasks.addTask))

router.delete('/:taskId',authMiddleWare,ctrlWrapper(tasks.removeTask))

router.put('/:taskId',authMiddleWare, ctrlWrapper(tasks.updateTask))

router.patch('/:taskId/done',authMiddleWare, ctrlWrapper(tasks.updateDone))

module.exports = router
