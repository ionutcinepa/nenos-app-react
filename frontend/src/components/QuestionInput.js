import React, { useState } from 'react';

const QuestionInput = ({ onResponse }) => {
    const [question, setQuestion] = useState('');
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            // Fetch the document summary from the backend
            const summaryResponse = await fetch("http://127.0.0.1:5000/summary");
            if (!summaryResponse.ok) {
                throw new Error("Failed to fetch document summary");
            }

            const summaryData = await summaryResponse.json();
            if (!summaryData.summary) {
                throw new Error("Summary not found in backend response");
            }

            const summary = summaryData.summary;
            console.log("Fetched summary:", summary); // Debug log

            // Submit the question and summary to the backend
            const response = await fetch("http://127.0.0.1:5000/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question, summary }),
            });

            if (!response.ok) {
                throw new Error("Error in response from /ask endpoint");
            }

            const data = await response.json();
            onResponse(data.cohere_answer, data.nlp_cloud_answer);
        } catch (error) {
            console.error("Error fetching responses:", error);
            alert(error.message); // Notify user of the error
        }
    };
 
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="question">Enter your question:</label>
            <textarea
                id="question"
                rows="4"
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button type="submit">Ask</button>
        </form>
    );
};

export default QuestionInput;




