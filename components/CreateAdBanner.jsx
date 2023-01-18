import { MagnifyingGlassPlus } from 'phosphor-react'
import { CreateAdModal } from './CreateAdModal'
import Modal from 'react-modal'
import { useState } from 'react'

Modal.setAppElement('#__next')

// Component function
export function CreateAdBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <div className='bg-gradient self-stretch rounded-lg mt-8 pt-1'>
      <div className="bg-[#2A2634] px-8 py-6 rounded-b-[7px] flex flex-col md:flex-row gap-5 justify-between items-center">
        <div>
          <strong className="text-xl text-white font-black block mb-1">Não encontrou seu duo?</strong>
          <span className='text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
        </div>

        {/* Modal trigger */}
        <button className="px-3 py-3 text-[0.8rem] bg-violet-500 rounded text-white font-semibold hover:bg-violet-600 transition-colors flex gap-1 items-center mt-3" onClick={handleOpenModal}>
        <MagnifyingGlassPlus size={30} /> 
        Publicar anúncio
        </button>

        <Modal 
          overlayClassName="bg-black/60 inset-0 fixed"
          className='bg-transparent'
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
        >
          <CreateAdModal closeModalFunction={handleCloseModal} />
        </Modal>
      </div>
    </div>
  )
}