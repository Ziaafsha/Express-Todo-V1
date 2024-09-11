const db = require("../database");

const getTodos = async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM todo", (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
        res.json({ status: 200, message: "Success", data: result })
    } catch (error) {
        console.error("Something went wrong: " + error.stack);
        res.json({ status: 400 })
    }
};

const addTodo = async (req, res) => {
    try {
        const { todo, isCompleted } = req.body;

        if (!todo || !todo.trim()) {
            throw "Todo is required";
        }

        const query = `INSERT INTO todo (todo, is_Completed) VALUES ("${todo}", ${isCompleted})`;

        const result = await new Promise((resolve, reject) => {
            db.query(query, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            })
        })
        res.json({ status: 200, message: "Successfully added", data: result });

    } catch (error) {
        console.error("Something went wrong: " + error.stack);
        res.json({ status: 400, error });
    }
};

const getTodoById = async (req, res) => {
    try {
        const { todoId } = req.params;

        if (!todoId) {
            throw "Todo Id is required";
        }

        const query = `SELECT * FROM todo WHERE id = ?`;

        const result = await new Promise((resolve, reject) => {
            db.query(query, [todoId], (error, result) => {
                if (error) {
                    return reject(error)
                }
                return resolve(result);
            })
        })

        if (result.length === 0) {
            return res.json({ status: 404, error: "Todo not found" });
        }

        res.json({ status: 200, message: "Successfully fetched todo", data: result[0] });

    } catch (error) {
        res.json({ status: 400 })
    }
}

const editTodo = async (req, res) => {
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
        const todoResult = await new Promise((resolve, reject) => {
            db.query(query, [todoId], (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            })
        })
        if (todoResult.length === 0) {
            return res.json({ status: 404, error: "Todo not found" });
        }


        const updateEdit = `UPDATE todo SET todo = ?, is_completed = ? WHERE id = ?`;

        const result = await new Promise((resolve, reject) => {
            db.query(updateEdit, [todo, isCompleted, todoId], (err, data) => {
                if (err) {
                    return reject(err)
                }
                return resolve(data)
            })
        })

        res.json({ status: 200, message: "Success" })
    } catch (error) {
        console.error("Something went wrong " + error.stack);
        res.json({ status: 400, error })
    }
}

const delTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        
        if (!todoId) {
            throw "Todo is required"
        }
       
        const query = `SELECT * FROM todo WHERE id = ?`;

        const result = await new Promise((resolve, reject) => {
            db.query(query, [todoId], (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result)
            })
           
        })
        

        if (result.length === 0) {
            return res.json({ status: 404, error: "Todo not found" });
        }
        
        const deleteTodo = `DELETE FROM todo WHERE id = ?`;

        const result1 = await new Promise((resolve, reject) => {
            db.query(deleteTodo, [todoId], (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data)
            })

        })

        res.json({ status: 200, mesaage: "Success" })

    } catch (error) {
        console.error("Something went wrong " + error.stack);
        res.json({ status: 400, error })
    }
}

module.exports = {
    getTodos, addTodo, getTodoById, editTodo, delTodo
}