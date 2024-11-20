import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DocumentSummary from './components/DocumentSummary'; // Correctly importing the component
import QuestionInput from './components/QuestionInput';
import Responses from './components/Responses';
import './App.css';

const App = () => {
  const [documentSummary, setDocumentSummary] = useState(''); // Correct state variable
  const [errorMessage, setErrorMessage] = useState('');
  const [cohereAnswer, setCohereAnswer] = useState('');
  const [nlpCloudAnswer, setNlpCloudAnswer] = useState('');

  const handleFileUpload = (summary, error) => {
    setDocumentSummary(summary || ''); // Correct state variable used here
    setErrorMessage(error || '');
  };

  const handleQuestionResponse = (cohere, nlpCloud) => {
    setCohereAnswer(cohere || '');
    setNlpCloudAnswer(nlpCloud || '');
  };

  return (
    <div className="container">
      <h1>Interactive Chatbot</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <FileUpload onFileUpload={handleFileUpload} />
      {documentSummary && ( // Using the state variable documentSummary
        <>
          <DocumentSummary summary={documentSummary} /> {/* Correct component usage */}
          <QuestionInput onResponse={handleQuestionResponse} />
        </>
      )}
      <Responses cohereAnswer={cohereAnswer} nlpCloudAnswer={nlpCloudAnswer} />
    </div>
  );
};

export default App;
