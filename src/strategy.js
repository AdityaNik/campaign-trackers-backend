import axios from 'axios';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const strategyrouter = Router();



strategyrouter.get('/', async (req, res) => {

    const text = ""

    prisma.business.findUnique({
        where: {
            id: 2
        }
    }).then(business => {
        text = business.name + ", Product: " + business.targetAudience.product;
        console.log(text);})
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });  // Send error response
        });
    
    const data = {
      contents: [{
        parts: [{ text: text }]
      }]
    };
  
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBzRisNmv2lm0nw1fj4Kml_t-2V_KIQtn0";
  
    try {
      const response = await axios.post(url, data, config);
      res.json(response.data);  // Send the response data back to the client
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });  // Send error response
    }
  });

  export default strategyrouter;