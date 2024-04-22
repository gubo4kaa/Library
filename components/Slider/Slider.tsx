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
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Grid]}
        spaceBetween={16}
        slidesPerView={1}
        autoplay-delay="2500"
        grid={{
          rows: 1,
        }}
         pagination={
            {   el: '.swiper-pagination',
                clickable: true }}
         navigation= {{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
            disabledClass: `${styles.button_disable}`
            }}
          breakpoints={
            {
              696: {
                slidesPerView: 2
              },
              1200: {
                slidesPerView: 3
              }
            }
          }
         className={styles.swiper}
      >
        <div className={styles.headerWrapper}>
          <h4>
            Updates this week
          </h4>
          <div className={cn(styles.wrapperArrows)}>
            <span className={cn('swiper-button-prev', styles.arrow, styles.buttonPrew)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33342 10.0003L8.95842 15.8337M3.33342 10.0003L8.95842 4.16699M3.33342 10.0003L16.6667 10.0003" stroke="#6E7A90" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span className={cn('swiper-button-next', styles.arrow, styles.buttonNext)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6666 10.0003L11.0416 15.8337M16.6666 10.0003L11.0416 4.16699M16.6666 10.0003L3.33325 10.0003" stroke="#6E7A90" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div> 
        </div>
      <div>
        {services.map((service, key) => (
          <SwiperSlide key={key}>
				    <MainCard service={service} categories={categories}/>
          </SwiperSlide>
        ))}
      </div>
      <div className={cn('swiper-pagination', styles.pagination)}></div>
      </Swiper>
    </div>
  );
}