
const express = require('express');
const mysql = require('mysql');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'manager',
  database: 'DACPune',
});


const app = express();


app.use(express.json());

// GET 
app.get('/books', (req, res) => {
  //const { author } = req.query;
  const query = `SELECT * FROM Book_Tb WHERE author = '${req.body.author}'`;

  pool.query(query, (error, results) => {
    if(error==null)
        {
            var data = JSON.stringify(results);
            res.setHeader("Content-Type","application/json");
            res.write(data);
        }
        else
        {
            console.log(error);
            res.setHeader("Content-Type","application/json");
            res.write(error);
        }
        res.end();
  });
});

// POST 
app.post('/books', (req, res) => {
  const {id, b_name, author, book_type, price, publishedDate, language } = req.body;
  const query = `INSERT INTO Book_Tb (id, b_name, author, book_type, price, publishedDate, language) 
  VALUES (?, ?, ?, ?, ?, ?, ?)`;

  pool.query(
    query,
    [id, b_name, author, book_type, price, publishedDate, language],
    (error, results) => {
        if(error==null)
        {
            var data = JSON.stringify(results);
            res.setHeader("Content-Type","application/json");
            res.write(data);
        }
        else
        {
            console.log(JSON.stringify(error));
            res.setHeader("Content-Type","application/json");
            res.write(JSON.stringify(error));
        }
        res.end();
    }
  );
});

// PUT 
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { price, language } = req.body;
  const query = `UPDATE Book_Tb SET price = ?, language = ? WHERE id = ?`;

  pool.query(query, [price, language, id], (error, results) => {
    if(error==null)
        {
            var data = JSON.stringify(results);
            res.setHeader("Content-Type","application/json");
            res.write(data);
        }
        else
        {
            console.log(JSON.stringify(error));
            res.setHeader("Content-Type","application/json");
            res.write(JSON.stringify(error));
        }
        res.end();
  });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});


