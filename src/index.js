import React, { useState } from "react";
import ReactDOM from "react-dom";

import io from 'socket.io-client';
const socket = io.connect('//localhost:8888');



navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(userMediaStream => {
  
  const mediaRecorder = new MediaRecorder(userMediaStream, {mimeType: 'audio/webm'});
  
  mediaRecorder.ondataavailable = event => {
    console.log(event);
    
    if (event.data && event.data.size > 0) {
      socket.emit('sound-blob', event.data);
    }
  }

  
  mediaRecorder.start();

  
})




const App = () => {
  const [state, setstate] = useState({
    test: 'test'
  })
  return (
    <div>
      <div className="container">
        <h1>Hello {state.test}</h1>
        <source src="http://localhost:8080/stream.mp3" type="audio/webm" />
      </div>
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('app'));