# Open_mindsAI
# 🧠 OpsMind AI  
### Context-Aware Corporate Knowledge Assistant (RAG-Based)

OpsMind AI is a **Retrieval Augmented Generation (RAG)** powered enterprise knowledge assistant designed to help employees instantly find **accurate, verifiable answers** from internal corporate documents such as **HR policies, refund rules, IT security guidelines, and operational SOPs**.

> 🔒 **Zero Hallucination Guarantee**  
If the answer is not present in the indexed documents, OpsMind AI explicitly responds with:  
**“I don’t know. The information is not available in the indexed documents.”**

---

## 🚀 Problem Statement

In many organizations:
- Employees waste time searching through multiple PDFs and policy documents
- Knowledge is siloed across departments
- Traditional AI chatbots hallucinate answers, creating compliance risks

**OpsMind AI solves this by acting as a single, trusted source of truth grounded strictly in verified corporate documents.**

---

## ✨ Key Features

- 📄 **Multi-Document Knowledge Index**
  - HR Policies
  - Refund & Return Policies
  - IT Security Guidelines
  - Operations SOPs

- 🔍 **RAG-Based Answering**
  - Retrieves relevant document chunks before answering

- 🛡️ **Hallucination Guardrail**
  - Responds with “I don’t know” if no document supports the query

- 🧠 **Explainable & Trustworthy**
  - Displays the exact document source for each answer

- 🎨 **Modern UI**
  - Animated, responsive chat interface

---

## 🏗️ System Architecture
User Query
↓
Chat Interface (React)
↓
RAG Service (Retrieval Layer)
↓
Indexed Corporate Documents
↓
Answer + Source Citation


> ⚠️ The UI never calls the LLM directly.  
All queries are routed through the RAG pipeline to ensure grounding.

---

## 🧩 Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

### AI / RAG Logic
- Custom RAG Engine (Prototype)
- Keyword-based retrieval (deterministic)
- Structured document indexing
- Hallucination guardrail

> 🔮 Future-ready for:
> - Vector embeddings
> - MongoDB Atlas Vector Search
> - LLM integration (Gemini / OpenAI)

---

## 📂 Project Structure

opsmind-ai/
├── components/
│ ├── ChatInterface.tsx
│ ├── DocumentUpload.tsx
│ ├── LandingPage.tsx
│ ├── Layout.tsx
│ └── UserGuide.tsx
├── services/
│ ├── ragService.ts
│ └── geminiService.ts
├── types.ts
├── App.tsx
├── index.tsx
├── index.html
├── README.md
└── package.json


---

## 📄 Indexed Documents (Sample Knowledge Base)

| Document | Domain |
|--------|------|
| Refund_and_Return_Policy.pdf | Finance |
| HR_Policies.pdf | Human Resources |
| IT_Security_Guidelines.pdf | IT |
| Operations_SOP.pdf | Operations |

---

## 💬 Example Questions

### ✅ Answerable (From Documents)
- What is the refund policy?
- How many sick leave days are allowed?
- What are the password requirements?
- What is the SLA for high priority tickets?

### ❌ Guardrail Test
- What is the maternity leave policy?
- What is the bonus structure?

➡️ **Response:**  
`I don't know. The information is not available in the indexed documents.`

---

## ▶️ Running the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/opsmind-ai.git
cd opsmind-ai

### 2️⃣ Install Dependencies
npm install

###3️⃣ Start the Development Server
npm run dev

🔐 AI Safety & Trust

❌ No hallucinated answers

❌ No external data sources

❌ No direct LLM calls from UI

✅ Strict document grounding

✅ Source attribution

📈 Future Enhancements

Dynamic PDF ingestion from UI

Vector embeddings & semantic search

Backend API for enterprise deployment

Source highlighting inside documents

Role-based access control

👨‍💻 Team & Contributors

This project was developed as part of an internship at Infotact Solutions by:

Sujal Dolas

Vishesh Sharma

Gowrishankar

Jay Sorani

⭐ Why This Project Matters

OpsMind AI demonstrates:

Real-world RAG system design

Enterprise-focused AI safety

Clean separation of UI and AI logic

Practical applied AI engineering

This is not just a chatbot — it is a foundation for enterprise-grade AI systems.

📜 License

This project is for educational and internship demonstration purposes.