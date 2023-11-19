"use client"
import { motion } from "framer-motion";
import styles from './Preloader.module.css';


const colors = ["#2489FF", "#0DCB86", "#FFC149", "#FF555F"];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const dotVariants = {
  initial: {},
  animate: {
    height: [10, 30, 10],
    transition: {
      repeat: Infinity
    }
  }
};

const Preloader = ({ count = 4 }) => {
  return (
    // <motion.div
    //   variants={containerVariants}
    //   initial="initial"
    //   animate="animate"
    //   style={{
    //     display: "flex",
    //     gap: 4,
    //     height: 30,
    //     alignItems: "center"
    //   }}
    // >
    //   {Array(count)
    //     .fill(null)
    //     .map((_, index) => {
    //       return (
    //         <motion.div
    //           key={index}
    //           variants={dotVariants}
    //           style={{
    //             height: 10,
    //             width: 10,
    //             backgroundColor: colors[index % colors.length],
    //             borderRadius: 20
    //           }}
    //         />
    //       );
    //     })}
    // </motion.div>
    <div className={styles.wrapper}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Preloader;
