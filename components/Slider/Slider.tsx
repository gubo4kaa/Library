'use client'
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import MainCard from '../MainCard/MainCard';
interface ISlider {
	categories: ICategory[];
	services: IServiceInterface[];
}

export default function Slider({categories, services}: ISlider) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	useEffect(() => {
		console.log('thumbsSwiper');
		console.log(thumbsSwiper);
	}, [thumbsSwiper])
  return (
	<div>
		<Swiper
			modules={[Navigation,FreeMode, Pagination, A11y, Thumbs]}
			spaceBetween={16}
			slidesPerView={3}
			navigation
			thumbs={{ swiper: thumbsSwiper }}
			onSwiper={(swiper) => console.log(swiper)}
			onSlideChange={() => console.log('slide change')}
		>
			{services.map((service, key) => (
				<div key={key}>
					<SwiperSlide>
						<MainCard service={service} categories={categories}/>
					</SwiperSlide>
				</div>
			))}
    	</Swiper>
		<Swiper
			// onSwiper={setThumbsSwiper}
			spaceBetween={10}
			slidesPerView={10}
			freeMode={true}
			watchSlidesProgress={true}
			modules={[Navigation,FreeMode, Pagination, A11y, Thumbs]}
			className="mySwiper"
		>
			{services.map((service, key) => 
				(
					<div key={key}>
						<SwiperSlide>
							{service.name}
						</SwiperSlide>
					</div>
				))
			}
	  </Swiper>
		
	</div>
	)
}