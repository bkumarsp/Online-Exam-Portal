const express = require('express')
const mongoose = require('mongoose')
const { MONGOURI } = require('../config/keys')
const app = express()
const PORT = process.env.PORT || 5000;

//Require necessary models
require('./models/user')
require('./models/post')
require('./models/test')


//middlewares
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/posts'))

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("Connected to Mongoose...");
})
mongoose.connection.on('err', (err) => {
    console.log("Error connecting to Mongoose \n", err);
})
if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log('Server is running on PORT: ', PORT);
});