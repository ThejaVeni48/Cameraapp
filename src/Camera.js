import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';








const Camera = ()=>{
    const webRef = useRef();
  const [mirrored, setMirrored] = useState(false);

    const [image,setImage] = useState(null);


    const captureImage = ()=>{
        const ImageRef = webRef.current.getScreenshot();
        setImage(ImageRef);
    }

    const retake = ()=>{
        setImage(null);
        // captureImage();
    }

    const handleSave = ()=>{
        localStorage.setItem("Images",image);
    }
    const getImages = ()=>{

    
    const getImage = localStorage.getItem("Images");
    console.log("getImage",getImage);
    setImage(getImage);

    }
    return(
        <>
        <h2>Camera Page</h2>
        <Webcam
        audio={false} ref={webRef}
        width={300}
        height={300}
        mirrored={mirrored} 
        //  screenshotFormat="image/jpeg"
        //   screenshotQuality={0.8}
        />
        <button onClick={captureImage}>Capture Image</button>
        {
            image && 
            <>
            <img src={image} alt='Webcam' />
               <button onClick={retake}>Retake</button>
               <button onClick={handleSave}>Save</button>
            </>
        }
        <div className="controls">
        <div>
          <input
            type="checkbox"
            checked={mirrored}
            onChange={(e) => setMirrored(e.target.checked)}
          />
          <label>Mirror</label>
        </div>
        </div>
<button onClick={getImages}>Get image</button>

        <h2>Image from local Storage</h2>

        <image src={image} alt="dddd"/>
        </>
    )


}


export default Camera