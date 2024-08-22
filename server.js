// importing express
const express  = require('express')

// calling express
const app = express()

// passing express
const http = require('http').createServer(app)

// port for deploying
const PORT = process.env.PORT || 3001


// on which port the server is running
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// using express middleware, where the static file like css etc are
app.use(express.static(__dirname + '/public'))


app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})


// socket
const io = require('socket.io')(http)

io.on('connection',(socket) => {
    console.log('Connected...')
    // event that was emitted by client that has to listen
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})
