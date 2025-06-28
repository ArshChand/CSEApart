# PaperMind: AI-Powered Research Assistant

## Developer 

Arsh Chand : [Github](https://github.com/ArshChand), [LinkedIn](www.linkedin.com/in/arsh-chand)

Kavya Kumar Agrawal : [Github](https://github.com/Kavya-Agrawal), [LinkedIn](https://www.linkedin.com/in/kavya-kumar-agrawal/)

Pratyush Kumar Swain : [Github](https://github.com/Pratyush439), [LinkedIn](https://www.linkedin.com/in/pratyush-kumar-swain-2313482a5/)

Parv Goyal : [Github](https://github.com/goyalparv), [LinkedIn](https://www.linkedin.com/in/parv-goyal-9448b3296/)

## Overview

PaperMind is a comprehensive AI-powered research assistant designed to revolutionize the academic research process. Built with modern web technologies and advanced machine learning models, it provides researchers, students, and academics with intelligent tools to analyze, evaluate, and interact with research papers through natural language processing.

The platform combines document analysis, quality assessment, automated summarization, and conversational AI to create a seamless research workflow that saves time and enhances research quality.

## Key Features

### Intelligent Paper Analysis
- **Automated Content Extraction**: Sophisticated parsing of PDF research papers with structured content recognition
- **Semantic Analysis**: Advanced NLP techniques to understand paper context, methodology, and contributions
- **Quality Assessment**: Multi-dimensional scoring system evaluating originality, technical depth, clarity, and structure
- **Improvement Suggestions**: AI-generated recommendations for enhancing paper quality and readability

### Conversational Research Assistant
- **Context-Aware Chatbot**: Natural language interaction with uploaded research papers
- **Semantic Search**: Vector-based similarity search across paper collections
- **Related Work Discovery**: Automated identification of relevant research papers


## Technology Stack

### Frontend
- **React.js**: Modern, component-based user interface
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Axios**: HTTP client for API communication

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: Document-oriented database for flexible data storage
- **Mongoose**: MongoDB object modeling for Node.js

### Machine Learning & AI
- **Python**: Core ML processing language
- **Transformers (Hugging Face)**: State-of-the-art NLP models
- **Google Generative AI**: Advanced text generation and analysis

### Document Processing
- **PyMuPDF (Fitz)**: High-performance PDF text extraction
- **pdf-parse**: Node.js PDF parsing library
- **Multer**: File upload handling middleware

### Additional Technologies
- **FastAPI**: High-performance API framework for Python services
- **Vector Databases**: Semantic search and similarity matching
- **CORS**: Cross-origin resource sharing middleware

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- Python (v3.10 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/ArshChand/CSEApart.git](https://github.com/ArshChand/CSEApart)
   cd papermind
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Set up Python environment**
   ```bash
   cd python-services
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/papermind
   
   # API Keys
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   
   # Server Configuration
   PORT=3000

### Running the Application

1. **Start the Python ML services**
   ```bash
   cd python-services
   python -m uvicorn main:app --reload --port 8000
   ```

2. **Start the Node.js backend**
   ```bash
   node server.js
   ```

3. **Start the React frontend**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Usage Guide

### Uploading Papers

1. Navigate to the upload section
2. Select PDF files (maximum 10MB each)
3. Wait for processing and analysis completion
4. Review generated summary and quality scores

### Quality Assessment

The system evaluates papers across multiple dimensions:
- **Originality**: Novelty of research contribution
- **Technical Depth**: Rigor of methodology and analysis
- **Clarity**: Writing quality and structure
- **Citations**: Reference quality and relevance

### Chatbot Interaction

1. Select a processed paper as context(if not mentioned answering may take longer)
2. Ask questions in natural language
3. Receive contextual responses based on paper content
4. Explore related topics and papers
   
## Contributing

We welcome contributions to PaperMind! Please follow these guidelines:

1. **Fork the repository** and create a feature branch
2. **Follow coding standards** and include appropriate tests
3. **Update documentation** for any new features
4. **Submit pull requests** with clear descriptions

## Roadmap

### Version 2.0 Features
- Multi-language paper support
- Advanced citation network analysis
- Integration with academic databases
- Collaborative annotation tools
- Mobile application development

### Long-term Vision
- Real-time collaboration features
- Advanced plagiarism detection
- Automated peer review assistance
- Integration with journal submission systems

## License

This project is verified under the CSEA.

## Support

For support and questions contact any of the Developer.

## Acknowledgments

- Hugging Face for providing state-of-the-art NLP models
- The open-source community for excellent libraries and tools
- Academic researchers who provided feedback during development

---

**Built with dedication for the research community**
