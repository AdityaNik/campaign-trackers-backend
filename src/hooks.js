import axios from "axios";
import { Router } from "express";
import { PrismaClient } from '@prisma/client';
import { configDotenv } from 'dotenv';


const hookrouter = Router();
const prisma = new PrismaClient();

hookrouter.post('/', async (req, res) => {
    let {id_b} = req.body
    let reddit_hook = ""
    let twitter_hook = ""
    let whatsapp_hook = ""

    const business = await prisma.business.findUnique({
      where: {
        id: id_b,
      },
    });
  
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const prompt = `Develop a hook or msg which is catchy and for marketing the product to user for whatsapp , twitter and reddit based on
    the business name ${business.businessName} they have a product called ${business.productName} which is from ${business.industry} which targets people of age group ${business.targetAge}
    and marketing is focused on ${business.targetLocation}.The description of the company is ${business.description}
    
    Display data as
    Whatsapp : Data
    Twitter : Data
    Reddit : Data

    Keep the response to the point and short not long and descriptive for one or two lines not more than that
    `;

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
        // res.json(response.data); 
        console.log("Response data:", response.data);

        let text = response.data.candidates[0].content.parts[0].text

        // Split the text into lines
        if (text) {
            // Use regex to extract content for each platform
            let whatsappMatch = text.match(/\*\*Whatsapp:\*\* (.*?)(?=\n)/);
            let twitterMatch = text.match(/\*\*Twitter:\*\* (.*?)(?=\n)/);
            let redditMatch = text.match(/\*\*Reddit:\*\* (.*?)(?=\n)/);
          
            whatsapp_hook = whatsappMatch ? whatsappMatch[1].trim() : "";
            twitter_hook = twitterMatch ? twitterMatch[1].trim() : "";
            reddit_hook = redditMatch ? redditMatch[1].trim() : "";
        }

        //Database logic to store the hooks
        const result = await prisma.campaign.create({
            data: {
                businessId: id_b,
                whatsappString:whatsapp_hook,
                twitterString:twitter_hook,
                reditString:reddit_hook,
            }
        })

        res.json({result});

    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  });
  
  export default hookrouter;