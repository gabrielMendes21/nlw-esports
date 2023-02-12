import { GameController } from "phosphor-react"
import Modal from 'react-modal'
import { useState } from "react"
import { CheckCircle } from "phosphor-react"
import { Copy } from "phosphor-react"
import { X } from "phosphor-react"

Modal.setAppElement('#__next')

export default function Ad(props) {
    // CModal control
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    return (
        <>
            <div className="p-5 rounded-lg bg-[#2A2634] text-white">
                <span className="text-zinc-400 block">Nome</span>
                <span className="text-white font-bold">{props.userName}</span>

                <span className="text-zinc-400 block">Tempo de jogo</span>
                <span className="text-white font-bold">{props.yearsPlaying} ano(s)</span>

                <span className="text-zinc-400 block">Disponibilidade</span>
                <span className="text-white font-bold">{props.weekDays}</span>

                <span className="text-zinc-400 block">Chamada de áudio?</span>
                <span className="text-white font-bold">{props.useVoiceChannel}</span>

                <button 
                    onClick={handleOpenModal}
                    className="bg-violet-500 w-full rounded-md flex items-center justify-center py-2 gap-2 mt-6 hover:bg-violet-600 transition-colors"
                >
                    <GameController size={20} /> 
                    Conectar
                </button>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    overlayClassName="bg-black/60 inset-0 fixed"
                    className="bg-transparent"
                >
                    <div className='flex w-[80%] md:w-auto p-10 flex-col items-center fixed bg-[#2A2634] text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/25'>
                        <CheckCircle size={48} color="#34d399" weight="bold" />
                        <h1 className="font-black mt-8 text-xl">Let's play!</h1>
                        <p className="text-zinc-400">Agora é só começar a jogar!</p>

                        <span className="mt-5 mb-2">Adicione no discord</span>
                        <div className="bg-zinc-900 rounded py-3 px-10 flex items-center gap-5">
                            <span className="text-zinc-200 text-sm md:text-lg">{props.discord}</span>
                            <Copy onClick={() => {
                                navigator.clipboard.writeText(props.discord)
                                    .then(() => alert("Texto copiado"))
                            }} 
                                size={30} 
                            /> 
                        </div>
                        <X 
                            className="absolute top-5 right-5 cursor-pointer"
                            size={24} 
                            color="#a1a1aa" 
                            onClick={handleCloseModal} 
                        />
                    </div>
                </Modal>
            </div>
        </>
    )
}
