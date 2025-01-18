import axios from "axios";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";

configDotenv();

const prisma = new PrismaClient();

const strategyrouter = Router();

strategyrouter.get("/", async (req, res) => {
  try {
    // Wait for the Prisma query to finish before proceeding
    const business = await prisma.business.findUnique({
      where: {
        id: 2,
      },
    });

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    // Construct the prompt once the business data is available
    const prompt = `${business.name}, Product: ${business.targetAudience} Develop strategy for this business`;

    console.log(prompt);

    const data = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBzRisNmv2lm0nw1fj4Kml_t-2V_KIQtn0";

    try {
      const response = await axios.post(url, data, config);
      res.json(response.data); // Send the response data back to the client
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" }); // Send error response
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default strategyrouter;
