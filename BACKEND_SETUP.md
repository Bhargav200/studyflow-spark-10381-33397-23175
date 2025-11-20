# Backend Setup Guide for StudyOrbit

This guide will help you set up the backend for StudyOrbit's AI tools.

## Overview

The frontend is configured to connect to a backend API at `http://localhost:5000/api`. You'll need to create a backend server that implements the following endpoints.

## Required Tech Stack

- **Node.js/Express** (recommended) or any backend framework
- **MongoDB** for data storage
- **AI Service**: OpenAI API, Anthropic Claude, or similar for AI content generation
- **Firebase Admin SDK** for authentication verification

## Environment Variables

Create a `.env` file in your backend with:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key  # or other AI service key
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
```

## API Endpoints to Implement

### 1. Authentication APIs (`/api/auth`)

```javascript
POST /api/auth/register
Body: { email, password, name }
Returns: { success, user }

PUT /api/auth/profile
Body: { userData }
Returns: { success, updatedUser }

GET /api/users/:uid
Returns: { user }
```

### 2. Email Generator APIs (`/api/email-generator`)

```javascript
POST /api/email-generator/generate
Body: { recipient, purpose, tone, additionalInfo }
Returns: { email: "generated email content" }

POST /api/email-generator/save
Body: { emailData }
Returns: { success, savedEmail }

GET /api/email-generator/user-emails
Returns: { emails: [...] }
```

### 3. Resume Generator APIs (`/api/resume-generator`)

```javascript
POST /api/resume-generator/generate
Body: { fullName, email, phone, jobTitle, experience, education, skills, template }
Returns: { resume: "generated resume content" }

POST /api/resume-generator/save
Body: { resumeData }
Returns: { success, savedResume }

GET /api/resume-generator/user-resumes
Returns: { resumes: [...] }
```

### 4. Resume Scorer APIs (`/api/resume-scorer`)

```javascript
POST /api/resume-scorer/analyze
Body: { resumeText, jobDescription }
Returns: { score: 85, feedback: "detailed feedback" }

GET /api/resume-scorer/history
Returns: { history: [...] }
```

### 5. Interview Questions APIs (`/api/interview-questions`)

```javascript
POST /api/interview-questions/generate
Body: { jobRole, industry, experienceLevel, specificTopics }
Returns: { questions: "generated questions" }

POST /api/interview-questions/save-session
Body: { sessionData }
Returns: { success, savedSession }

GET /api/interview-questions/user-sessions
Returns: { sessions: [...] }
```

### 6. Project Documentation APIs (`/api/project-documentation`)

```javascript
POST /api/project-documentation/generate
Body: { projectName, projectType, description, techStack, features, docType }
Returns: { documentation: "generated docs" }

POST /api/project-documentation/save
Body: { docData }
Returns: { success, savedDoc }

GET /api/project-documentation/user-docs
Returns: { docs: [...] }
```

### 7. SOP Letter Generator APIs (`/api/sop-letter-generator`)

```javascript
POST /api/sop-letter-generator/generate
Body: { documentType, applicantName, program, institution, background, achievements, goals, whyProgram }
Returns: { letter: "generated letter" }

POST /api/sop-letter-generator/save
Body: { letterData }
Returns: { success, savedLetter }

GET /api/sop-letter-generator/user-letters
Returns: { letters: [...] }
```

### 8. Credits APIs (`/api/credits`)

```javascript
GET /api/credits/balance
Returns: { balance: 100 }

POST /api/credits/purchase
Body: { amount, paymentDetails }
Returns: { success, newBalance }
```

## Sample Backend Implementation (Express.js)

```javascript
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Example: Email Generator endpoint
app.post('/api/email-generator/generate', verifyToken, async (req, res) => {
  const { recipient, purpose, tone, additionalInfo } = req.body;

  try {
    const prompt = `Generate a professional email with the following details:
    Recipient: ${recipient}
    Purpose: ${purpose}
    Tone: ${tone}
    Additional Info: ${additionalInfo || 'None'}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const email = completion.choices[0].message.content;
    res.json({ email });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate email' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
```

## Database Schema (MongoDB)

### Users Collection
```javascript
{
  _id: ObjectId,
  uid: String,  // Firebase UID
  email: String,
  name: String,
  credits: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Generated Content Collection (for each tool)
```javascript
{
  _id: ObjectId,
  userId: String,  // Firebase UID
  toolType: String,  // 'email', 'resume', 'sop', etc.
  content: String,
  metadata: Object,  // Tool-specific data
  createdAt: Date
}
```

## Alternative: Use Lovable Cloud

Instead of building a custom backend, you can enable **Lovable Cloud** which provides:
- Built-in database (Supabase)
- Authentication
- Edge Functions for serverless backend logic
- File storage

To enable Lovable Cloud, I can help you set it up - just ask!

## Next Steps

1. Create a new backend project folder
2. Install dependencies: `npm install express cors mongodb openai firebase-admin`
3. Implement the endpoints listed above
4. Set up MongoDB database
5. Configure environment variables
6. Test the API endpoints
7. Update `src/lib/api.ts` baseURL to match your backend URL

## Production Deployment

For production, update the `baseURL` in `src/lib/api.ts`:
```javascript
baseURL: process.env.VITE_API_URL || 'https://your-backend-url.com/api',
```

## Questions?

Feel free to ask for help implementing any specific endpoint or feature!
