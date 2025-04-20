// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const fs = require('fs');
// const pdfParse = require('pdf-parse');
// const mongoose = require('mongoose');
// const path = require('path');
// const { execFile } = require('child_process');

// const mongoURI = 'mongodb+srv://arshchand:Arsh%40110001@cluster1.zlbbdzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected successfully!'))
//     .catch((err) => console.log('MongoDB connection error:', err));
    
// const extractedTextSchema = new mongoose.Schema({
//     paperName: { type: String, required: true },
//     authorName: { type: String, required: true },
//     publicationDate: { type: Date, required: true },
//     text: { type: String, required: true },
//     uploadedAt: { type: Date, default: Date.now },
// });

// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     password: { type: String, required: true },
// });

// const ExtractedText = mongoose.model('ExtractedText', extractedTextSchema); // Capitalized
// const User = mongoose.model('User', userSchema);

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// const upload = multer({ dest: 'uploads/' });

// app.post('/upload', upload.single('pdf'), async (req, res) => {
//     if (!req.file) {
//         return res.status(404).json({ error: 'No file uploaded.' });
//     }

//     const { paperName, authorName, publicationDate } = req.body;

//     // Check if the required fields are present
//     if (!authorName || !paperName || !publicationDate) {
//         return res.status(405).json({ error: 'Author, title, and publication date are required.' });
//     }
//     try {
//         const filePath = req.file.path;
//         const fileBuffer = fs.readFileSync(filePath);
//         const data = await pdfParse(fileBuffer);
//         const extractedText = data.text;

//         const newEntry = new ExtractedText({
//             paperName,
//             authorName,
//             publicationDate,
//             text: extractedText
//         });
//         await newEntry.save();

//         // Call Python summarizer
//         execFile('python', ['../python-summarizer/summarizer.py', filePath], (error, stdout, stderr) => {
//             fs.unlinkSync(filePath); // Clean up the file

//             if (error) {
//                 console.error('Error running summarizer.py:', error);
//                 return res.status(500).json({ error: 'Failed to analyze PDF.' });
//             }

//             try {
//                 const result = JSON.parse(stdout);
//                 return res.json({
//                     text: extractedText,
//                     summary: result.summary,
//                     scores: result.scores,
//                     improvements: result.improvements
//                 });
//             } catch (parseError) {
//                 console.error('Failed to parse Python output:', parseError);
//                 return res.status(500).json({ error: 'Invalid output from analysis script.' });
//             }
//         });
//     } catch (err) {
//         console.error('Error parsing PDF:', err);
//         return res.status(500).json({ error: 'Failed to parse PDF.' });
//     }
// });

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ error: 'Email and password are required.' });
//     }

//     try {
//         const user = await User.findOne({ email, password });
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid credentials.' });
//         }

//         return res.status(200).json({ message: 'Login successful.' });
//     } catch (error) {
//         console.error('Login error:', error);
//         return res.status(500).json({ error: 'Internal server error.' });
//     }
// });

// app.post('/signup', async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ error: 'Email and password are required.' });
//     }

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ error: 'User already exists. Please login.' });
//         }

//         const newUser = new User({ email, password });
//         await newUser.save();

//         return res.status(201).json({ message: 'Signup successful.' });
//     } catch (error) {
//         console.error('Signup error:', error);
//         return res.status(500).json({ error: 'Internal server error.' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });



const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mongoose = require('mongoose');
const path = require('path');
const { execFile } = require('child_process');
const { MongoClient } = require('mongodb');
const { spawn } = require('child_process');


const mongoURI = 'mongodb+srv://arshchand:Arsh%40110001@cluster1.zlbbdzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.log('MongoDB connection error:', err));

const client = new MongoClient(mongoURI);
const db = client.db('test');
const collection = db.collection('extractedText');

async function getDocumentbyTag(tag,value) {
    const query = { [tag] : value };
    return await collection.findOne(query);
}
// Define schemas
const extractedTextSchema = new mongoose.Schema({
    text: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// Define models
const ExtractedTextModel = mongoose.model('ExtractedText', extractedTextSchema);
const User = mongoose.model('User', userSchema);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(404).json({ error: 'No file uploaded.' });
    }

    try {
        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath);
        const parsedData = await pdfParse(fileBuffer);
        const extractedText = parsedData.text;

        const newEntry = new ExtractedTextModel({
            text: extractedText
        });

        await newEntry.save();

        // Call Python summarizer
        execFile('python', ['../python-summarizer/summarizer.py', filePath], (error, stdout, stderr) => {
            fs.unlinkSync(filePath); // Clean up

            if (error) {
                console.error('Error running summarizer.py:', error);
                return res.status(500).json({ error: 'Failed to analyze PDF.' });
            }

            try {
                const result = JSON.parse(stdout);
                return res.json({
                    text: extractedText,
                    summary: result.summary,
                    scores: result.scores,
                    improvements: result.improvements
                });
            } catch (parseError) {
                console.error('Failed to parse Python output:', parseError);
                return res.status(500).json({ error: 'Invalid output from analysis script.' });
            }
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

app.post('/chat', async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: 'No question provided.' });
    }

    try {
        // Fetch all stored extracted text entries
        const documents = await ExtractedTextModel.find({});
        const allChunks = documents.map((doc, index) => ({
            source: `Document_${index + 1}`,
            text: doc.text
        }));

        // Prepare Python input
        const pyInput = {
            question,
            documents: allChunks
        };

        // Call chatbot.py
        const pyProcess = spawn('python', ['../python-summarizer/query.py']);

        let responseData = '';

        pyProcess.stdout.on('data', (data) => {
            responseData += data.toString();
        });

        pyProcess.stderr.on('data', (err) => {
            console.error('Python error:', err.toString());
        });

        pyProcess.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: 'Python script failed.' });
            }

            try {
                const response = JSON.parse(responseData);
                return res.json({ answer: response.answer });
            } catch (e) {
                console.error('JSON parse error:', e);
                return res.status(500).json({ error: 'Invalid response from chatbot.' });
            }
        });

        pyProcess.stdin.write(JSON.stringify(pyInput));
        pyProcess.stdin.end();

    } catch (err) {
        console.error('Chat error:', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
