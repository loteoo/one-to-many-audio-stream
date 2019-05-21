const io = require('socket.io').listen(8888);

const Koa = require('koa')
const Router = require('koa-router')

const stream = require("stream")


const app = new Koa()
const router = new Router()

const audioStream = new stream.Readable()

router.get('/stream.mp3', (ctx, next) => {
  console.log(audioStream)
  if (audioStream) {
    ctx.response.set('Content-type', 'audio/webm');
    ctx.body = audioStream; // Koa docs indicates this method to return streams
  } else {
    ctx.body = 'No stream'
  }
})



app.use(router.routes())
app.use(router.allowedMethods())
app.listen(8080)



io.on('connection', function(socket) {

  console.log('client connected');
    
  socket.on('sound-blob', function(blob) {
    
    audioStream.push(blob)
    console.log(blob);
    
    // socket.emit('emit-sound', incoming)
  });
});


console.log('server started')