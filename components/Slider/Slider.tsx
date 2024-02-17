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
import swiper from 'swiper';
import { A11y, Grid, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface ISlider {
	categories: ICategory[];
	services: IServiceInterface[];
}

export default function Slider({categories, services}: ISlider) {
  const swiper = useSwiper();
  return (
    <div className={styles.wrapper}>
      <h4>
        Updates this week
      </h4>
      <Swiper
         modules={[Navigation, Pagination, Scrollbar, A11y, Grid]}
         spaceBetween={16}
         slidesPerView={3}
         grid={{
            rows: 1,
          }}
         pagination={ 
            { el: '.swiper-pagination',
               clickable: true }}
         navigation= {{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
            disabledClass: `${styles.button_disable}`
            }}
         className={styles.swiper}
      >
        {services.map((service, key) => (
          <SwiperSlide key={key}>
				    <MainCard service={service} categories={categories}/>
          </SwiperSlide>
        ))}
      <div className={styles.wrapperPagination}>  
        <div className={styles.wrapperTabs}>
          {services.map((service, key) => (
            <span
              key={key}
              className={cn(styles.linkToSlide, {
                [styles.activeLink]: key == 0
              })}
            >
              {
                service.name
              }
            </span>
          ))}
        </div>
        <div className={cn(styles.wrapperArrows)}>
            <span className={cn('swiper-button-prev', styles.arrow, styles.buttonPrew)}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Arrow Left">
                  <path id="Vector 190" d="M3.66658 10.9997L9.85409 17.4163M3.66658 10.9997L9.85409 4.58301M3.66658 10.9997L18.3333 10.9997" stroke="#6E7A90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
            </span>
            <span className={cn('swiper-button-next', styles.arrow, styles.buttonNext)}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Arrow Right">
                  <path id="Vector 190" d="M18.3334 10.9997L12.1459 17.4163M18.3334 10.9997L12.1459 4.58301M18.3334 10.9997L3.66675 10.9997" stroke="#6E7A90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
            </span>
        </div>
      </div>
      </Swiper>
    </div>
  );
}