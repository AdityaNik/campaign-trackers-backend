import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//   id                   Int                   @id @default(autoincrement())
//   name                 String
//   description          String?
//   industry             String?
//   websiteUrl           String?
//   targetLocation       String?
//   targetAudience       Json? // JSON for flexibility
//   budget               Float
//   createdAt            DateTime              @default(now())
//   campaigns            Campaign[]
//   strategies           Strategy[]
//   analytics            Analytics[]
//   customerEngagements  CustomerEngagement[]
//   platformIntegrations PlatformIntegration[]


// generate random data for test
// const randomdata = [
//     {
//         id: 1,
//         name: 'Onboarding 1',
//         description: 'Onboarding 1 description',
//         industry: 'Onboarding 1 industry',
//         websiteUrl: 'Onboarding 1 websiteUrl',
//         targetLocation: 'Onboarding 1 targetLocation',
//         targetAudience: 'Onboarding 1 targetAudience',
//         budget: 100
//     },
// ] 


const router = express.Router();

router.post('/', async (req, res) => {
    
    const {id, name, description, industry, websiteUrl, targetLocation, targetAge, budget } = req.body;

    const result = await prisma.business.create({
        data: {
            id,
            name,
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
