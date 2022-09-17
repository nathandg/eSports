interface propsBanner {
     title: string;
     anuncios: number;
     url: string;
}

export function GameBanner({title, anuncios: anuncios, url} : propsBanner) {

     return (
          <a href='' className='relative rounded-lg overflow-hidden'>
               <img src={url} alt="" />
               <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
                    <strong className='font-bold text-white block'>{title}</strong>
                    <span className='text-zinc-300 text-sm block'>{anuncios} Anúncios</span>
               </div>
          </a>

     )
}