const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const socket = require('socket.io')
dotenv.config()
require('./db')
app.use(express())
app.use(cors())
app.use(morgan())
app.use(express.json())


const roleRouter = require('./routers/routes/role')
app.use(roleRouter)
const userRouter = require("./routers/routes/user");
app.use(userRouter)
const postRouter = require("./routers/routes/post");
app.use(postRouter);
const commentRouter = require("./routers/routes/comment")
app.use(commentRouter)
const likeRouter = require("./routers/routes/like")
app.use(likeRouter)


const PORT = process.env.PORT || 6500
app.listen(PORT , ()=>{
    console.log(`Server work on ${PORT}`);
})
