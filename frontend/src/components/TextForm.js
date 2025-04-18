import React, { useState } from 'react';
import axios from 'axios';

export default function TextForm(props) {
    const [text, setText] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    const handleTransform = (type) => {
        let newText = text;
        switch (type) {
            case 'UPPERCASE':
                newText = text.toUpperCase();
                props.showAlert("Converted to Uppercase!", "success");
                break;
            case 'LOWERCASE':
                newText = text.toLowerCase();
                props.showAlert("Converted to Lowercase!", "success");
                break;
            case 'CLEAR':
                newText = '';
                props.showAlert("Text Cleared!", "success");
                break;
            case 'COPY':
                navigator.clipboard.writeText(text);
                props.showAlert("Copied to Clipboard!", "success");
                return;
            case 'REMOVE_SPACES':
                newText = text.replace(/\s+/g, ' ').trim();
                props.showAlert("Extra spaces removed!", "success");
                break;
            default:
                break;
        }
        setText(newText);
    };

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
        setUploadMessage('');
    };

    const handleUploadPDF = async () => {
        if (!pdfFile) {
            setUploadMessage("Please select a PDF file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('pdf', pdfFile);

        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            const extractedText = res.data.text || '';
            setText(extractedText); // Auto-fill textarea
            setUploadMessage('PDF uploaded and text extracted successfully!');
            props.showAlert("PDF uploaded and text extracted!", "success");
            //setPdfFile(null); // Reset the PDF file after successful upload

        } catch (error) {
            console.error(error);
            setUploadMessage("Upload failed.");
            props.showAlert("Upload failed!", "warning");
        }
    };

    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h1 className='mb-4'>{props.heading}</h1>
                <textarea className="form-control mb-3" value={text} onChange={handleOnChange} 
                    style={{ backgroundColor: props.mode === 'dark' ? '#1e1e1e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }}
                    rows="6" placeholder="Enter text here...">
                </textarea>

                <div className="d-flex flex-wrap gap-2 mb-4">
                    <button disabled={!text} className="btn btn-primary" onClick={() => handleTransform('UPPERCASE')}>Uppercase</button>
                    <button disabled={!text} className="btn btn-secondary" onClick={() => handleTransform('LOWERCASE')}>Lowercase</button>
                    <button disabled={!text} className="btn btn-danger" onClick={() => handleTransform('CLEAR')}>Clear</button>
                    <button disabled={!text} className="btn btn-warning" onClick={() => handleTransform('COPY')}>Copy</button>
                    <button disabled={!text} className="btn btn-success" onClick={() => handleTransform('REMOVE_SPACES')}>Trim Spaces</button>
                </div>

                <div className="my-3">
                    <h4>Upload Research Paper (PDF)</h4>
                    <input type="file" accept="application/pdf" onChange={handleFileChange} className="form-control mt-2 mb-2" />
                    <button className="btn btn-outline-info" onClick={handleUploadPDF}>Upload PDF</button>
                    {uploadMessage && <div className="mt-2 alert alert-info">{uploadMessage}</div>}
                </div>
            </div>

            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h2>Text Summary</h2>
                <div className="card p-3" style={{ backgroundColor: props.mode === 'dark' ? '#2a2a2a' : '#f8f9fa', border: props.mode === 'dark' ? '1px solid #555' : 'none' }}>
                    <p><strong>Words:</strong> {text.split(/\s+/).filter(word => word.length !== 0).length}</p>
                    <p><strong>Characters:</strong> {text.length}</p>
                    <p><strong>Estimated Read Time:</strong> {(0.008 * text.split(/\s+/).filter(word => word.length !== 0).length).toFixed(2)} min</p>
                </div>
                <h2 className='mt-3'>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
            </div>
        </>
    );
}
