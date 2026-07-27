# My Azure AI Business Card 

A personal portfolio site with an AI that knows who you are.

This isn't just a static portfolio. Anyone who visits your URL can chat with an AI assistant trained on your background, your projects, skills, and interests. Built with Azure OpenAI and deployed free on Azure Static Web Apps.

---

## What it does

Your page has three things:

A hero section with your name, role, and skills. A projects showcase of what you've built. And a live AI chat where visitors can ask anything about you and get real answers.

The AI only talks about you. Ask it something unrelated and it redirects back. That's prompt engineering doing its job.

---

## Stack

- Azure OpenAI (GPT-5-mini)
- Azure Functions (serverless backend)
- Azure Static Web Apps (free hosting)
- Vanilla HTML, CSS, JavaScript

---

## Personalise it

Open `app.js` and find the `systemPrompt` variable at the top. Replace it with your own details — your name, university, skills, projects, interests. That's it. The AI becomes you.

---

## Run it locally

You need Node.js and the Azure Static Web Apps CLI.

```
npm install -g @azure/static-web-apps-cli
cd api && npm install && cd ..
```

Create a `.env` file in the root:

```
AZURE_OPENAI_KEY=your_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=your_deployment_name
AZURE_OPENAI_API_VERSION=2024-12-01-preview
```

Then run:

```
swa start --app-location . --api-location api
```

Open `http://localhost:4280`

---

## Deploy to Azure

1. Push this repo to GitHub
2. Go to portal.azure.com → Create Azure Static Web App
3. Connect your GitHub repo
4. Add your environment variables in Azure Portal → Configuration
5. Done — live URL in 2 minutes

---

## Get your Azure OpenAI key

1. Go to portal.azure.com
2. Open your Azure OpenAI resource
3. Go to Keys and Endpoint
4. Copy Key 1 and your endpoint into the environment variables

---
