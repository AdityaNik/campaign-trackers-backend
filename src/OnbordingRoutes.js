import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

router.post('/', async (req, res) => {
    
    const {id, companyName, businessName, description, industry, websiteUrl, targetLocation, targetAge, budget } = req.body;

    const result = await prisma.business.create({
        data: {
            id,
            companyName,
            businessName,
            description,
            industry,
            websiteUrl,
            targetLocation,
            targetAge,
            budget
        }
    })

    res.json({
        msg: 'Onboarding created successfully',
        data: result
    })
})


export default router;
