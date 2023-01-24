import { PrismaClient } from '@prisma/client'

// From /utils
import { convertHourStringToMinutes } from '../../../../utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from '../../../../utils/convert-minutes-to-hour-string'

const prisma = new PrismaClient({
    log: ['query']
})

export default async function handler(req,res) {
    const { query: { gameId } } = req

    // Create Ad
    if (req.method === "POST") {

        const body = req.body

        const newAd = await prisma.ad.create({
            data: {
                gameId: gameId,
                userName: body.userName,
                yearsPlaying: body.yearsPlaying,
                discord: body.discord,
                weekDays: body.weekDays.join(','),
                hourStart: convertHourStringToMinutes(body.hourStart),
                hourEnd: convertHourStringToMinutes(body.hourEnd),
                useVoiceChannel: body.useVoiceChannel
            }
        })

        res.status(201).json("GG, anúncio criado com sucesso!")
    } else if (req.method === "GET") {
        const ads = await prisma.ad.findMany({
            select: {
                id: true,
                userName: true,
                weekDays: true,
                useVoiceChannel: true,
                yearsPlaying: true,
                hourStart: true,
                hourEnd: true,
                discord: true
            },
            where: {
                gameId: gameId  
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return res.json(ads.map(ad => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(','),
                hourStart: convertMinutesToHourString(ad.hourStart),
                hourEnd: convertMinutesToHourString(ad.hourEnd)
            }
        }))
    }
}