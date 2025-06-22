import sys
import json
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Configure Gemini API
genai.configure(api_key="AIzaSyCLKbTL2sneFmE-iLy_9cCNVFAbgwEXUa8")
model = genai.GenerativeModel("gemini-1.5-flash")

# Load embedding model
embedder = SentenceTransformer('all-MiniLM-L6-v2')  # Efficient & accurate

def retrieve_relevant_chunks(question, documents, top_k=5):
    all_chunks = []
    for doc in documents:
        source = doc.get("source", "Unknown")
        text = doc.get("text", "")
        all_chunks.append((source, text))

    chunk_texts = [text for _, text in all_chunks]
    chunk_embeddings = embedder.encode(chunk_texts)
    question_embedding = embedder.encode([question])

    similarities = cosine_similarity(question_embedding, chunk_embeddings)[0]
    top_indices = np.argsort(similarities)[-top_k:][::-1]

    selected = []
    for i in top_indices:
        source, text = all_chunks[i]
        selected.append(f"\n\nFrom {source}:\n{text[:1024]}")  # Trim to avoid token overload
    return selected

def give_answer(question, documents):
    selected_chunks = retrieve_relevant_chunks(question, documents, top_k=100)
    document_context = "\n".join(selected_chunks)

    prompt = f"""
You are a helpful assistant. Use the following document context to answer the question.
Mention which document was used when possible.

Document Context:
{document_context}

Question: {question}

Answer:
"""
    response = model.generate_content(prompt)
    return response.text.strip()

def main():
    try:
        input_data = sys.stdin.read()
        parsed = json.loads(input_data)
        question = parsed.get("question", "")
        documents = parsed.get("documents", [])

        if not question or not documents:
            raise ValueError("Missing question or documents.")

        answer = give_answer(question, documents)
        print(json.dumps({"answer": answer}))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
