import Head from 'next/head'
import Image from 'next/image'
import Ad from "../components/GameAd"
import convertNumbersToWeekDays from "../utils/convert-numbers-to-week-days"
import { PrismaClient } from ".prisma/client"
import { convertMinutesToHourString } from "../utils/convert-minutes-to-hour-string"

const prisma = new PrismaClient()

export default function GameAds({ ads, game }) {
    return (
        <>
            <Head>
                <title>{`NLW eSports - ${game.name}`}</title>
                <meta name="description" content="Encontre o seu duo para jogar aqui!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className="flex flex-col items-center mt-14 w-screen">
                <Image
                    priority
                    src='/logo-nlw.svg'
                    width={224}
                    height={224}
                    alt=""
                    className="w-20 md:w-32 lg:w-48"
                    quality={100}
                />
                <div className="justify-self-start w-[80%] md:w-[60%]">
                    <div className="border-violet-500 border-[5px] w-full h-40 object-cover mt-8 rounded-lg flex items-center justify-center">
                        <h1 className="text-2xl md:text-4xl text-white font-black">{game.name}</h1>
                    </div>
                    {
                        ads.length === 0 ?
                        '' :
                        <p className="text-zinc-400 mt-4">
                            Conecte-se e começe a jogar!
                        </p>
                    }
                    <div className="overflow-x-auto flex overflow-y-hidden gap-4 w-full mt-2">
                        {
                            ads.length === 0 ?
                            <span className="text-white/60 font-bold text-xl lg:text-4xl mt-14">Este game ainda não possui nenhum anúncio :(</span> :
                            ads.map(ad => {
                                return (
                                    <Ad
                                        key={ad.id}
                                        userName={ad.userName}
                                        yearsPlaying={ad.yearsPlaying}
                                        weekDays={convertNumbersToWeekDays(ad.weekDays)}
                                        useVoiceChannel={ad.useVoiceChannel ? 'Sim' : 'Não'}
                                        discord={ad.discord}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </main> 
        </>
    )
}

export async function getStaticPaths() {
    const games = await prisma.game.findMany()
    
    const paths = games.map(game => {
        return {
            params: {
                gameId: game.id
            }
        }
    })

    return {
        paths,
        fallback: blocking
    }
}


export async function getStaticProps({ params }) { 
    let ads, game

    await Promise.all([
        await prisma.ad.findMany({
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
                gameId: {
                    equals: params.gameId
                }
            }
        }),
        await prisma.game.findMany()
    ])
        .then(responses => {
            ads = responses[0].map(ad => {
                return {
                    ...ad,
                    weekDays: ad.weekDays.split(','),
                    hourStart: convertMinutesToHourString(ad.hourStart),
                    hourEnd: convertMinutesToHourString(ad.hourEnd)
                }
            })
            game = responses[1].filter(game => game.id === params.gameId)
        })
        .catch(err => console.log(err))

    return {
        props: {
            ads, 
            game: game[0]
        },
        revalidate: 30
    }
}
