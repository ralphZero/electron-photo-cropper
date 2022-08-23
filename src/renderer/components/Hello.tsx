import { Link } from 'react-router-dom';

const Hello = () => {
  return (
    <div>
      <h1>My Photo Cropper</h1>
      <div className="Hello">
        <Link to="/photo">
          <button type="button">
            <span role="img" aria-label="camera">
              📸
            </span>
            Crop Photo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hello;
