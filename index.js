const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${"appointmentHome"}:${"nICnUvHd2dJL347b"}@cluster0.o5jef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("hemo_db")

    const userCollection = database.collection("users");
    const servicesCollection = database.collection("services");
    const propertiesCollection = database.collection("properties");

    // add user in database
    app.post('/users', async(req,res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      console.log(result);
      res.json(result);
    });

    // get services data from server
    app.get('/services', async(req, res) => {
      const cursor = servicesCollection.find({});
      const service = await cursor.toArray();
      res.json(service);
    })

    // get properties data from server
    app.get('/properties', async(req, res) => {
      const cursor = propertiesCollection.find({});
      const property = await cursor.toArray();
      res.json(property);
    })
  } 
  finally {
    // await client.close()
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
