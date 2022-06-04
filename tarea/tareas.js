var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
const { resolve } = require('path');
var path = require("path");
var app = express();
var server = http.createServer(app);

var db = new sqlite3.Database('./tareas.db');
db.run('CREATE TABLE IF NOT EXISTS tareas(id int, tarea varchar(24), prioridad varchar(24), estado varchar(24))');
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'./public/index.html'));
});



// ADD
app.get('/add', function(req,res){
  db.serialize(()=>{

    db.run('INSERT INTO tareas(id,tarea,prioridad,estado) VALUES(?,?,?,?)',
    [1 ,req.query.tarea, "-",  "-"], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("ingreso ok !");
      res.sendFile(path.join(__dirname,'./public/index.html'));
      db.run('update tareas set id=x.rn from (select tarea,row_number() over (partition by 1 order by prioridad) rn from tareas) x where tareas.tarea=x.tarea   ')
    });
  });
});

app.get('/view.json',function(req,res){
  db.serialize(()=>{
    db.all('select * from tareas', [], function(err,row) {
      if (err) {
        return console.log(err.message);
      }
      console.log(row);
      res.setHeader('Access-Control-Allow-Origin','*');
      res.setHeader('Access-Control-Allow-Method','GET');
      res.send(row);
    });
  });
});


app.get('/fecha',function(req,res){

      res.send(Date());
  
});


app.get('/delete',function(req,res){
  db.serialize(()=>{
    db.all('delete from tareas where id=?', [req.query.id], function(err,row) {
      if (err) {
        return console.log(err.message);
      }
      //console.log(row);
      console.log("eliminacion ok !");
      res.sendFile(path.join(__dirname,'./public/index.html'));
    });
  });
});

app.get('/test.json',function(req,res){
      res.setHeader('Access-Control-Allow-Origin','*');
      res.setHeader('Access-Control-Allow-Method','GET');
      res.send({mensaje: 'hola mundo',edad:'2'})});

// Closing the database connection.
app.get('/close', function(req,res){
  db.close((err) => {
    if (err) {
      res.send('There is some error in closing the database');
      return console.error(err.message);
    }
    console.log('Closing the database connection.');
    res.send('Database connection successfully closed');
  });

});

server.listen(3000, function(){
  console.log("server is listening on port: 3000");
});