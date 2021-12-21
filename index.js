const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config()
require('./db')
app.use(express())
app.use(cors())
app.use(express.json())


const roleRouter = require('./routes/routers/role')
app.use(roleRouter)
const userRouter = require('./routes/routers/user')
app.use(userRouter)
const PORT = process.env.PORT || 6500
app.listen(PORT , ()=>{
    console.log(`Server work on ${PORT}`);
})