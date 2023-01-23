import { useState, useEffect } from 'react'
import axios from 'axios'
import { Check, GameController } from 'phosphor-react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import * as Checkbox from '@radix-ui/react-checkbox'

// Component function
export function CreateAdModal(props) {
  const [ games, setGames ] = useState([])
  const [ weekDays, setWeekDays ] = useState([])
  const [ useVoiceChannel, setUseVoiceChannel ] = useState(false)

  function fetchGamesAPI() {
    axios(`../api/games`)
      .then(response => setGames(response.data))
  }

  useEffect(fetchGamesAPI, [])
  
  async function handleCreatAd(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    try {
      await axios.post(`../api/games/${data.game}/ads`, {
        userName: data.userName,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })
        .then(response => alert(`${response.data}`))
    } catch(err) {
      console.error(err)
      alert("Erro ao criar anúncio :( Tente novamente mais tarde")
    }
  }

  return (
    // Modal
    <div className='fixed bg-[#2A2634] py-7 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/25'>
      <h2 className="text-white font-black text-xl lg:text-2xl">
        Publique um anúncio
      </h2>
      
      {/* FORM */}
      <form onSubmit={handleCreatAd} className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="game" className="font-semibold text-sm">Qual o game?</label>
          <select 
            required
            id="game" 
            name="game"
            className="py-3 px-4 rounded text-sm bg-zinc-900" defaultValue="">
            <option value="" disabled className="text-sm">Selecione o game que deseja jogar</option>
            {
              games.map(game => {
                return <option key={game.id} value={game.id}>{game.name}</option>
              })
            }
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold text-sm">Seu nome (ou nickname)</label>
          <input
            required
            className="text-sm bg-zinc-900 py-3 px-4 rounded placeholder:text-zinc-500" 
            placeholder="Como te chamam dentro do game?" 
            id="name" 
            name="userName"
          />
        </div>
      
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="yearsPlaying" className="font-semibold text-sm">Joga há quantos anos?</label>
            <input
              required
              className="text-sm bg-zinc-900 py-3 px-4 rounded placeholder:text-zinc-500" 
              placeholder="Tudo bem ser zero" 
              id="yearsPlaying" 
              name="yearsPlaying"
              pattern='[0-9]+'
            />
          </div>
          <div className="flex flex-col gap-2" >
            <label htmlFor="discord" className="font-semibold text-sm">Qual o seu Discord?</label>
            <input
              className="text-sm bg-zinc-900 py-3 px-4 rounded placeholder:text-zinc-500" 
              placeholder="Usuario#0000" 
              id="discord" 
              name="discord"
              required
              pattern='.+#[0-9]{4}'
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="weekDays" className="font-semibold text-sm">Quando costuma jogar?</label>
            <ToggleGroup.Root 
              aria-required="true"
              type="multiple" 
              className="grid grid-cols-4 gap-2"
              onValueChange={ setWeekDays }
            >
              <ToggleGroup.Item 
                value="0" 
                className={`py-2 px-3 rounded text-sm ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                title="Domingo"
              >
                D
              </ToggleGroup.Item>

              <ToggleGroup.Item 
                value="1" 
                className={`py-2 px-3 rounded text-sm ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                title="Segunda"
              >
                S
              </ToggleGroup.Item>

              <ToggleGroup.Item 
                value="2" 
                className={`py-2 px-3 rounded text-sm ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                title="Terça"
              >
                T
              </ToggleGroup.Item>

              <ToggleGroup.Item 
                value="3" 
                className={`py-2 px-3 rounded text-sm ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                title="Quarta"
              >
                Q
              </ToggleGroup.Item>

              <ToggleGroup.Item 
                value="4" 
                className={`py-2 px-3 rounded text-sm ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                title="Quinta"
              >
                Q
              </ToggleGroup.Item>

              <ToggleGroup.Item 
                value="5" 
                className={`py-2 px-3 rounded text-sm ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                title="Sexta"
              >
                S
              </ToggleGroup.Item>

              <ToggleGroup.Item 
                value="6" 
                className={`py-2 px-3 rounded text-sm ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                title="Sábado"
              >
                S
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="hourStart" className="font-semibold text-sm">Qual o horário do dia?</label>
            <div className="grid grid-cols-2 gap-2">
            <input
              required
              className="text-sm bg-zinc-900 py-3 px-4 rounded placeholder:text-zinc-500" 
              placeholder="De" 
              id="hourStart" 
              type="time" 
              name="hourStart"
            />
            <input
              required
              className="text-sm bg-zinc-900 py-3 px-4 rounded placeholder:text-zinc-500" 
              placeholder="Até" 
              id="hourEnd" 
              name="hourEnd"
              type="time" 
            />
            </div>
          </div>
        </div>
        <label className="flex items-center gap-2 mt-2 text-sm">
        <Checkbox.Root  
          checked={useVoiceChannel}
          onCheckedChange={(checked) => {
            if (checked == true) {
              setUseVoiceChannel(true)
            } else {
              setUseVoiceChannel(false)
            }
          }}
          className="w-6 h-6 rounded bg-zinc-900 p-1"
        >
          <Checkbox.Indicator>
            <Check className='w-4 h-4 text-emerald-400' />
          </Checkbox.Indicator>
        </Checkbox.Root>
          Costumo me conectar ao chat de voz
        </label>
        <footer className="mt-4 flex justify-end gap-4">
          <button 
            onClick={props.closeModalFunction} 
            className="h-12 px-5 rounded-md bg-zinc-500 hover:bg-zinc-600 transition font-semibold"
            type='reset'
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="font-semibold flex justify-end items-center px-3 gap-3 rounded-lg bg-violet-500 hover:bg-violet-600 transition"
          >
            <GameController size={20} />
            Encontrar duo
          </button>
        </footer>
      </form>
    </div>
  )
}