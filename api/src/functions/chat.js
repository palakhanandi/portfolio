const { app } = require("@azure/functions");
const { AzureOpenAI } = require("openai");

app.http("chat", {
    methods: ["POST"],
    authLevel: "anonymous",

    handler: async (request, context) => {

        try {

            const body = await request.json();

            const { message, systemPrompt } = body;

            if (!message) {

                return {
                    status: 400,
                    jsonBody: {
                        reply: "Message cannot be empty."
                    }
                };

            }

            const client = new AzureOpenAI({

                endpoint: process.env.AZURE_OPENAI_ENDPOINT,

                apiKey: process.env.AZURE_OPENAI_KEY,

                apiVersion: process.env.AZURE_OPENAI_API_VERSION,

                deployment: process.env.AZURE_OPENAI_DEPLOYMENT

            });

            const completion = await client.chat.completions.create({

                model: process.env.AZURE_OPENAI_DEPLOYMENT,

                messages: [

                    {
                        role: "system",
                        content: systemPrompt
                    },

                    {
                        role: "user",
                        content: message
                    }

                ],

                temperature: 0.7,

                max_tokens: 400

            });

            return {

                status: 200,

                jsonBody: {

                    reply: completion.choices[0].message.content

                }

            };

        }

        catch (err) {

            context.error(err);

            return {

                status: 500,

                jsonBody: {

                    reply: "Azure OpenAI Error",

                    error: err.message

                }

            };

        }

    }

});