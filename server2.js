const app = express();
const io = require('socket.io').listen(8888);
const stream = require('stream')

const audioStream = new stream.Readable()

var app = express();

app.get('/stream.mp3', (req, res) => {
  audioStream.pipe(res)
})


io.on('connection', (socket) => {
  socket.on('sound-blob', (blob) => {
    audioStream.push(blob)
  })
})


server = http.createServer(app)
server.listen(8080)

console.log('server started')