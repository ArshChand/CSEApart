import sys
import fitz
import google.generativeai as genai

genai.configure(api_key="AIzaSyClpvR6vhgU7aUFQCSMAjXxEBpPN98cXfo")

model = genai.GenerativeModel("gemini-2.0-flash")

def extract_text_from_pdf(path):
    doc = fitz.open(path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def summarize_text(text, max_chunk_length=1000):
    chunks = [text[i:i+max_chunk_length] for i in range(0, len(text), max_chunk_length)]
    summaries = []
    for chunk in chunks:
        prompt = f"Summarize the following scientific paper content:\n\n\"\"\"\n{chunk}\n\"\"\""
        response = model.generate_content(prompt)
        summaries.append(response.text)
    return "\n\n".join(summaries)

if __name__ == "__main__":
    path = sys.argv[1]
    full_text = extract_text_from_pdf(path)
    summary = summarize_text(full_text)
    print(summary)
