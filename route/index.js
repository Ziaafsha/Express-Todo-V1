const express = require("express");
const router = express.Router();
const todoController = require("../todoController")

router.get("/todos", todoController.getTodos)
router.post("/todos", todoController.addTodo)
router.get("/todos/:todoId", todoController.getTodoById)
router.patch("/todos/:todoId", todoController.editTodo)
router.delete("/todos/:todoId", todoController.delTodo)

module.exports = router;