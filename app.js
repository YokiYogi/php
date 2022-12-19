const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
  
app.use(bodyParser.json());
   

const conn = mysql.createConnection({
    host: '192.168.60.253',
    user: 'root', /* MySQL User */
    password: 'rootpass', /* MySQL Password */
    database: 'crud_new' /* MySQL Database */
});
   
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected with App...');
});
   
/**
 * Get All Items
 *
 * @return response()
 */
app.get('/api/users',(req, res) => {
  let sqlQuery = "SELECT * FROM users";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Get Single Item
 *
 * @return response()
 */
app.get('/api/users/:id',(req, res) => {
  let sqlQuery = "SELECT * FROM users WHERE uid=" + req.params.id;
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/users',(req, res) => {
  let data = {username: req.body.username, password: req.body.password, status:req.body.active};
  
  let sqlQuery = "INSERT INTO users SET ?";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    console.log(err);
    console.log(results);
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Update Item
 *
 * @return response()
 */
app.put('/api/users',(req, res) => {
    console.log(req.body);
  let sqlQuery = "UPDATE users SET username='"+req.body. username+"', password='"+req.body.password+"' WHERE uid="+req.body.uid;
  
  let query = conn.query(sqlQuery, (err, results) => {
    console.log(err);
    console.log(results);
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/users',(req, res) => {
    console.log(req.body);
  let sqlQuery = "DELETE FROM users WHERE uid="+req.body.uid+"";
    
  let query = conn.query(sqlQuery, (err, results) => {
    console.log(err);
    console.log(results);
    if(err) throw err;
      res.send(apiResponse(results));
  });
});
  
/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
   
/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});