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
      <main className="max-w-[1344px] w-[80%] md:w-[60%] mx-auto mt-14 flex flex-col items-center">
        <Image 
          priority
          src='/logo-nlw.svg'
          width={224}
          height={224} 
          alt="" 
          className="md:w-72 lg:w-96" 
          quality={100}
        />

        <h1 className="hidden md:block md:text-[3rem] text-center text-white font-black mt-14">
          Seu <span className="text-violet-500">&lt;</span>duo<span className="text-violet-500">/&gt;</span> está aqui
        </h1>
        <h1 className="md:hidden text-2xl w-full text-left text-white font-black mt-14">Encontre seu duo</h1>
        <p className="md:hidden text-zinc-400 text-left w-full">Selecione o game que deseja jogar...</p>

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
  const response = await axios(`${process.env.WEB_URL}/api/games`)
  const games = await response.data

  return {
    props: {
      games
    }
  }
}