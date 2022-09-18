import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper';
import { Swiper } from 'swiper/react';

interface propsCarrousel {
   children: React.ReactNode;
}

export default function Carrousel({ children }: propsCarrousel) {
   return (
      <div>
         <Swiper
            slidesPerView={3}
            autoplay={{
               delay: 1000,
               disableOnInteraction: false,
            }}
            navigation={true}
            breakpoints={{
               640: {
                 slidesPerView: 3,
                 spaceBetween: 20,
               },
               768: {
                 slidesPerView: 4,
                 spaceBetween: 40,
               },
               1024: {
                 slidesPerView: 6,
                 spaceBetween: 10,
               },
             }}
            modules={[Navigation]}
            className="mySwiper"
         >
            {children}
         </Swiper>
      </div>
   );
}
