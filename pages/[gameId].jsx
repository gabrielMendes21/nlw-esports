import axios from "axios"
import Head from 'next/head'
import Image from 'next/image'
import Ad from "../components/GameAd"

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
                    <p className="text-zinc-400 mt-4">Conecte-se e começe a jogar!</p>

                    <div className="overflow-x-auto flex gap-4 w-full mt-2">
                        {
                            ads.map(ad => {
                                return (
                                    <Ad
                                        key={ad.id}
                                        userName={ad.userName}
                                        yearsPlaying={ad.yearsPlaying}
                                        weekDays={ad.weekDays}
                                        useVoiceChannel={ad.useVoiceChannel ? 'Sim' : 'Não'}
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
    const response = await axios(`${process.env.WEB_URL}/api/games`)
    const games = await response.data
    
    const paths = games.map(game => {
        return {
            params: {
                gameId: game.id
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) { 
    let ads, game

    await Promise.all([
        await axios(`${process.env.WEB_URL}/api/games/${params.gameId}/ads`),
        await axios(`${process.env.WEB_URL}/api/games`)
    ])
        .then(responses => {
            ads = responses[0].data
            game = responses[1].data.filter(game => game.id === params.gameId)
        })
        .catch(err => console.log(err))

    return {
        props: {
            ads, 
            game: game[0]
        }
    }
}