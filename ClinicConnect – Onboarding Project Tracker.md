ClinicConnect – Onboarding Project Tracker
Developer: Zohaib Munir | Mentor: Claude (acting as senior developer) | Started: November 27, 2026
1. About the Developer
• BSCS 2026 graduate (BIIT, Rawalpindi), CGPA 3.24/4.00
• Experience: AI Frontend Engineer Intern at FlyRank AI; Web Developer Intern at Mercurial Minds
• Strong: React.js, JavaScript, REST APIs, Node.js/Express, SQL Server, C#
• Gaps to close: ASP.NET Core, Entity Framework Core, unit testing, Agile/Scrum habits
• Goal: get a software developer job or an internship leading to one; strengthen the MERN stack first, then rebuild the backend in ASP.NET Core
2. Project Brief
ClinicConnect is an appointment booking system for a small clinic.
• Roles: Patient, Doctor, Admin
• Patient: register, log in, browse doctors, book/cancel appointments, see own appointments
• Doctor: set weekly availability, see and update status of own appointments (confirmed, completed)
• Admin: manage doctors and view all appointments
• Stack (Phase 1): MongoDB Atlas, Express, React (Vite), Node.js, JWT authentication
• Later (Phase 6): rebuild the same API in ASP.NET Core with SQL Server and Entity Framework Core, keeping the same endpoints
Team rules (like a real company):
1.  Everything lives in Git with clear commit messages (for example: feat: add login endpoint).
2.  Never commit secrets (.env files).
3.  Each task ends with a short report to your mentor: what you did, what broke, what you learned.
4.  Ask when stuck for more than 30 minutes, but try first.
3. Roadmap
• Phase 1: Setup and API design
• Phase 2: Authentication and roles
• Phase 3: Core backend (doctors, availability, appointments)
• Phase 4: React frontend
• Phase 5: Testing, polish, and deployment
• Phase 6: Rebuild the backend in ASP.NET Core
Tasks are assigned one at a time. Details of each task appear below once it is assigned.
4. Current Task
Task 1: Project Setup and API Design
Goal: Have a running skeleton and a written plan for the API before writing any real features.
Steps
1.  Create a GitHub repo named clinicconnect with two folders: client and server. Add a README with a one-paragraph project description.
2.  In server: run npm init, then install express, mongoose, dotenv, and cors. Add a .gitignore with node_modules and .env.
3.  Create a free MongoDB Atlas cluster. Put the connection string in a .env file (never commit it) and connect from the server using Mongoose.
4.  Build a minimal Express server with one route: GET /api/health that returns { "status": "ok" }. Test it in Postman.
5.  In client: create a Vite + React app, remove the default template content, and show a simple "ClinicConnect" page.
6.  Write docs/api-design.md listing every endpoint you plan to build. For each: method, path, who can call it (public, patient, doctor, admin), request body, and response. Cover: register, login, current user, list doctors, doctor details, set availability, create appointment, list my appointments, cancel appointment, update appointment status.
7.  In the same doc, design your MongoDB collections (users, doctors or doctor profile fields, appointments): field names, types, and which fields reference other collections.
8.  Commit in small steps and push to GitHub.
Definition of done
[ ] Repo on GitHub with client and server
[ ] GET /api/health works and is tested in Postman
[ ] Server connects to MongoDB Atlas
[ ] React app runs locally
[ ] docs/api-design.md covers all listed endpoints and collections
[ ] At least 5 meaningful commits, no secrets committed
Report back with: your repo link, a screenshot of the Postman health check, and the pasted text of api-design.md for review.
5. Progress Log
Task
Title
Status
Date
Mentor notes
1
Project setup and API design
Assigned
Nov 27, 2026
Waiting for your report
6. Decisions and Notes
• Nov 27, 2026: Project chosen: ClinicConnect (appointment booking, healthcare-style, useful for software roles at healthcare-tech companies)
• Nov 27, 2026: Design the API first so the ASP.NET Core rebuild in Phase 6 can keep the same endpoints
7. How to Continue in a New Chat
Start a new chat with Claude and paste this:
I am Zohaib. I am doing the ClinicConnect onboarding project with you acting as my senior developer. Here is my tracker document: [paste this whole document]. I just finished Task [number]. Here is my report: [your report]. Please review it, update the log, and give me the next task.
Keep this document updated after every task. It is the single source of truth for your progress.