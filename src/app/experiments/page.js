'use client';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import pokeball from '../../../public/gifs/pokeball.gif';
import donut from '../../../public/gifs/donut.gif';
import chess from '../../../public/gifs/chess.gif';
import salmon from '../../../public/images/SD/salmon.png';
import cat from '../../../public/images/SD/cat.png';
import tree from '../../../public/images/SD/tree.png';
import Image from 'next/image';
import TransitionEffect from '@/components/TransitionEffect';
import styles from './experiments.module.scss';
import BlenderProjects from '@/components/BlenderProjects';
import StableDiffusion from '@/components/StableDiffusion';

export default function Experiments() {
  const FireplaceComponent = () => {
    'use client';
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
      setIsHovering(true);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    return (
      <div className={styles.fireContainer}>
        <h2 className="text-3xl text-dark dark:text-light">Hover me!</h2>
        <div className={styles.fireplace} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <div className={styles.blur}>
            <div className={styles.fireplace__flame_big}></div>
          </div>
          <section className={styles.fireplace__log}></section>
          <section className={styles.fireplace__log}></section>
          <section className={styles.fireplace__log}></section>
          <section className={styles.fireplace__log}></section>
          <section className={styles.fireplace__log}></section>
          <section className={styles.fireplace__log}></section>
          <section className={styles.fireplace__log}></section>
          <main className={styles.fireplace__spark}></main>
          <main className={styles.fireplace__spark}></main>
          <main className={styles.fireplace__spark}></main>
          <div className={`${styles.blur} ${styles.fix}`}>
            <div className={styles.fireplace__flame}></div>
          </div>
          <div className={styles.fireplace__light}></div>
        </div>
        {isHovering && <h1 className="text-4xl text-dark dark:text-light">Boom!</h1>}
      </div>
    );
  };

  return (
    <>
      <TransitionEffect />
      <StableDiffusion />
      <BlenderProjects />
      <section>
        <Container>
          <h1 className="underline text-4xl my-2 text-dark dark:text-light lg:text-3xl md:text-2xl sm:text-xl">
            CSS Projects
          </h1>
          <FireplaceComponent />
        </Container>
      </section>
    </>
  );
}
