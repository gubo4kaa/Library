import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./MainCard.module.css";
import MiniCard from "../MiniCard/MiniCard";
import MainCardImage from "./MainCardImage";

interface Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  service: IServiceInterface;
  categories: ICategory[];
  eager?: boolean;
}

export default function MainCard({
  categories,
  service,
  eager = false,
}: Props) {
  const code = encodeURIComponent(`${service.name}`);
  return (
    <>
      <div className={styles.wrapper}>
        <Link href={`/services/${code}`}>
          <MainCardImage
            alt="not image"
            eager={eager}
            previewSrc={
              service.images[0] == "default.png"
                ? undefined
                : `${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/preview-${service.images[0]}.webp`
            }
            src={
              service.images[0] == "default.png"
                ? "/default/default.png"
                : `${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/${service.images[0]}`
            }
          />
          <MiniCard child category={categories} service={service} />
          <svg
            className={styles.arrow}
            width="22"
            height="23"
            viewBox="0 0 22 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Arrow Right">
              <path
                id="Vector 190"
                d="M18.3327 11.1911L12.1452 17.6077M18.3327 11.1911L12.1452 4.77441M18.3327 11.1911L3.66602 11.1911"
                stroke="#909DB3"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </Link>
      </div>
    </>
  );
}
