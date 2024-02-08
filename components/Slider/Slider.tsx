'use client'
import { SetStateAction, Key, useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import MainCard from '../MainCard/MainCard';
import styles from './Slider.module.css';
import cn from 'classnames';
import { SwiperButtonNext } from './sliderComponent/sliderButton/SliderButton';

interface ISlider {
	categories: ICategory[];
	services: IServiceInterface[];
}

export default function Slider({categories, services}: ISlider) {
	const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (key: number) => {
    setActiveIndex(key);
  };

  return (
    <div className={styles.wrapper}>
      <h4>
        Updates this week
      </h4>
      <Swiper
        spaceBetween={16}
        slidesPerView={3}
      >
        {services.map((service, key) => (
          <SwiperSlide key={key}>
				    <MainCard service={service} categories={categories}/>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.wrapperPagination}>  
        <div className={styles.wrapperTabs}>
          {services.map((service, key) => (
            <span
              key={key}
              className={cn(styles.linkToSlide, {
                [styles.activeLink]: activeIndex == key
              })}
            >
              {
                service.name
              }
            </span>
          ))}
        </div>
        <div className={styles.wrapperArrows}>
              
            asdf
        </div>
      </div>
    </div>
  );
}