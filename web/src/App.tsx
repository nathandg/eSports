import './styles/main.css';

import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

import logoImg from './assets/Logo.svg';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { GameBanner } from './components/GameBanner';
import axios from 'axios';

interface Game {
   id: string;
   title: string;
   bannerUrl: string;
   _count: {
      ads: number;
   }
}

function App() {

   const [Games, setGames] = useState<Game[]>([]);

   useEffect(() => {

      axios('http://localhost:3000/games').then(response => {
         setGames(response.data);
      })

   }, [])


   return (
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
         <img src={logoImg} alt="logo" />
         <h1 className='text-6xl text-white font-black mt-20'>
            Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui
         </h1>

         <div className="grid grid-cols-6 gap-6 mt-16">

            {Games.map(game => {
               return (
                  <GameBanner key={game.id} title={game.title} anuncios={game._count.ads} url={game.bannerUrl} />
               )
            })}

         </div>

         <Dialog.Root>
            <CreateAdBanner />
            <CreateAdModal />
         </Dialog.Root>


      </div>
   )

}

export default App
