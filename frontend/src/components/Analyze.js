// import React, { useState } from 'react';
// import axios from 'axios';
// import { set } from 'mongoose';


// export default function TextForm(props) {
//     const [text, setText] = useState('');
//     const [summary, setSummary] = useState('');
//     const [pdfFile, setPdfFile] = useState(null);
//     const [uploadMessage, setUploadMessage] = useState('');

//     const handleFileChange = (e) => {
//         setPdfFile(e.target.files[0]);
//         setUploadMessage('');
//     };

//     const handleOnChange = (event) => {
//         setText(event.target.value);
//     };

//     const handleUploadPDF = async () => {
//         if (!pdfFile) {
//             setUploadMessage("Please select a PDF file to upload.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdf', pdfFile);

//         try {
//             setTimeout(() => {
//                 setUploadMessage('Might take a few seconds...');
//             }, 500);

//             const res = await axios.post('http://localhost:5000/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             const { text: extractedText, summary } = res.data;

//             setText(extractedText);
//             setSummary(summary);
//             setUploadMessage('✅ PDF uploaded and summarized successfully!');
//             props.showAlert("PDF processed and summary generated!", "success");

//         } catch (error) {
//             console.error("Upload error:", error.response?.data || error.message);
//             setUploadMessage("❌ Upload failed.");
//             props.showAlert("Upload failed!", "warning");
//         }
//     };

//     return (
//         <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
//             <div className="py-4 px-3 mb-5 text-center" style={{
//                 background: props.mode === 'dark' ? '#2b2b2b' : '#e9f5ff',
//                 borderRadius: '10px'
//             }}>
//                 <h2 className="fw-bold">Your AI Research Companion</h2>
//                 <p className="lead">Upload academic PDFs, get summaries instantly, and ask your custom chatbot!</p>
//             </div>

//             <div className="row">
//                 {/* Left Column: Upload + Input */}
//                 <div className="col-md-6 mb-4">
//                     <h4>Upload Research Paper (PDF)</h4>
//                     <input type="file" accept="application/pdf" onChange={handleFileChange} className="form-control mt-2 mb-2" />
//                     <button className="btn btn-outline-info" onClick={handleUploadPDF}>Upload PDF</button>
//                     {uploadMessage && <div className="mt-2 alert alert-info">{uploadMessage}</div>}

//                     <h5 className='mt-4'>Extracted Text</h5>
//                     <textarea
//                         className="form-control"
//                         value={text}
//                         onChange={handleOnChange}
//                         style={{
//                             backgroundColor: props.mode === 'dark' ? '#1e1e1e' : 'white',
//                             color: props.mode === 'dark' ? 'white' : '#042743'
//                         }}
//                         rows="12"
//                         placeholder="Your Extracted text will appear here..."
//                     ></textarea>
//                 </div>

//                 {/* Right Column: Summary + Stats */}
//                 <div className="col-md-6">
//                     <h5>Summary</h5>
//                     <div className="card p-3 mb-3" style={{
//                         backgroundColor: props.mode === 'dark' ? '#2a2a2a' : '#f8f9fa',
//                         border: props.mode === 'dark' ? '1px solid #555' : 'none'
//                     }}>
//                         <p>{summary.length > 0 ? summary : "Summary will appear here after upload."}</p>
//                     </div>

//                     <h6>Details</h6>
//                     <div className="card p-3 mb-3" style={{
//                         backgroundColor: props.mode === 'dark' ? '#2a2a2a' : '#e9ecef',
//                         border: props.mode === 'dark' ? '1px solid #555' : '1px solid #ddd'
//                     }}>
//                         <p><strong>Words:</strong> {text.split(/\s+/).filter(word => word.length !== 0).length}</p>
//                         <p><strong>Characters:</strong> {text.length}</p>
//                         <p><strong>Estimated Read Time:</strong> {(0.008 * text.split(/\s+/).filter(word => word.length !== 0).length).toFixed(2)} min</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useState } from 'react';
import axios from 'axios';

export default function TextForm(props) {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [scores, setscores] = useState('');
    const [improvements, setImprovements] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');

    const [authorName, setAuthor] = useState('');
    const [paperName, setTitle] = useState('');
    const [publicationDate, setPublicationDate] = useState('');

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
        setUploadMessage('');
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    const handleUploadPDF = async () => {
        if (!pdfFile || !authorName.trim() || !paperName.trim() || !publicationDate.trim()) {
            setUploadMessage("❌ Please fill in all fields and select a PDF file.");
            props.showAlert("All fields are required before uploading.", "warning");
            return;
        }

        const formData = new FormData();
        formData.append('pdf', pdfFile);
        formData.append('author', authorName);
        formData.append('title', paperName);
        formData.append('publicationDate', publicationDate);

        try {
            setTimeout(() => {
                setUploadMessage('Uploading... Might take a few seconds.');
            }, 500);

            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { text: extractedText, summary, scores, improvements } = res.data;

            setText(extractedText);
            setSummary(summary);
            setscores(scores || 'No scorer output available');
            setImprovements(improvements);
            setUploadMessage('✅ PDF uploaded and summarized successfully!');
            props.showAlert("PDF processed and summary generated!", "success");

        } catch (error) {
            console.error("Upload error:", error.response?.data || error.message);
            setUploadMessage("❌ Upload failed.");
            props.showAlert("Upload failed!", "danger");
        }
    };

    return (
        <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
            <div className="py-4 px-3 mb-5 text-center" style={{
                background: props.mode === 'dark' ? '#2b2b2b' : '#e9f5ff',
                borderRadius: '10px'
            }}>
                <h2 className="fw-bold">Your AI Research Companion</h2>
                <p className="lead">Upload academic PDFs, get summaries instantly, and ask your custom chatbot!</p>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <h4>Upload Research Paper (PDF)</h4>

                    <label className="form-label mt-2">Author Name</label>
                    <input type="text" className="form-control" value={authorName} onChange={(e) => setAuthor(e.target.value)} />

                    <label className="form-label mt-2">Paper Title</label>
                    <input type="text" className="form-control" value={paperName} onChange={(e) => setTitle(e.target.value)} />

                    <label className="form-label mt-2">Publication Date</label>
                    <input type="date" className="form-control" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />

                    <label className="form-label mt-2">Select PDF File</label>
                    <input type="file" accept="application/pdf" onChange={handleFileChange} className="form-control mt-1 mb-2" />

                    <button className="btn btn-outline-info mt-2" onClick={handleUploadPDF}>Upload PDF</button>
                    {uploadMessage && <div className="mt-2 alert alert-info">{uploadMessage}</div>}

                    <h5 className="mt-4">Suggested Areas for Improvement</h5>
                    <div className="card p-3 mb-3" style={{
                        backgroundColor: props.mode === 'dark' ? '#2a2a2a' : '#e9ecef',
                        border: props.mode === 'dark' ? '1px solid #555' : '1px solid #ddd',
                        whiteSpace: 'pre-wrap'
                    }}>
                        <p>{improvements.length > 0 ? improvements : "Improvement suggestions will appear here after upload."}</p>
                    </div>
                </div>

                <div className="col-md-6">

                    <h5>Paper Evaluation:</h5>
                    <div className="card p-3 mb-3" style={{
                        backgroundColor: props.mode === 'dark' ? '#2a2a2a' : '#e9ecef',
                        border: props.mode === 'dark' ? '1px solid #555' : '1px solid #ddd',
                        whiteSpace: 'pre-wrap'
                    }}>
                        <p>{scores.length > 0 ? scores : "Scorer output will appear here after upload."}</p>
                    </div>

                    <h5>Summary</h5>
                    <div className="card p-3 mb-3" style={{
                        backgroundColor: props.mode === 'dark' ? '#2a2a2a' : '#f8f9fa',
                        border: props.mode === 'dark' ? '1px solid #555' : 'none',
                        whiteSpace: 'pre-wrap'
                    }}>
                        <p>{summary.length > 0 ? summary : "Summary will appear here after upload."}</p>
                    </div>

                    

                    <h6>Details</h6>
                    <div className="card p-3 mb-3" style={{
                        backgroundColor: props.mode === 'dark' ? '#2a2a2a' : '#e9ecef',
                        border: props.mode === 'dark' ? '1px solid #555' : '1px solid #ddd'
                    }}>
                        <p><strong>Words:</strong> {text.split(/\s+/).filter(word => word.length !== 0).length}</p>
                        <p><strong>Characters:</strong> {text.length}</p>
                        <p><strong>Estimated Read Time:</strong> {(0.0008 * summary.split(/\s+/).filter(word => word.length !== 0).length).toFixed(2)} min</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
