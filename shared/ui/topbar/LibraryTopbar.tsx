"use client";

import BurgerButton from "@/components/BurgerButton/BurgerButton";
import ButtonNew from "@/components/ButtonNew/ButtonNew";
import Search from "@/components/Search/Search";
import { useSubscribeStore } from "@/store/SubscribeStore";
import { useBlurStore } from "@/store/storeBlur";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./LibraryTopbar.module.css";

interface Props {
  category: ICategory[];
  className?: string;
}

export default function LibraryTopbar({ category, className }: Props) {
  const [, setBlur] = useBlurStore((state) => [state.blur, state.setBlur]);
  const [, setPopapState] = useSubscribeStore((state) => [
    state.popapState,
    state.setPopapState,
  ]);

  return (
    <header className={cn(styles.wrapper, className)}>
      <div className={styles.brand}>
        <BurgerButton />
        <Link href="/" className={styles.logoLink} aria-label="Library home">
          <Image
            src="/main-logo-svg.svg"
            width={111}
            height={32}
            alt="Library"
            className={styles.logo}
            priority
          />
        </Link>
      </div>

      <div className={styles.actions}>
        <div className={styles.search}>
          <Search category={category} />
        </div>
        <ButtonNew
          type="Primary"
          size="s"
          className={styles.subscribeButton}
          onClick={() => {
            setBlur(true);
            setPopapState("subscribe");
          }}
        >
          Subscribe
        </ButtonNew>
      </div>
    </header>
  );
}
