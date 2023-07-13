const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// userName: bb3583400
//password: qS8qaGsiWbYusKem


const uri = "mongodb+srv://bb3583400:qS8qaGsiWbYusKem@cluster0.jpegwwj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


 
async function run() {
  try {
    await client.connect();
    const userCollection = client.db('admin-db').collection('users');

    console.log("db connected")
//get
app.get('/users', async (req, res)=>{
  const query = {};
  const cursor =userCollection.find(query);
  const users = await cursor.toArray();
  res.send(users)
})
//post
app.post('/users', async (req, res)=>{
        const newUser = req.body;
        const result = await userCollection.insertOne(newUser);
        console.log('adding new user', newUser);
        res.send(result)
});
//delete
app.delete('/users/:id', async(req, res)=>{
const id = req.params.id;
const query ={_id: ObjectId};
const result = await userCollection.deleteOne(query);
res.send(result);

 
})
   
} finally {
    
  }
}
run().catch(err =>console.log(err));


//****************** */
app.get('/', (req, res)=>{
    res.send('Hello from server new')
});
 

// const users = [
//     {id:1, name: 'Kamal', email: 'kamal@gmail.com', phone: '017200000'},
//     {id:2, name: 'Jamal', email: 'jamal@gmail.com', phone: '018200000'},
//     {id:3, name: 'hamal', email: 'hamal@gmail.com', phone: '019200000'},
//     {id:4, name: 'Tamal', email: 'tamal@gmail.com', phone: '016200000'},
// ]
// app.get('/users', (req, res)=>{
//     res.send(users)
// });

// app.post('/users', (req, res)=>{
//    console.log('POST API called', req.body)
//    const user = req.body;
//    user.id = users.length + 1;
//    users.push(user);
//    console.log(user)
//    res.send(user)
// });


app.get('/users/:id', (req, res)=>{
    console.log(req.params)
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id == id)
    res.send(user)
});


app.listen(port, () =>{
    console.log('Listening from port', port)
})