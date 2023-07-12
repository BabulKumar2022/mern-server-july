const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res)=>{
    res.send('Hello from server new')
});

app.use(cors());
app.use(express.json());

const users = [
    {id:1, name: 'Kamal', email: 'kamal@gmail.com', phone: '017200000'},
    {id:2, name: 'Jamal', email: 'jamal@gmail.com', phone: '018200000'},
    {id:3, name: 'hamal', email: 'hamal@gmail.com', phone: '019200000'},
    {id:4, name: 'Tamal', email: 'tamal@gmail.com', phone: '016200000'},
]
app.get('/users', (req, res)=>{
    res.send(users)
});

app.post('/users', (req, res)=>{
   console.log('POST API called')
   const user =req.body;
   user.id = users.length + 1;
   users.push(user);
   console.log(user)
   res.send(user)
});


app.get('/user/:id', (req, res)=>{
    console.log(req.params)
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id == id)
    res.send(user)
});


app.listen(port, () =>{
    console.log('Listening from port', port)
})