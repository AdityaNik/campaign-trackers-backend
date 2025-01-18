import axios from "axios";
import express from "express";


const strategyrouter = express.Router();

// Your Google Generative AI API Key
const API_KEY = "AIzaSyAJsAiNg0ANu12AqWraZWKGCUa8uZ3_njA"; // Replace with your actual API key
const MODEL_NAME = "models/gemini-1.5-flash"; // Replace with your desired model
const API_URL = `https://generativelanguage.googleapis.com/v1beta2/${MODEL_NAME}:generateText`;

// POST endpoint for generating content
strategyrouter.post("/", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).send({ error: "Prompt is required" });
    }

    try {
        const response = await axios.post(
            API_URL,
            { prompt: { text: prompt } }, // Request body
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`,
                },
            }
        );

        // Send the AI-generated text back to the client
        res.status(200).send({ output: response.data.candidates[0].output });
    } catch (error) {
        console.error("Error generating text:", error.message);
        if (error.response) {
            console.error("Error details:", error.response.data);
        }
        res.status(500).send({ error: "Failed to generate content" });
    }
});

// module.exports = strategyrouter;
export default strategyrouter;
