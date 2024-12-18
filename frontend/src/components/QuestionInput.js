import React, { useState } from 'react';
import FileUpload from './FileUpload';
// import backend_url from '../config';
import backend_url from '../config';

const QuestionInput = ({ onResponse, onFileUpload }) => {
  const [question, setQuestion] = useState('');

  // const backend_url = "http://127.0.0.1:8000"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch the document summary from the backend
      const summaryResponse = await fetch(`${backend_url}/summary`);
      if (!summaryResponse.ok) {
        throw new Error('Failed to fetch document summary');
      }

      const summaryData = await summaryResponse.json();
      if (!summaryData.summary) {
        throw new Error('Summary not found in backend response');
      }

      const summary = summaryData.summary;

      // Submit the question and summary to the backend
      const response = await fetch(`${backend_url}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, summary }),
      });

      if (!response.ok) {
        throw new Error('Error in response from /ask endpoint');
      }
      const data = await response.json();
      onResponse(question, data.cohere_answer, data.nlp_cloud_answer);
      setQuestion(''); // Clear input after submission
    } catch (error) {
      console.error('Error fetching responses:', error);
      alert(error.message); // Notify user of the error
    }
  };

  return (
    <div className="bottom-bar">
      {/* File Upload Button */}
      <FileUpload onFileUpload={onFileUpload} />

      {/* Text Area */}
      <textarea
        className="textarea"
        placeholder="Ask your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* Ask Button */}
      <button type="submit" className="ask-button" onClick={handleSubmit}>
        Ask
      </button>
    </div>
  );
};

export default QuestionInput;