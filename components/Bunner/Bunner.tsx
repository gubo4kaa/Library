import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Bunner.module.css";
import cn from "classnames";
import ButtonNew from "../ButtonNew/ButtonNew";
import Image from "next/image";
import ButtonBunner from "./buttonBunner/buttonBunner";
import Link from "next/link";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function Bunner({ className }: Props) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <img className={styles.img__mb} src="/bunner/bilbord-mb3.png" alt="" />
      <div className={cn(styles.main)}>
        <h1 className="">Download Free iPhone 16 Pro Mockup</h1>
        <p>Actual device mockups with excellent quality for free!</p>
        {/* <ButtonBunner/> */}
        <Link href={"https://www.figma.com/community/file/1417516691208022438/iphone-16-pro-free-mockups"}>
          <ButtonNew
            size="es"
          >
            Download for Free
          </ButtonNew>
        </Link>
      </div>
      <img className={styles.img} src="/bunner/bilbord.png" alt="" />
    </div>
  );
}
