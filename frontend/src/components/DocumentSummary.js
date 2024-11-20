import React from 'react';

const DocumentSummary = ({ summary }) => (
  <div className='response'>
    <h2>Document Summary:</h2>
    <p>{summary}</p>
  </div>
);

export default DocumentSummary;
