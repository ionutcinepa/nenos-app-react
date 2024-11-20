import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', { method: 'POST', body: formData });
      const data = await response.json();
      onFileUpload(data.summary, null);
    } catch (error) {
      onFileUpload(null, 'Error uploading file');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="file">Upload PDF Document:</label>
      <input type="file" id="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} required />
      <button type="submit">Upload Document</button>
    </form>
  );
};

export default FileUpload;
