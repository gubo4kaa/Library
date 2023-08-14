"use client"
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import styles from './VideoGrid.module.css';
import cn from 'classnames'

import './swiperCustom/swiper.css';
import 'swiper/css/navigation';
import './swiperCustom/pagination.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y, Grid } from 'swiper/modules';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function VideoGrid({className}:Props) {
  return (
    <div className={styles.wrapper}>
        <h4>New experience and features</h4>
        <div className={styles.grid}>
            <VideoCard className={styles.mainVideo} src='/video/main.mp4' title='Live Preview' p='Browse resource websites without leaving the library, it`s fast and secure.'></VideoCard>
            <VideoCard className={styles.submitVideo} src='/video/submit.mp4' title='Share your resource' p='Want to share your creation with the world? Feel free to send it to us!'></VideoCard>
            <VideoCard className={styles.sliderVideo} src='/video/slider.mp4' title='Weekly collection updates' p='We replenish our collection with new resources every week.'></VideoCard>
            <VideoCard className={styles.categoryVideo} src='/video/category.mp4' title='New categories' p='We have updated the categories and made them more valuable and full.'></VideoCard>
        </div>
        <Swiper
            modules={[Autoplay, Navigation, Pagination, Grid]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
            width={null}
            pagination={{ clickable: true }}
            
            className={styles.swiperWrapper}
            breakpoints={
                {
                   696: {
                      slidesPerView: 2
                   }
                }
             }
        >
            <SwiperSlide className={styles.swiperSlide}>
                <VideoCard className={styles.mainVideo} src='/video/main.mp4' title='Live Preview' p='Browse resource websites without leaving the library, it`s fast and secure.'></VideoCard>
            </SwiperSlide>
            <SwiperSlide className={cn(styles.swiperSlide, styles.slideTwo)}>
                <VideoCard className={styles.submitVideo} src='/video/submit.mp4' title='Share your resource' p='Want to share your creation with the world? Feel free to send it to us!'></VideoCard>
                <VideoCard className={styles.sliderVideo} src='/video/slider.mp4' title='Weekly collection updates' p='We replenish our collection with new resources every week.'></VideoCard>
            </SwiperSlide>
            <SwiperSlide className={cn(styles.swiperSlide)}>
                <VideoCard className={styles.categoryVideo} src='/video/category.mp4' title='New categories' p='We have updated the categories and made them more valuable and full.'></VideoCard>
            </SwiperSlide>
        </Swiper>
    </div>
);
}

