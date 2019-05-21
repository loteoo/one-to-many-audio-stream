import React, { useState } from "react";
import ReactDOM from "react-dom";

import io from 'socket.io-client';
const socket = io.connect('//localhost:8888');

// Broadcasting code
navigator.mediaDevices
.getUserMedia({ audio: true, video: false })
.then(userMediaStream => {

  const mediaRecorder = new MediaRecorder(userMediaStream, {mimeType: 'audio/webm'});

  mediaRecorder.ondataavailable = event => {
    socket.emit('sound-blob', event.data);
  }

  mediaRecorder.start();
})



// Could be just a static html file
const App = () => (
  <div>
    <h1>Audio streaming client</h1>
    <audio>
      <source src="http://example.com/stream.mp3" type="audio/webm" />
    </audio>
  </div>
)



ReactDOM.render(<App />, document.getElementById('app'));