import React from 'react';

const Responses = ({ cohereAnswer, nlpCloudAnswer }) => (
    <div className='response'>
    {cohereAnswer && (
      <>
        <h2>Cohere Answer:</h2>
        <p>{cohereAnswer}</p>
      </>
    )}
    {nlpCloudAnswer && (
      <>
        <h2>NLP Cloud Answer:</h2>
        <p>{nlpCloudAnswer}</p>
      </>
    )}
  </div>
);

export default Responses;

  
