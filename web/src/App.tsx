import './styles/main.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';

import logoImg from './assets/Logo.svg';
import Carrousel from './Carrousel';
import FormDialog from './components/CreateAd';
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
         <img src={logoImg} alt="logo" className='mx-auto w-60 sm:w-80 ' />
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

         <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden  '>

            <div className='bg-[#2A2634] px-8 py-6 flex flex-col gap-5 justify-between items-center sm:flex-row '>
               <div>
                  <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
                  <span className='text-zinc-400'>Publique um anúncia para encontrar novos players!</span>
               </div>
               <FormDialog />
            </div>
         </div>


      </div>

   )

}

export default App
