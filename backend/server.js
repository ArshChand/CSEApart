const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mongoose = require('mongoose');
const path = require('path');
const { execFile } = require('child_process');

const mongoURI = 'mongodb+srv://arshchand:Arsh%40110001@cluster1.zlbbdzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.log('MongoDB connection error:', err));

// MongoDB Schemas
const extractedTextSchema = new mongoose.Schema({
    text: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const ExtractedText = mongoose.model('ExtractedText', extractedTextSchema);
const User = mongoose.model('User', userSchema);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // For parsing application/json

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(fileBuffer);
        const extractedText = data.text;

        const newText = new ExtractedText({ text: extractedText });
        await newText.save();

        execFile('python', ['../python-summarizer/summarizer.py', filePath], (error, stdout, stderr) => {
            fs.unlinkSync(filePath);

            if (error) {
                console.error('Error running summarizer.py:', error);
                return res.status(500).json({ error: 'Failed to generate summary.' });
            }

            const summary = stdout.trim();
            return res.json({
                text: extractedText,
                summary: summary
            });
        });
    } catch (err) {
        console.error('Error parsing PDF:', err);
        return res.status(500).json({ error: 'Failed to parse PDF.' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        return res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists. Please login.' });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        return res.status(201).json({ message: 'Signup successful.' });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
