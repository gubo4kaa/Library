"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./MainCard.module.css";
interface Props {
  alt: string;
  eager?: boolean;
  previewSrc?: string;
  src: string;
}
export default function MainCardImage({
  alt,
  eager = false,
  previewSrc,
  src,
}: Props) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  useEffect(() => {
    setLoaded(false);
    setPreviewLoaded(false);
    setPreviewFailed(false);
    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);
  return (
    <div className={styles.imageFrame} data-loaded={loaded}>
      {" "}
      <div className={styles.imagePlaceholder} aria-hidden="true" />{" "}
      {previewSrc && !previewFailed && (
        <img
          alt=""
          aria-hidden="true"
          src={previewSrc}
          width={37}
          height={32}
          loading="eager"
          decoding="async"
          onLoad={() => setPreviewLoaded(true)}
          onError={() => setPreviewFailed(true)}
          className={styles.previewImg}
          data-loaded={previewLoaded}
        />
      )}{" "}
      <img
        ref={imageRef}
        alt={alt}
        src={src}
        width={370}
        height={320}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={styles.img}
      />{" "}
    </div>
  );
}
