import { useState } from 'react';
import Cropper from 'react-easy-crop';
import readFile from 'helpers/images';

const Photo = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleFileChange = async (e: any) => {
    if (e.target?.files?.length) {
      const file = e.target.files[0];
      const imageData: any = await readFile(file);
      setImageSrc(imageData as string);
    }
  };

  if (!imageSrc) {
    return (
      <>
        <div>Photo Cropper goes here</div>
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
        onCropChange={setCrop}
        onZoomChange={setZoom}
      />
    </>
  );
};

export default Photo;
