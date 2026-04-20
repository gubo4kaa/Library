"use client";

import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./ImagesComponent.module.css";


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    service: IServiceInterface
}

export default function ImagesComponent({service}:Props) {
  const [loaded, setLoaded] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);

  const imageName = service.images?.[1] ?? service.images?.[0] ?? "default.png";
  const useDefaultImage = imageName === "default.png";
  const src = useDefaultImage
    ? "/default/default.png"
    : `${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/${imageName}`;
  const previewSrc =
    useDefaultImage || !imageName
      ? undefined
      : `${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/preview-${imageName}.webp`;

  return (
    <div className={styles.wrapper}>  
        <div className={styles.frame} data-loaded={loaded}>
          <div className={styles.placeholder} aria-hidden="true" />

          {previewSrc && !previewFailed && (
            <Image
              key={previewSrc}
              alt=""
              aria-hidden="true"
              src={previewSrc}
              fill
              sizes="100vw"
              loading="eager"
              decoding="async"
              onLoad={() => setPreviewLoaded(true)}
              onError={() => setPreviewFailed(true)}
              className={styles.previewImg}
              data-loaded={previewLoaded}
            />
          )}

          <Image
            key={src}
            alt={service.name}
            src={src}
            fill
            sizes="(max-width: 1200px) 100vw, 1142px"
            priority={false}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            className={styles.img}
          />
        </div>
    </div>
  )
}
