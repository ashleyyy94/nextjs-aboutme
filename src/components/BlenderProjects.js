import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { Container, Row } from 'react-bootstrap';
import chess from '../../public/gifs/chess.gif';
import donut from '../../public/gifs/donut.gif';
import pokeball from '../../public/gifs/pokeball.gif';

const BlenderProjects = () => {
  return (
    <section className="project" id="project">
      <Container>
        <h1 className="underline text-4xl my-2 text-dark dark:text-light lg:text-3xl md:text-2xl sm:text-xl">
          Blender Projects
        </h1>
        <Row>
          <Grid container columns={3} spacing={4} justify="center">
            <Grid size={1}>
              <Image src={donut} alt="" />
            </Grid>
            <Grid size={1}>
              <Image src={pokeball} alt="" />
            </Grid>
            <Grid size={1}>
              <Image src={chess} alt="" width="400" height="400" />
            </Grid>
          </Grid>
        </Row>
      </Container>
    </section>
  );
};

export default BlenderProjects;
