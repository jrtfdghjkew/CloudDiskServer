const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fileUpload = require('express-fileupload')
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
mongoose.Promise = global.Promise;
const app = express();
const PORT = process.env.PORT || config.get('serverPort');
const mongoDB = "mongodb://localhost:27017";
const corsMiddleware = require('./middleware/cors.middleware')
const filePathMiddleware = require('./middleware/filepath.middleware')
const path = require('path')

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.json())
app.use(express.static('static'))
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

const start = async () => {
    try {
        await mongoose.connect(mongoDB), {
            useNewUrlParser:true,
            useUnifiedTopology:true
        }
        console.log('Connection has started...');


        app.listen(PORT, () => {
            console.log('server started on port:', PORT);
        })
    } catch (e) {

    }
}

start();
