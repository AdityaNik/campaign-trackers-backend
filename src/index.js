import express from 'express';
import cors from 'cors';
import strategyrouter from './strategy.js';
import onboardingrouter from './OnbordingRoutes.js';
// require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express()
app.use(cors());
app.use(express.json())

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        msg: "hii there"
    })
})

app.use('/onboard', onboardingrouter);
app.use("/generate", strategyrouter);


app.listen(3000, () => {
    console.log(`Backend started on port ${port}`);
})