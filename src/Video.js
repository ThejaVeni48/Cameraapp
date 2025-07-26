import React, { useRef, useState } from "react";
import Webcam from "react-webcam";





const Video =()=>{

    const [permission,setPermission] = useState(false);
    const [streamData, setStreamData] = useState(null);
    const [recording,setRecording] = useState(false);
    const [storeData,setStoreData] = useState([]);
    const videoRef = useRef();


    const getCameraPermission = async()=>{

     if("MediaRecorder" in window)
     {
        try
        {
          const data = await navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
          });
          setPermission(true);
          setStreamData(data);

        }
        catch(err)
        {
            alert("error",err);
        }
     }
     else{
        alert("Media Recorder is not supported in your browser")
     }
    }

    const startRecording =()=>{
        setRecording(!recording);

        const stream = videoRef.current.stream ;

        const mediaRecorder = new MediaRecorder(stream,{
            mimeType:"video/webm"
        })
        videoRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = (event)=>{
           if (event.data.size > 0) {
        setStoreData((prev) => prev.concat(event.data));
      }
        }
mediaRecorder.start();
    }
    
    const stopRecording = ()=>{
       videoRef.current.stop();
       setRecording(false);
    }
    const downloadRecording = () => {
    const blob = new Blob(storeData, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recorded_video.webm";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

    return(
        <>
    
        <h2>Video</h2>

       <div className="video-controls">
                  {
                    !permission  && <button onClick={getCameraPermission}>Get Permission</button>
                  }
                  {
                    permission &&
                    <Webcam
                   videoConstraints={{ width: 640, height: 480 }}
                  ref={videoRef}
                  />

                  }

                  {
                   ! recording? (
                        <button onClick={startRecording}>Start recording</button>
                    ) :(
                         <button onClick={stopRecording}>Stop recording</button>
                    )  
                  }
                                <button onClick={downloadRecording}>Download</button>

                  
                </div>

      
            </>
    )



}

export default  Video