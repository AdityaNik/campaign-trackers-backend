import { Router } from "express";
import axios from "axios";

const Adcreationrouter = Router();

Adcreationrouter.post('/gen_template', async (req, res) => {

    const data = {
        "name" : "My Template",
        "width": 1000,
        "height": 900,
        "available_modifications": [
            {
                "name": "background",
                "type": "image",
            },
            {
                "name": "title",
                "type": "text", 
            }
        ]
    }

    axios.post('https://api.bannerbear.com/v2/templates', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_KEY_ADV}`  // Use the API key for authorization
        }
      })
        .then(response => {
          console.log('Response:', response.data);
          res.json(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
          res.json({ error: 'Internal Server Error' });
        });
});


Adcreationrouter.post('/', async (req, res) => {
    const {backgroundImage, titleText } = req.body;
  
    const data = {
        "template": "4KnlWBbKv0GGDOQGgm",
        "modifications": [
          {
            "name": "message",
            "text": titleText,
            "color": null,
            "background": null
          },
          {
            "name": "face",
            "image_url": backgroundImage
          }
        ],
        "webhook_url": null,
        "transparent": false,
        "metadata": null
    };
  
    try {

      const response = await axios.post('https://api.bannerbear.com/v2/images', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_KEY_ADV}` 
        }
      });
  

      res.json(response.data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  Adcreationrouter.get('/image/:uid', async (req, res) => {
    const { uid } = req.params;
  
    try {
      const response = await axios.get(`https://api.bannerbear.com/v2/images/${uid}`, {
        headers: {
          'Authorization': `Bearer ${process.env.API_KEY_ADV}` 
        }
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });  // Handle error
    }
  });



  export default Adcreationrouter;