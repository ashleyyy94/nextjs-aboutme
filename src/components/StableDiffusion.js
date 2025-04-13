import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { Container, Row } from 'react-bootstrap';
import cat from '../../public/images/SD/cat.png';
import salmon from '../../public/images/SD/salmon.png';
import tree from '../../public/images/SD/tree.png';

const StableDiffusion = () => {
  return (
    <section>
      <Container>
        <h1 className="underline text-4xl my-2 text-dark dark:text-light lg:text-3xl md:text-2xl sm:text-xl">
          Stable Diffusion
        </h1>
        <Row>
          <Grid container columns={3} spacing={4} justify="center">
            <Grid size={1}>
              <Image src={salmon} alt="" unoptimized></Image>
            </Grid>
            <Grid size={1}>
              <Image src={cat} alt="" unoptimized></Image>
            </Grid>
            <Grid size={1}>
              <Image src={tree} alt="" unoptimized></Image>
            </Grid>
          </Grid>
        </Row>
      </Container>
    </section>
  );
};

export default StableDiffusion;
