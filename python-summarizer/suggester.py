import fitz
import google.generativeai as genai
 
# ----------------------
# CONFIGURATION
# ----------------------
PDF_PATH = "/kaggle/input/bkbhbkbb/57_martian_doc.pdf"  # Hardcoded path to your PDF
genai.configure(api_key="AIzaSyC9BSeNbNp2c6kICI7WFzCFQGV9NNyFSWU")
model = genai.GenerativeModel("gemini-2.0-flash")
 
# ----------------------
# 1. PDF TEXT EXTRACTION
# ----------------------
def extract_text_from_pdf(path: str) -> str:
    doc = fitz.open(path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text
 
# ----------------------
# 2. STRUCTURED SUMMARY
# ----------------------
def summarize_entire_text(text: str) -> str:
    prompt = f"""
You are an expert academic assistant. Read the following full research paper and produce a structured summary in academic English.
 
Organize the summary with these sections:
 
1. **Objective** – What is the main goal or research question addressed in the paper?
2. **Methods** – What methods, algorithms, or experiments are used?
3. **Key Findings** – What are the main results, discoveries, or contributions?
4. **Significance** – Why are these findings important for the research community or real-world applications?
 
Avoid copying verbatim. Capture the essence accurately.
 
---
Full Paper Text:
\"\"\"
{text}
\"\"\"
"""
    response = model.generate_content(prompt)
    return response.text.strip()
 
# ----------------------
# 3. PAPER SCORING
# ----------------------
def score_paper_with_gemini(text: str) -> str:
    prompt = f"""
You are an academic reviewer. Based on the following research paper, evaluate and rate the paper on five metrics from 1 (poor) to 5 (excellent). Justify each rating in one sentence.
 
Metrics:
1. Writing Quality – Clarity, grammar, structure.
2. Methodology – Soundness and reproducibility of methods.
3. Academic Standards – Formatting, references, and scientific rigor.
4. Novelty – Originality and uniqueness of the research.
5. Practical Impact – Real-world or academic usefulness.
 
Format:
Writing Quality: x/5 – Justification
Methodology: x/5 – Justification
...
 
---
Full Paper Text:
\"\"\"
{text}
\"\"\"
"""
    response = model.generate_content(prompt)
    return response.text.strip()
 
# ----------------------
# 4. AREAS OF IMPROVEMENT
# ----------------------
def get_improvement_suggestions(text: str) -> str:
    prompt = f"""
You are an academic reviewer. After reading the following research paper, suggest areas for improvement. Be constructive and specific. Address things like clarity, depth, experimental rigor, literature review, etc.
 
---
Full Paper Text:
\"\"\"
{text}
\"\"\"
"""
    response = model.generate_content(prompt)
    return response.text.strip()
 
# ----------------------
# 5. MAIN EXECUTION
# ----------------------
if __name__ == "__main__":
    full_text = extract_text_from_pdf(PDF_PATH)
 
    print("\n===== AREAS OF IMPROVEMENT =====\n")
    suggestions = get_improvement_suggestions(full_text)
    print(suggestions)