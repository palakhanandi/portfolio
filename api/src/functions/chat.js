import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
  defaultQuery: {
    "api-version": process.env.AZURE_OPENAI_API_VERSION,
  },
  defaultHeaders: {
    "api-key": process.env.AZURE_OPENAI_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  try {
    const { message, systemPrompt } = req.body;

    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return res.status(200).json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
}
