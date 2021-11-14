const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const axios = require('axios');

axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.BEARER_TOKEN}`;

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server)

const PORT = process.env.PORT || 8000;

const apiRoutes = require('./ApiRoutes/apiRoutes');

app.use(cors());
app.use(compression());
app.use(morgan('tiny'));

app.use(express.static('public'))

app.use('/api', apiRoutes);

app.get('/socket', (req, res) => {
    res.sendFile(__dirname + '/public/socket-client.html')
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('sensor', (data) => {
        // console.log(data)
        socket.broadcast.emit('sensor', data);
    })
});



server.listen(PORT, () => console.log(`Listening in port ${PORT}`))