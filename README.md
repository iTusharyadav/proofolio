#  Proofolio - Developer Portfolio Analyzer

**Proofolio** is an AI-powered web application that analyzes a developer’s public profiles - such as **GitHub**, **LinkedIn**, **Blogs**, and **Coding Platforms** — to generate a **comprehensive performance report** with insights, scores, and growth suggestions.

---

##  Features

- 🔐 **Authentication** with Supabase (email/password, OAuth ready)
- 📊 **Multi-platform Analysis**
  - GitHub repositories, stars, forks, and followers
  - LinkedIn connections and endorsements
  - Blog frequency and engagement
  - Coding platform performance
- 🧠 **AI-Generated Insights** summarizing developer strengths
- 📄 **Downloadable PDF Report** with radar chart visualization
- 🌓 **Automatic Dark/Light Mode** based on user system preferences
- 🗂️ **Reports Dashboard** — view, compare, and manage your analysis
- 🧭 **Fully Responsive** UI built with React + Tailwind CSS
- ⚡ **Supabase Backend** for storing user profiles and reports

---

##  Tech Stack

| Layer | Technology |
|:--|:--|
| **Frontend** | React (Vite) + TypeScript |
| **Styling** | Tailwind CSS + Lucide Icons + Framer Motion |
| **Charts** | Recharts |
| **Backend** | Supabase (PostgreSQL + Auth) |
| **PDF Export** | jsPDF + html2canvas |
| **State Management** | React Context API |
| **Routing** | React Router DOM |

---

##  Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/iTusharyadav/proofolio.git
cd proofolio
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Configure Environment Variables

Create a .env file in the root directory:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4️⃣ Run Development Server

```bash
npm run dev
```

App will be available at:
👉 http://localhost:5173

##  Folder Structure

proofolio/
```bash
├── src/
│   ├── components/        # Navbar, ProtectedRoute, etc.
│   ├── contexts/          # AuthContext for user sessions
│   ├── pages/             # Landing, Dashboard, Report
│   ├── utils/             # Supabase, analysis, helper functions
│   ├── App.tsx            # App routes
│   └── main.tsx           # Entry point
│
├── public/
│
└── README.md
```

## Future Roadmap
- Add Profile Page (user info & editable details)
- Compare Reports (side-by-side visualization)
- More Platform Integrations (LeetCode, Medium, Dev.to)
- Email / Share Report feature
- AI-powered Recommendations

##  Contributing
We welcome all kinds of contributions — bug fixes, new features, UI improvements, documentation, and more!

 
1️⃣ Fork this repository

2️⃣ Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

3️⃣ Commit your changes

```bash
git commit -m "Add your message here"
```

4️⃣ Push to your fork

```bash
git push origin feature/your-feature-name
```
---

## Issues & Feedback
Found a bug? Have a feature idea?
Open an issue and help make Proofolio better

---

## License

This repository is licensed under the [MIT License](LICENSE).

---

##  Contact 
If you have any questions, feel free to reach out to me via GitHub or email at tushar43588@gmail.com.

---
<p align="center">
  Built with 💙
</p>
