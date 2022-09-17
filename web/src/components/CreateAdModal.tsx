import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';
import { Check, GameController } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';

import { Input } from './Form/Input';

interface Game {
   id: string;
   title: string;
}

export function CreateAdModal() {

   const [Games, setGames] = useState<Game[]>([]);
   const [weekDays, setWeekDays] = useState<string[]>([]);
   const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

   useEffect(() => {

      axios('http://localhost:3000/games').then(response => {
         setGames(response.data);
         console.log(response.data);
      })

   }, [])

   const handleCreateAd = async (event: FormEvent) => {

      event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(formData);

      // Falta a validação dos dados

      const body = {

         "name": data.name,
         "yearsPlaying": Number(data.yearsPlaying),
         "discord": data.discord,
         "weekDays": weekDays.map(Number),
         "hoursStart": data.hourStart, 
         "hoursEnd": data.hourEnd,
         "useVoiceChannel": useVoiceChannel,

      }

      console.log(body);

      try {

         axios.post(`http://localhost:3000/games/${data.game}/ads`, body).then(response => {
            console.log(response.data);
         })

      } catch (error) {
         console.log(error)
      }

   }

   return (
      <Dialog.Portal>
         <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
         <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/50'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>


            <form onSubmit={handleCreateAd} className='mt-6 flex flex-col gap-4'>
               <div className='flex flex-col gap-2'>
                  <label className='font-semibold' htmlFor="game">Qual o game?</label>
                  <select
                     name='game'
                     id='game'
                     className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
                     defaultValue=''
                  >
                     <option disabled value=''>Selecione o game que deseja jogar</option>
                     {Games.map(game => {
                        return <option key={game.id} value={game.id}>{game.title}</option>
                     })}
                  </select>
               </div>

               <div className='flex flex-col gap-2'>
                  <label htmlFor="game">Seu nome (ou nickname)</label>
                  <Input name='name' id='name' placeholder='Como te chaman dentro do game?' />
               </div>

               <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                     <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                     <Input
                        name='yearsPlaying' id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO' />
                  </div>
                  <div className='flex flex-col gap-2'>
                     <label htmlFor="discord">Qual o seu Discord?</label>
                     <Input
                        name='discord'
                        id='discord'
                        type="text"
                        placeholder='Usuario#0000' />
                  </div>
               </div>

               <div className='flex gap-6'>
                  <div className='flex flex-col gap-2 '>
                     <label htmlFor="weekDays">Quando costuma jogar?</label>

                     <ToggleGroup.Root
                        type='multiple'
                        className='grid grid-cols-4 gap-2'
                        onValueChange={setWeekDays}

                     >

                        <ToggleGroup.Item
                           value='0'
                           title='Domingo'
                           className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >D</ToggleGroup.Item>

                        <ToggleGroup.Item
                           value='1'
                           title='Segunda'
                           className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >S</ToggleGroup.Item>

                        <ToggleGroup.Item
                           value='2'
                           title='Terça'
                           className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >T</ToggleGroup.Item>

                        <ToggleGroup.Item
                           value='3'
                           title='Quarta'
                           className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >Q</ToggleGroup.Item>

                        <ToggleGroup.Item
                           value='4'
                           title='Quinta'
                           className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >Q</ToggleGroup.Item>

                        <ToggleGroup.Item
                           value='5'
                           title='Sexta'
                           className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >S</ToggleGroup.Item>

                        <ToggleGroup.Item
                           value='6'
                           title='Sabádo'
                           className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >S</ToggleGroup.Item>

                     </ToggleGroup.Root>

                  </div>
                  <div className='flex flex-col gap-2'>
                     <label htmlFor="hoursStart">Qual o horário do dia?</label>
                     <div className='grid grid-cols-2 gap-2 '>
                        <Input type="time" name='hourStart' id="hourStart" placeholder='De' />
                        <Input type="time" name='hourEnd' id="hourEnd" placeholder='Até' />
                     </div>
                  </div>
               </div>

               <label className='mt-2 flex gap-2 text-sm items-center'>
                  <Checkbox.Root
                     className='w-6 h-6 p-1 rounded bg-zinc-900'
                     checked={useVoiceChannel}
                     onCheckedChange={(value) => {
                        if (value) {
                           setUseVoiceChannel(true);
                        } else {
                           setUseVoiceChannel(false);
                        }
                     }}
                  >
                     <Checkbox.Indicator>
                        <Check className='w-4 h-4 text-emerald-700' />
                     </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar ao chat de voz
               </label>

               <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.DialogClose
                     className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
                  >
                     Cancelar
                  </Dialog.DialogClose>
                  <button
                     type='submit'
                     className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                  >
                     <GameController size={24} />
                     Encontar duo
                  </button>

               </footer>

            </form>

         </Dialog.Content>
      </Dialog.Portal>
   )
}