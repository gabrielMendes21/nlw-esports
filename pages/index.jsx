import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { GameBanner } from '../components/GameBanner'
import { CreateAdBanner } from '../components/CreateAdBanner'

export default function Home(props) {
  return (
    <>
      <Head>
        <title>NLW eSports</title>
        <meta name="description" content="Encontre o seu duo para jogar aqui!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="max-w-[1344px] w-[60%] mx-auto mt-14 flex flex-col items-center">
        <Image 
          priority
          src='/logo-nlw.svg'
          width={224}
          height={224} 
          alt="" 
          className="w-56 md:w-72 lg:w-96" 
          quality={100}
        />

        <h1 className="text-[2rem] md:text-[3rem] text-center text-white font-black mt-14">
          Seu <span className="bg-gradient text-transparent bg-clip-text">duo</span> está aqui
        </h1>

        {/* ALL GAMES */}
        <div className="overflow-x-auto flex gap-2 w-full mt-5">
          {
            props.games.map((game) => {
              return <GameBanner name={game.name} bannerUrl={game.bannerUrl} id={game.id} ads={game._count.ads} key={game.id} />
            })
          }
        </div>
        
        <CreateAdBanner />
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.WEB_URL}/api/games`)
  const games = await response.json()

  return {
    props: {
      games
    }
  }
}