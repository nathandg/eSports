import './styles/main.css';

import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';

import logoImg from './assets/Logo.svg';
import Carrousel from './Carrousel';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { GameBanner } from './components/GameBanner';


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

      <div className='max-w-6xl h-[100vh] mx-auto flex flex-col justify-around px-5'>
         <img src={logoImg} alt="logo" className='mx-auto w-60 sm:w-80 '/>
         <h1 className='text-3xl text-white font-black text-center sm:text-6xl'>
            Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui
         </h1>

         <Carrousel>
            {
               Games.map(game => {
                  return (
                     <SwiperSlide key={game.id}>
                        <GameBanner title={game.title} anuncios={game._count.ads} url={game.bannerUrl} />
                     </SwiperSlide>
                  )
               })
            }
         </Carrousel>


         <Dialog.Root>
            <CreateAdBanner />
            <CreateAdModal />
         </Dialog.Root>


      </div>

   )

}

export default App
