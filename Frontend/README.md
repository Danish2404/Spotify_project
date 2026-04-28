# AI Chatbot

## What I Built
A full-stack AI chatbot integrated into my Spotify project using React frontend and Express backend.

## API and Model
**API:** OpenRouter  
**Model:** openai/gpt-4o-mini  

**Why backend only:**  
If the API key is placed in frontend JavaScript, anyone can inspect browser DevTools or Network requests and steal the key. Keeping it in the backend .env keeps it private.

**Fallback provider:**  
Google Gemini API.  
Changes needed:
1. Change base URL to Gemini endpoint  
2. Change model name to gemini-1.5-flash

## Live Deployment
**Frontend:** https://spotify-project-xi.vercel.app/
**Backend:** https://spotify-project-1-p1ln.onrender.com