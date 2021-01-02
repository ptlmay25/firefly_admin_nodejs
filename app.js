const express = require("express"); //for routing
const mongoose = require("mongoose"); //for database operation it is an ODM 
const bodyParser = require("body-parser"); //For parsing the data which we will get from the frontend
const cors = require("cors"); //cross origin support
const path = require("path");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const port = 5000;
app.set("port", process.env.port || port);

const routes = require("./routes/api/index");
app.use("/api", routes);

//Import Datbase URL
var db = require("./config/conn").url;

//MongoDB Datbase Connection
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.use('/status', (req,res)=>{
    res.json({
        "status" : "healthy",
        "timestamp" : new Date(),
    })
})

//We are running our application on server port : 5000
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});