# # import sys
# # import fitz
# # import google.generativeai as genai

# # genai.configure(api_key="")

# # model = genai.GenerativeModel("gemini-2.0-flash")

# # def extract_text_from_pdf(path):
# #     doc = fitz.open(path)
# #     text = ""
# #     for page in doc:
# #         text += page.get_text()
# #     return text

# # def summarize_text(text, max_chunk_length=1000):
# #     chunks = [text[i:i+max_chunk_length] for i in range(0, len(text), max_chunk_length)]
# #     summaries = []
# #     for chunk in chunks:
# #         prompt = f"Summarize the following scientific paper content:\n\n\"\"\"\n{chunk}\n\"\"\""
# #         response = model.generate_content(prompt)
# #         summaries.append(response.text)
# #     return "\n\n".join(summaries)

# # if __name__ == "__main__":
# #     path = sys.argv[1]
# #     full_text = extract_text_from_pdf(path)
# #     summary = summarize_text(full_text)
# #     print(summary)


# # import fitz
# # import sys
# # import google.generativeai as genai
 
# # # ----------------------

# # # CONFIGURATION

# # # ----------------------

# # ##PDF_PATH = "/kaggle/input/inkulurer/banerjee-inkulu-2022-vertex-guarding-for-dynamic-orthogonal-art-galleries.pdf"  # Hardcoded path to your PDF

# # genai.configure(api_key="")

# # model = genai.GenerativeModel("gemini-2.0-flash")
 
# # # ----------------------

# # # 1. PDF TEXT EXTRACTION

# # # ----------------------

# # def extract_text_from_pdf(path: str) -> str:

# #     doc = fitz.open(path)

# #     text = ""

# #     for page in doc:

# #         text += page.get_text()

# #     return text
 
# # # ----------------------

# # # 2. FULL-PAPER STRUCTURED SUMMARY

# # # ----------------------

# # def summarize_entire_text(text: str) -> str:

# #     prompt = f"""

# # You are an expert academic assistant. Read the following full research paper content and produce a concise structured summary in clear academic English.
 
# # Organize the summary with these four sections:
 
# # 1. **Objective** – What is the main goal or research question addressed in the paper?

# # 2. **Methods** – What methods, algorithms, or experiments are used?

# # 3. **Key Findings** – What are the main results, discoveries, or contributions?

# # 4. **Significance** – Why are these findings important for the research community or real-world applications?
 
# # Avoid copying verbatim text. Focus on capturing the essence of the paper accurately.
 
# # ---

# # Full Paper Text:

# # \"\"\"

# # {text}

# # \"\"\"

# # """

# #     response = model.generate_content(prompt)

# #     return response.text.strip()
 
# # # ----------------------

# # # 3. EXECUTION

# # # ----------------------

# # if __name__ == "__main__":
# #     PDF_PATH = sys.argv[1]

# #     full_text = extract_text_from_pdf(PDF_PATH)

# #     summary = summarize_entire_text(full_text)

# #     print("\n===== STRUCTURED SUMMARY =====\n")

# #     print(summary)

# import fitz
# import sys
# import google.generativeai as genai

# # ----------------------
# # CONFIGURATION
# # ----------------------

# genai.configure(api_key="")

# model = genai.GenerativeModel("gemini-2.0-flash")

# # ----------------------
# # 1. PDF TEXT EXTRACTION
# # ----------------------

# def extract_text_from_pdf(path: str) -> str:
#     try:
#         doc = fitz.open(path)
#     except Exception as e:
#         print(f"Error opening PDF: {e}")
#         sys.exit(1)

#     text = ""
#     for page in doc:
#         text += page.get_text()

#     return text

# # ----------------------
# # 2. FULL-PAPER STRUCTURED SUMMARY
# # ----------------------

# def summarize_entire_text(text: str) -> str:
#     prompt = f"""
# You are an expert academic assistant. Read the following full research paper content and produce a concise structured summary in clear academic English.

# Organize the summary with these four sections:

# 1. **Objective** – What is the main goal or research question addressed in the paper?
# 2. **Methods** – What methods, algorithms, or experiments are used?
# 3. **Key Findings** – What are the main results, discoveries, or contributions?
# 4. **Significance** – Why are these findings important for the research community or real-world applications?

# Avoid copying verbatim text. Focus on capturing the essence of the paper accurately.

# ---

# Full Paper Text:

# \"\"\"

# {text}

# \"\"\"
# """

#     try:
#         response = model.generate_content(prompt)
#         return response.text.strip()
#     except Exception as e:
#         print(f"Error generating summary: {e}")
#         sys.exit(1)

# # ----------------------
# # 3. EXECUTION
# # ----------------------

# if __name__ == "__main__":
#     if len(sys.argv) < 2:
#         print("Please provide the path to the PDF as a command-line argument.")
#         sys.exit(1)

#     PDF_PATH = sys.argv[1]

#     try:
#         full_text = extract_text_from_pdf(PDF_PATH)
#     except Exception as e:
#         print(f"Error during text extraction: {e}")
#         sys.exit(1)

#     try:
#         summary = summarize_entire_text(full_text)
#     except Exception as e:
#         print(f"Error during summarization: {e}")
#         sys.exit(1)

#     # Ensure the output is correctly encoded for handling special characters (e.g., Greek letters)
#     sys.stdout.reconfigure(encoding='utf-8')

#     print("\n===== STRUCTURED SUMMARY =====\n")
#     print(summary)


import fitz
import sys
import json
import google.generativeai as genai
 
# ----------------------
# CONFIGURATION
# ----------------------

genai.configure(api_key="")
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
You are an academic reviewer. After reading the following research paper, suggest areas for improvement. Be constructive and specific. Address things like clarity, depth, experimental rigor, literature review, etc. Make sure that your output is a little short lengthed and specific.
 
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
    PDF_PATH = sys.argv[1]
    full_text = extract_text_from_pdf(PDF_PATH)

    summary = summarize_entire_text(full_text)
    scores = score_paper_with_gemini(full_text)
    suggestions = get_improvement_suggestions(full_text)

    result = {
        "summary": summary,
        "scores": scores,
        "improvements": suggestions
    }

    sys.stdout.reconfigure(encoding='utf-8')
    print(json.dumps(result, ensure_ascii=False))