# Real Estate Landing Page

A clean, responsive landing page for a Real Estate business with a lead-generation form and a small Flask backend to receive submissions.

---

## 🚀 Quick links
- Frontend (Live): (not deployed — see Deployment section)
- Backend (API): (not deployed — see Deployment section)
- GitHub Repository: https://github.com/RahulReddy1105/real-estate-page

---

## ✅ What you'll find here
- A responsive React + Vite frontend (landing page with a lead form)
- A minimal Flask backend that accepts form submissions
- Instructions to run the app locally and deploy it

---

## 🧭 Quick Start (local)
1. Clone the repo
```bash
git clone https://github.com/RahulReddy1105/real-estate-page.git
cd real-estate-page
```

2. Start the backend
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
pip install -r requirements.txt
python app.py
# Backend runs at http://127.0.0.1:5000
```

3. Start the frontend
```bash
cd frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173
```

---

## 📦 API (example)
POST /api/submit

Request (JSON):
```
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```
Response:
```
{
  "message": "Lead submitted successfully!",
  "lead": { ... }
}
```

---

## 📁 Project structure
- backend/
  - app.py — Flask app
  - requirements.txt — Python deps
- frontend/
  - src/ — React source files
  - package.json — Node deps
- README.md — This file

---

## 🤝 Contributing
Contributions are welcome! Open an issue or send a pull request. Please follow basic GitHub etiquette and include a clear description of changes.

---

## 📄 License
This project is provided as-is. Add a license file if you want to make terms explicit.

---

---

## 🚀 Deployment (quick)

**Backend (Render)**
- Add a `Procfile` in `backend/`:

```
web: gunicorn -w 4 -b 0.0.0.0:$PORT app:app
```
- Ensure `gunicorn` is listed in `backend/requirements.txt` (already included).
- Link your GitHub repo to Render and create a Web Service pointing to the `backend/` folder (if deploying the whole repo, set the root as the service).
- Add any required environment variables in Render settings (e.g., `FLASK_DEBUG=false`).

**Frontend (Vercel)**
- Use a Vite environment variable `VITE_API_URL` for the backend URL in production. Set it in Vercel Project Settings → Environment Variables: `VITE_API_URL = https://<your-backend-url>`.
- Build settings:
  - Build Command: `npm run build`
  - Output Directory: `dist`

**Test checklist**
- Visit `GET /` on your backend URL and confirm it returns `{ "status": "ok" }`.
- Deploy the frontend and submit the lead form; confirm the backend logs show the new lead.

---

If you'd like, I can add badges, a screenshot, or a step-by-step troubleshooting section next.
