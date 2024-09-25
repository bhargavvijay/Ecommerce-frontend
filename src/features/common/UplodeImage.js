import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo,updateUserAsync} from '../user/userSlice';
function UploadImage({setImageUploadEnabled,imageUploadEnabled}) {
  const [base64Image, setBase64Image] = useState(null);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(userInfo.profileImage);

  // Function to handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Convert the selected image to Base64
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
        setSelectedImage(reader.result); // Update selectedImage with base64 representation
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle image upload
  const handleImageUpload = () => {
    // Send the Base64 encoded image to the server
    if (base64Image) {
      dispatch(updateUserAsync({ ...userInfo, profileImage: base64Image }));
      // Here you can send the base64Image to the server using fetch or any other method
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {/* Display selected image */}
      {selectedImage && (
        <div>
          <h4>Selected Image:</h4>
          <img
            src={selectedImage} 
            alt="Selected"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        </div>
      )}
    </div>
  );
}

export default UploadImage;
