import { useState } from 'react';
import styles from './experiments.module.scss';
import { Container, Row } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import pokeball from '../../public/gifs/pokeball.gif';
import donut from '../../public/gifs/donut.gif';
import chess from '../../public/gifs/chess.gif';
import salmon from '../../public/images/SD/salmon.png';
import cat from '../../public/images/SD/cat.png';
import tree from '../../public/images/SD/tree.png';
import Image from 'next/image';
import TransitionEffect from '@/components/TransitionEffect';
import Head from 'next/head';

function Experiments() {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <>
      <Head>
        <title>Ashley | Playground</title>
        <meta name="description" content="Playground"></meta>
      </Head>
      <TransitionEffect />
      <section>
        <Container>
          <h1 className="underline text-4xl my-2 text-dark dark:text-light lg:text-3xl md:text-2xl sm:text-xl">
            Stable Diffusion
          </h1>
          <Row>
            <Grid container columns={3} spacing={4} justify="center">
              <Grid item xs={1}>
                <Image src={salmon} alt=""></Image>
              </Grid>
              <Grid item xs={1}>
                <Image src={cat} alt=""></Image>
              </Grid>
              <Grid item xs={1}>
                <Image src={tree} alt=""></Image>
              </Grid>
            </Grid>
          </Row>
        </Container>
      </section>
      <section className="project" id="project">
        <Container>
          <h1 className="underline text-4xl my-2 text-dark dark:text-light lg:text-3xl md:text-2xl sm:text-xl">
            Blender Projects
          </h1>
          <Row>
            <Grid container columns={3} spacing={4} justify="center">
              <Grid item xs={1}>
                <Image src={donut} alt=""></Image>
              </Grid>
              <Grid item xs={1}>
                <Image src={pokeball} alt=""></Image>
              </Grid>
              <Grid item xs={1}>
                <Image src={chess} alt="" width="400" height="400"></Image>
              </Grid>
            </Grid>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <h1 className="underline text-4xl my-2 text-dark dark:text-light lg:text-3xl md:text-2xl sm:text-xl">
            CSS Projects
          </h1>
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
              <main className={styles.fireplace__spark}></main>
              <div className={`${styles.blur} ${styles.fix}`}>
                <div className={styles.fireplace__flame}></div>
              </div>
              <div className={styles.fireplace__light}></div>
            </div>
            {isHovering && <h1 className="text-4xl text-dark dark:text-light">Boom!</h1>}
          </div>
        </Container>
      </section>
    </>
  );
}

export default Experiments;
