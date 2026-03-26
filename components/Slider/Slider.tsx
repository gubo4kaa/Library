import Image from "next/image";
import Link from "next/link";

import bannerDesktop from "./Frame1362789696.png";
import bannerMobile from "./FrameS.png";
import bannerTablet from "./Framesm.png";
import styles from "./Slider.module.css";

const Slider = () => {
  return (
    <section className={styles.wrapper} aria-label="Uiscore banner">
      <div className={styles.desktopTabletCard}>
        <div className={styles.copy}>
          <h2 className={styles.title}>High-end design resources from Uiscore</h2>
          <p className={styles.description}>
            Create, enhance, and build faster with our premium library of design
            assets for digital creators.
          </p>
          <Link
            href="https://uiscore.io"
            target="_blank"
            rel="noreferrer"
            className={styles.button}
          >
            Visit Uiscore
          </Link>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <Image
            src={bannerDesktop}
            alt=""
            className={`${styles.banner} ${styles.desktopBanner}`}
            priority
            sizes="(max-width: 1023px) 0px, 671px"
          />
          <Image
            src={bannerTablet}
            alt=""
            className={`${styles.banner} ${styles.tabletBanner}`}
            priority
            sizes="(max-width: 767px) 0px, (max-width: 1023px) 255px, 0px"
          />
        </div>
      </div>

      <div className={styles.mobileCard}>
        <Image
          src={bannerMobile}
          alt=""
          className={styles.mobileBanner}
          priority
          sizes="(max-width: 767px) calc(100vw - 48px), 0px"
          aria-hidden="true"
        />

        <div className={styles.mobileOverlay}>
          <h2 className={styles.mobileTitle}>
            High-end design resources from Uiscore
          </h2>
          <p className={styles.mobileDescription}>
            Create, enhance, and build faster with our premium library of design
            assets for digital creators.
          </p>
          <Link
            href="https://uiscore.io"
            target="_blank"
            rel="noreferrer"
            className={`${styles.button} ${styles.mobileButton}`}
          >
            Visit Uiscore
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Slider;
