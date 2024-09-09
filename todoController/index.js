const db = require("../database");

const getTodos = (req, res) => {
    try {
        db.query("SELECT * FROM todo", (error, result) => {
            if (error) {
                console.error("Something went wrong: " + error.stack);
                return;
            }
            res.json({ status: 200, message: "Success", data: result });
        });
    } catch (error) {
        console.log(error);
    }
};

const addTodo = (req, res) => {
    try {
        const { todo, isCompleted } = req.body;
        if (!todo || !todo.trim()) {
            throw "Todo is required";
        }
        const query = `INSERT INTO todo (todo, is_Completed) VALUES ("${todo}", ${isCompleted})`;
        db.query(query, (error, result) => {
            if (error) {
                console.error("Something went wrong: " + error.stack);
                return;
            }
            res.json({ status: 200, message: "Successfully added" });
        });
    } catch (error) {
        res.json({ status: 400, error });
    }
};

const getTodoById = (req, res) => {
    try {
        const { todoId } = req.params;
        if (!todoId) {
            throw "Todo Id is required";
        }
        const query = `SELECT * FROM todo WHERE id = ?`;
        db.query(query, [todoId], (error, result) => {
            if (error) {
                console.error("Something went wrong " + error.stack);
                return res.json({ status: 500, error: "Server Error" })
            }
            console.log(result);

            if (result.length === 0) {
                return res.json({ status: 404, error: "Todo not found" });
            }
            res.json({ status: 200, message: "Successfully fetched todo", data: result[0] });
        })

    } catch (error) {
        console.log(error)
    }
}

const editTodo = (req, res) => {
    try {
        const { todoId } = req.params;
        const { todo, isCompleted } = req.body;

        if (!todoId) {
            throw "Todo is required"
        }

        if (!todo || !todo.trim()) {
            throw "Something went wrong **"
        }

        const query = `SELECT * FROM todo WHERE id = ?`;

        db.query(query, [todoId], (error, result) => {
            if (error) {
                console.error("Something went wrong " + error.stack);
            }

            if (result.length === 0) {
                return res.json({ status: 404, error: "Todo not found" });
            }
            // res.json({ status: 200, message: "Sucess", data: result[0] })

            const updateEdit = `UPDATE todo SET todo = ?, is_completed = ? WHERE id = ?`;

            db.query(updateEdit, [todo, isCompleted, todoId], (err, data) => {
                if (err) {
                    console.log(err)
                }
                res.json({ status: 200, message: "Success" })
            })
        })
    } catch (error) {
        res.json({ status: 400, error })
    }
}

const delTodo = (req, res) => {
    try {
        const { todoId } = req.params;

        if (!todoId) {
            throw "Todo is required"
        }

        const query = `SELECT * FROM todo WHERE id = ?`;
        db.query(query, [todoId], (error, result) => {
            if (error) {
                console.error("Something went wrong " + error.stack);
            }

            if (result.length === 0) {
                return res.json({ status: 404, error: "Todo not found" });
            }

            const deleteTodo = `DELETE FROM todo WHERE id = ?`;
            db.query(deleteTodo, [todoId], (err, data) => {
                if (error) {
                    console.log("Something went wrong")
                }
                res.json({status: 200, mesaage: "Success"})
            })
    })

    } catch (error) {
        res.json({status: 400, error})
    }
}

module.exports = {
    getTodos, addTodo, getTodoById, editTodo, delTodo
}