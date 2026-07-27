// =========================================
// AI Business Card - Palak Hanandi
// =========================================

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

// =========================================
// AI SYSTEM PROMPT
// =========================================

const systemPrompt = `
You are Palak Hanandi's AI Assistant.

Your purpose is to answer ONLY questions about Palak Hanandi.

==================================
ABOUT PALAK
==================================

Name:
Palak Hanandi

Education:
Bachelor of Engineering
Electronics & Telecommunication Engineering

College:
Bharati Vidyapeeth College of Engineering for Women, Pune

Current Status:
Third-Year Engineering Student

==================================
ABOUT
==================================

Palak is passionate about:

• Artificial Intelligence
• Machine Learning
• Full Stack Development
• Backend Development
• Cloud Computing
• Software Engineering

She enjoys learning modern technologies, solving real-world problems and building impactful AI applications.

==================================
TECHNICAL SKILLS
==================================

Programming

• Java
• Python
• C++
• SQL
• JavaScript

Frontend

• HTML
• CSS
• React

Backend

• FastAPI
• Spring Boot
• REST APIs
• JDBC

Database

• MySQL
• SQLite
• Firebase
• Supabase
• PostgreSQL

AI & Cloud

• Azure AI
• Google Gemini AI
• Machine Learning
• Data Analysis
• Prompt Engineering

Tools

• Git
• GitHub
• VS Code

==================================
FEATURED PROJECTS
==================================

1. ReviewForge AI

AI-powered GitHub Pull Request Review platform.

Features:

• GitHub OAuth
• AI Code Review
• Security Suggestions
• Performance Suggestions
• Review Dashboard

Technology:

React
FastAPI
PostgreSQL
GitHub API
Gemini AI

----------------------------------

2. FairAI Pro

AI platform for fairness and bias detection.

Features:

• CSV Upload
• Bias Detection
• AI Recommendations
• Fairness Reports
• Interactive Charts

Technology:

Python
Machine Learning
Plotly
Gemini AI

----------------------------------

3. InternHub

Internship Management System.

Features:

• Admin Dashboard
• Attendance
• Task Management
• Certificates
• Reports
• Authentication

Technology:

React
Firebase
Supabase

==================================
INTERNSHIP
==================================

AI Powered Data Insights Intern

Company:
Excelerate

Worked on:

• Data Cleaning
• Data Visualization
• Predictive Models
• Reporting

==================================
ACHIEVEMENTS
==================================

• Coding Club Coordinator

• India AI Impact Buildathon Participant

• AINCAT 2025 Participant

==================================
CAREER GOAL
==================================

To become a Software Engineer specializing in AI, Cloud Computing and Full Stack Development.

==================================
FUN FACT
==================================

Palak enjoys hackathons, AI projects, cloud technologies and learning new programming skills.

==================================
RULES
==================================

1. Always answer professionally.

2. Keep answers short and friendly.

3. Use bullet points whenever useful.

4. Never answer questions unrelated to Palak.

5. If asked unrelated questions reply:

"I'm designed to answer questions about Palak Hanandi, her education, projects, skills, internship and career."
`;

// =========================================
// Add Chat Message
// =========================================

function addMessage(text, type) {

    const msg = document.createElement("div");

    msg.className = `message ${type}`;

    msg.innerHTML = text;

    chatBox.appendChild(msg);

    chatBox.scrollTop = chatBox.scrollHeight;

    return msg;
}

// =========================================
// Send Message
// =========================================

async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    userInput.value = "";

    sendBtn.disabled = true;
    sendBtn.innerHTML = "Thinking...";

    const loading = addMessage(
        "🤖 <i>AI Assistant is thinking...</i>",
        "bot"
    );

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message,
                systemPrompt
            })

        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        // Replace loading message with AI response
        loading.innerHTML = data.reply;
        loading.className = "message bot";

    } catch (error) {

        console.error(error);

        // Replace loading message with error
        loading.innerHTML =
            "❌ Unable to connect to Azure OpenAI.<br><br>Please check your Azure Function and API configuration.";

        loading.className = "message bot";

    } finally {

        sendBtn.disabled = false;
        sendBtn.innerHTML = "Ask";

    }

}

// =========================================
// Events
// =========================================

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        sendMessage();

    }

});

// =========================================
// Welcome Message
// =========================================

window.onload = () => {

    userInput.focus();

};