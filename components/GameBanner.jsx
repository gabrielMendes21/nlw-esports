import Link from "next/link"
import Image from "next/image"
  
  export function GameBanner(props) {
    return (
      <Link href={`/${props.id}`} className="relative rounded-lg overflow-hidden min-w-[100px]">
        <Image src={ props.bannerUrl } alt="" width={250} height={250} quality={100} />
  
        <div className='w-full pt-1 pb-1 px-2 bg-game-gradient absolute bottom-0 rounded-lg'>
          <strong className="font-bold block text-white text-[0.9rem]">{ props.name }</strong>
          <span className="text-sm text-white block text-[0.7rem]">{ props.ads } anúncio(s)</span>
        </div>
      </Link>
    )
  }