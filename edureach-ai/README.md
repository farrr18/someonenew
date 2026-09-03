# EduReach AI — Personalized Learning for Everyone

Hackathon-ready MVP prototype for the INFEST Hackathon XII 2026 Education track.

## What is included
- Dashboard with learner mastery profile
- AI Diagnostic Assessment (3-question demo)
- Personalized Learning Path
- Targeted Practice
- AI Error Analysis / explainable recommendations
- Low-bandwidth learning mode concept
- Responsive UI for desktop and mobile
- Zero backend and zero API key required for the demo

## Important prototype note
This version intentionally uses a deterministic in-browser rules engine for the AI demonstration. It is **not** a production ML model yet. For the actual hackathon, replace/extend the rules engine with your own trained/fine-tuned model + curated dataset + recommendation pipeline so the project meets the event's AI-development requirements.

## Run locally
You can simply open `index.html` in a browser.

Recommended local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to Vercel
1. Upload this folder to a GitHub repository.
2. In Vercel, click **Add New → Project**.
3. Import the repository.
4. Framework preset: **Other** (or leave auto-detected).
5. Build command: leave empty.
6. Output directory: `.`
7. Deploy.

You can also drag-and-drop the project folder into a compatible static hosting workflow.

## Suggested hackathon next steps
1. Build a small licensed/owned diagnostic dataset.
2. Train/fine-tune a lightweight model for skill classification or misconception detection.
3. Implement an original recommendation algorithm that maps skills → next lesson → question difficulty.
4. Add a small backend/API for persistence.
5. Add a teacher dashboard for class-level learning gaps.
6. Keep the MVP stable enough to reproduce the three required test scenarios: positive, negative, and edge case.

## Output story for the pitch
**Traditional platform:** serves content.

**EduReach AI:** identifies what a learner does not understand and decides what they should learn next.

Tagline: **Education should adapt to students — not students adapt to one way of learning.**
