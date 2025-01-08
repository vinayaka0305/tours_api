const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.URI).then(()=>{
    console.log('connected to DB(tour)')
}).catch((error)=>{
    console.log(error)
})


app.listen(process.env.PORT,()=>{
    console.log(`server is runnig ${process.env.PORT}`)
})

