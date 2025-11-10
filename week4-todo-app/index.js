const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.json());

function initialize(){
    if(!fs.existsSync('todos.json')){
        fs.writeFileSync('todos.json','');
    }
}

initialize();

app.get('/', (req, res) => {
  res.send('Hello World')
})


app.get('/todos', (req, res) => {
    const data = fs.readFileSync('todos.json', 'utf-8');
    let todos = [];
    if(data === ''){
        res.send(todos);
    }
    todos = JSON.parse(data);
    res.send(todos);
})

app.post('/todos', (req, res) =>{
    console.log(req.body);
    let todo = req.body;
    const data = fs.readFileSync('todos.json', 'utf-8');
    let todos = []; 
    if(data !== ''){
        todos = JSON.parse(data);
    }
    todos.push(todo);
    fs.writeFileSync('todos.json', JSON.stringify(todos));
    res.send('TODO added successfully');
})

app.listen(3000)