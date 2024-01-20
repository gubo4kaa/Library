'use client'
import { SetStateAction, Key, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, FreeMode, Thumbs, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import MainCard from '../MainCard/MainCard';
import styles from './Slider.module.css'

interface ISlider {
	categories: ICategory[];
	services: IServiceInterface[];
}

export default function Slider({categories, services}: ISlider) {
	const [activeIndex, setActiveIndex] = useState(0);

	const handleSlideChange = (swiper: { activeIndex: SetStateAction<number>; }) => {
		setActiveIndex(swiper.activeIndex);
	};

  const handleClick = (key: number) => {
    setActiveIndex(key);
  };

  return (
    <div className={styles.wrapper}>
	<h4>
		Updates this week
	</h4>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        onSlideChange={handleSlideChange}
      >
        {services.map((service, key) => (
          <SwiperSlide key={key}>
				<MainCard service={service} categories={categories}/>
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        {services.map((service, key) => (
          <span
            key={key}
            onClick={() => handleClick(key)}
            className={activeIndex === key ? 'active' : ''}
          >
            {service.name}
          </span>
        ))}
      </div>
    </div>
  );
}