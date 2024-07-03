const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', 
  database: 'todos'
});

connection.connect();

// Route để lấy dữ liệu từ bảng user
app.get('/todos', (req, res) => {
  connection.query('SELECT * FROM todo', (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post('/todos', (req, res) => {
  const { username, date, active } = req.body;
  const INSERT_TODO = `INSERT INTO todo (username, date, active) VALUES ('${username}', '${date}', ${active})`;
  
  connection.query(INSERT_TODO, (error, results) => {
    if (error) {
      console.error('Error inserting todo:', error);
      res.status(500).send('Error inserting todo');
      return;
    }
    console.log('Todo inserted:', results);
    res.status(200).send('Todo inserted successfully');
  });
});

app.delete('/todos/:id', (req, res) => {
  const idTodo = req.params.id;
  const DELETE_TODO = `DELETE FROM todo WHERE id = ${idTodo}`;

  connection.query(DELETE_TODO, (error, results) => {
    if (error) {
      console.error('Error deleting todo:', error);
      res.status(500).send('Error deleting todo');
      return;
    }
    console.log('Todo deleted:', results);
    res.status(200).send('Todo deleted successfully');
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});