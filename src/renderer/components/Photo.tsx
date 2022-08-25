import { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { cropImageData, readFile } from 'helpers/images';

const Photo = () => {
  const [imageSrc, setImageSrc] = useState(''); // file data
  const [filename, setFilename] = useState(''); // file address
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const onCropComplete = useCallback(
    (_croppedArea: Area, currentCroppedAreaPixels: Area) => {
      setCroppedAreaPixels(currentCroppedAreaPixels);
    },
    []
  );

  const handleFileChange = async (e: any) => {
    if (e.target?.files?.length) {
      const file = e.target.files[0];
      setFilename(file.path);
      const imageData: any = await readFile(file);
      setImageSrc(imageData as string);
    }
  };

  const handleSave = async () => {
    // first save cropped image
    // create tje croppend iamge unsing canvas
    const base64Data = await cropImageData(imageSrc, croppedAreaPixels!).catch(
      console.error
    );
    // create a new filename
    const newFileName = `${filename}-croppend.png`;
    // then those results to saveImage via ipcRender event
    window.electron.saveCroppedImage([newFileName, base64Data]);
    // then reset the interface
    setImageSrc('');
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  if (!imageSrc) {
    return (
      <>
        <h1>Choose photo to crop</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </>
    );
  }
  return (
    <>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
      <button onClick={handleSave} type="button" className="save-btn">
        Save
      </button>
    </>
  );
};

export default Photo;
