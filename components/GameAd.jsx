import { GameController } from "phosphor-react"

export default function Ad(props) {
    return (
        <>
            <div className="p-5 rounded-lg bg-[#2A2634] text-white">
                <span className="text-zinc-400 block">Nome</span>
                <span className="text-white font-bold">{props.userName}</span>

                <span className="text-zinc-400 block">Tempo de jogo</span>
                <span className="text-white font-bold">{props.yearsPlaying} anos</span>

                <span className="text-zinc-400 block">Disponibilidade</span>
                <span className="text-white font-bold">{props.weekDays}</span>

                <span className="text-zinc-400 block">Chamada de áudio?</span>
                <span className="text-white font-bold">{props.useVoiceChannel}</span>

                <button className="bg-violet-500 w-full rounded-md flex items-center justify-center py-2 gap-2 mt-6 hover:bg-violet-600 transition-colors">
                    <GameController size={20} /> 
                    Conectar
                </button>
            </div>
        </>
    )
}