import React, { useState, useRef } from 'react';
import backend_url from '../config';



const FileUpload = ({ onFileUpload }) => {
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const hiddenFileInput = useRef(null); // Create reference to hidden file input element

  const handleClick = () => {
    hiddenFileInput.current.click(); // Programmatically click the hidden file input
  };

  const handleChange = async (event) => {
    const file = event.target.files[0]; // Get the user-selected file
    if (!file) {
      console.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log("Uploading file...");
      const response = await fetch(`${backend_url}/upload`, { 
        method: 'POST', 
        body: formData 
      });
      const data = await response.json();
      onFileUpload(data.summary, null);

      // Show success message
      setSuccessMessage('File uploaded successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Hide message after 3 seconds
    } catch (error) {
      console.error("Error during upload:", error);
      onFileUpload(null, 'Error uploading file');
    }
  };

  return (
    <div>
      {/* Upload Button */}
      <button className="upload-button" onClick={handleClick}>
        +
      </button>
      <input
        type="file"
        ref={hiddenFileInput} // Reference to hidden input
        style={{ display: 'none' }}
        accept="application/pdf"
        onChange={handleChange} // Handle file upload
      />
      {/* Success Toast */}
      {successMessage && <div className="toast show">{successMessage}</div>}
    </div>
  );
};

export default FileUpload;



