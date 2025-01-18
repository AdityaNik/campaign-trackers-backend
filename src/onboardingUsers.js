import express from 'express';
import { PrismaClient } from '@prisma/client';
import { configDotenv } from 'dotenv';

configDotenv();

const prisma = new PrismaClient();

const router = express.Router();

router.post('/', async (req, res) => {

    const {businessId, name, age, phoneNumber, adType, location, platform, clickTime, conversionRate, ctr, status } = req.body;

    const result = await prisma.campaignUser.create({
        data: {
            businessId,
            name,
            age,
            phoneNumber,
            adType,
            location,
            platform,
            clickTime,
            conversionRate,
            ctr,
            status
        }
    })

    res.json({
        msg: 'Onboarding created successfully',
        data: result
    })
});

router.get('/getUsers/:businessId', async (req, res) => {
    const { businessId } = req.params;

    const result = await prisma.campaignUser.findMany({
        where: {
            businessId: parseInt(businessId)
        }
    })

    res.json({
        msg: 'Onboarding created successfully',
        data: result
    })
})


export default router;