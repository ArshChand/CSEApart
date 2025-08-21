import sys
import json
import google.generativeai as genai
from collections import defaultdict
import os

# Configure your Gemini API key
genai.configure(api_key="xxx")  # Replace if needed
model = genai.GenerativeModel("gemini-2.0-flash")

def answer_with_context(question, documents):
    # Group chunks by source
    chunks_by_pdf = defaultdict(list)
    for doc in documents:
        source = doc.get("source", "Unknown Source")
        text = doc.get("text", "")
        chunks_by_pdf[source].append(text)

    # Build document context
    document_context = ""
    for source, chunks in chunks_by_pdf.items():
        selected_chunks = chunks[:5]  # take top 5 chunks per doc
        for chunk in selected_chunks:
            document_context += f"\n\nFrom {source}:\n{chunk[:1000]}"

    # Prompt to Gemini
    prompt = f"""
You are a helpful assistant. Use the following document context to answer the question.
Also mention the title of the paper that was used to answer it.

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

        answer = answer_with_context(question, documents)
        print(json.dumps({"answer": answer}))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
