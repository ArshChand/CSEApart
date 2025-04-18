const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mongoose = require('mongoose');
const path = require('path');

// MongoDB URI (replace with your MongoDB connection string)
const mongoURI = 'mongodb+srv://arshchand:Arsh%40110001@cluster1.zlbbdzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'; // Use your MongoDB connection URI

// Set up MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Define a schema for storing extracted text
const extractedTextSchema = new mongoose.Schema({
    text: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

// Create a model from the schema
const ExtractedText = mongoose.model('ExtractedText', extractedTextSchema);

const app = express();
const PORT = 5000;

// Enable CORS so frontend can talk to backend
app.use(cors());

// Setup multer to store uploads in the 'uploads' folder
const upload = multer({ dest: 'uploads/' });

// Route to handle PDF uploads and extract text
app.post('/upload', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
        const fileBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(fileBuffer);
        const extractedText = data.text;

        // Save the extracted text to MongoDB
        const newText = new ExtractedText({ text: extractedText });
        await newText.save(); // Save to MongoDB

        // Clean up the uploaded file after parsing
        fs.unlinkSync(req.file.path);

        // Respond with the extracted text
        return res.json({ text: extractedText });
    } catch (err) {
        console.error('Error parsing PDF:', err);
        return res.status(500).json({ error: 'Failed to parse PDF.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
