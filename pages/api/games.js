// PrismaClient
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query']
})

export default async function handler(req,res) {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })

    res.status(200).json(games)
}