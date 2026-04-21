"use client";

import ButtonNew from "@/components/ButtonNew/ButtonNew";
import { useSubscribeStore } from "@/store/SubscribeStore";
import { useBlurStore } from "@/store/storeBlur";
import Image from "next/image";
import styles from "./Slider.module.css";

const Slider = () => {
  const [, setBlur] = useBlurStore((state) => [state.blur, state.setBlur]);
  const [, setPopapState] = useSubscribeStore((state) => [
    state.popapState,
    state.setPopapState,
  ]);

  return (
    <section className={styles.wrapper} aria-label="Library hero banner">
      <div className={styles.card}>
        <div className={styles.visual} aria-hidden="true">
          <Image
            src="/home-hero-figma.png"
            alt=""
            className={styles.banner}
            priority
            fill
            sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1280px) 100vw, 1120px"
          />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.title}>
            Ultimate resource hub for professionals
          </h2>
          <p className={styles.description}>
            A curated collection of resources for digital creators, updated
            weekly.
          </p>
          <ButtonNew
            type="Primary"
            size="s"
            className={styles.button}
            onClick={() => {
              setBlur(true);
              setPopapState("subscribe");
            }}
          >
            Subscribe for Free
          </ButtonNew>
        </div>
      </div>
    </section>
  );
};

export default Slider;
