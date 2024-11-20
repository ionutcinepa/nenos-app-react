from flask import Flask, request, jsonify
from flask_cors import CORS
from main_chatbot import get_cohere_answer, get_nlp_cloud_answer, load_pdf_text, load_or_summarize_document
import os
import requests
from dotenv import load_dotenv

print(f"Current working directory: {os.getcwd()}")

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

app.config["UPLOAD_FOLDER"] = "uploads"

# Ensure the upload folder exists
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_file():
    """Handle PDF file upload and summarize its content."""
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
   
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    try:
        document_content = load_pdf_text(file_path)
        document_summary = load_or_summarize_document(document_content)
        return jsonify({"summary": document_summary}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to process file: {str(e)}"}), 500

@app.route('/ask', methods=['POST'])
def ask_question():
    """Handle question answering based on the document summary."""
    try:
        data = request.get_json()
        print(data)
        if not data or "question" not in data or "summary" not in data:
            return jsonify({"error": "Invalid request data"}), 400

        question = data["question"]
        summary = data["summary"]

        # Try calling the NLP Cloud API
        try:
            cohere_answer = get_cohere_answer(question, summary)
            nlp_cloud_answer = get_nlp_cloud_answer(question, summary)
        except requests.exceptions.HTTPError as e:
            # Handle specific HTTP error for NLP Cloud
            if e.response.status_code == 429:
                nlp_cloud_answer = "NLP Cloud rate limit reached. Please try again later."
            else:
                raise e

        # Return the answers
        return jsonify({
            "cohere_answer": cohere_answer,
            "nlp_cloud_answer": nlp_cloud_answer
        }), 200

    except Exception as e:
        print(f"Error in /ask: {str(e)}")
        return jsonify({"error": f"Failed to generate answer: {str(e)}"}), 500

@app.route('/summary', methods=['GET'])
def get_summary():
    """Return the cached document summary."""
    try:
        cache_path = os.path.join(os.getcwd(), "cached_summary.txt")
        if not os.path.exists(cache_path):
            return jsonify({"error": "No cached summary found"}), 404

        with open(cache_path, "r", encoding="utf-8") as file:
            summary = file.read()

        if not summary.strip():
            return jsonify({"error": "Cached summary is empty"}), 404

        return jsonify({"summary": summary}), 200
    except Exception as e:
        print(f"Error in /summary: {str(e)}")
        return jsonify({"error": f"Failed to load summary: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)