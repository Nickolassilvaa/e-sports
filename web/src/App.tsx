import { useState, useEffect } from 'react'

import { CreateAdBanner } from './components/CreateAdBanner'
import { GameBanner } from './components/GameBanner'
import { CreateAdModal } from './components/CreateAdModal'

import * as Dialog from '@radix-ui/react-dialog'
import logo from './assets/Logo.svg'
import axios from 'axios'

import './styles/main.css'


interface Game {
  id: string;
  titles: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
        setGames(response.data);
      })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logo} />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {
          games.map(game => {
            return (
              <GameBanner
                key={game.id}
                title={game.titles}
                bannerUrl={game.bannerUrl}
                adsCound={game._count.ads} />
            )
          })
        }
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>

    </div>
  )
}

export default App
