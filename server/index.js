const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

//MIDDLEWARE

app.use(cors());
app.use(express.json())

//ROUTES

//Create
app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

//Get all

app.get("/todos", async(req,res) => {
    try {
        const allTodos =  await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
        
    } catch (err) {
        console.error(err.message)
    }
})
//Get One todo
app.get("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const oneTodo =  await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(oneTodo.rows[0]);
        
    } catch (err) {
        console.error(err.message)
    }
})

//Update a todo

app.put("/todos/:id", async(req, res) => {
    try {

        const {id} = req.params;
        const {description} = req.body

        const updatedTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id])
        
        res.json("Todo has been updated")
    } catch (err) {
        console.error(err.message)
        
    }
});

//delete a todo

app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo has been deleted");
    } catch (err) {
        console.error(err.message)
        
    }
})

app.listen(2000, ()=>{
    console.log("Server is running on port 2000")
})