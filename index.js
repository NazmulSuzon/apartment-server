const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${'appointmentHome'}:${'nICnUvHd2dJL347b'}@cluster0.o5jef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect(err => {
          const database = client.db('hemo_db');
          // console.log(database);
        const usersCollection = database.collection('users');
        app.post('/users', (req, res) => {
          console.log('api hitted');
          const user = req.body;
          console.log(user)
          const result =  usersCollection.insertOne(user);
          // console.log(result)
          res.json(result)
        })

        app.get('/users',(req,res)=> {
          const cursor = usersCollection.find({});
          const result =  cursor.toArray();
          console.log(result);
          res.json(result);
        })


        })
        

        
    }
    finally{
        // await client.close()
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})