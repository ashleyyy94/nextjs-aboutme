import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Banner from '../../public/images/svgs/banner.svg';
import 'animate.css';
import { useState, useEffect } from 'react';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import TransitionEffect from '@/components/TransitionEffect';

export default function Home() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(200 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ['Web Developer', 'UI/UX Designer', 'Technologist'];
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  });

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(200);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <Head>
        <title>Ashley</title>
        <meta name="description" content="Ashley's homepage" />
      </Head>
      <TransitionEffect />
      <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
        <Layout className="pt-0 md:pt-16 sm:pt-8">
          <div className="flex items-center justify-between w-full lg:flex-col">
            <div className="w-1/2 px-4 md:w-full md:py-4">
              <Image
                src={Banner}
                alt="Banner"
                className="w-full h-auto lg:hidden md:inline-block md:w-full"
                priority
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              50vw"
              />
            </div>
            <div className="w-1/2 animate__animated animate__fadeIn banner flex flex-col items-center self-center lg:w-full lg:text-center">
              <h1
                className="text-6xl inline-block w-full text-dark dark:text-light font-bold capitalize dark:text-ligh
              xl:text-5xl lg:text-center lg:text-6xl md:text-5xl sm:text-3xl"
              >
                {`Hi! I'm Ashley,`} <br />
                <span className="txt-rotate" data-rotate='[ "Web Developer", "UI/UX Designer", "Technologist" ]'>
                  <span className="wrap">{text}</span>
                </span>
              </h1>
              <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
                I&apos;m a Frontend Web Developer interested in working with latest technologies on challenging
                projects. <br />
                <br />I am quietly confident, naturally curious, and always enjoy a good technical problem to solve. In
                my free time, I like to play chess, video games, and learn new languages on Duolingo{' '}
              </p>
              <div className="flex items-center self-start mt-2 lg:self-center">
                <Link
                  href="https://www.linkedin.com/in/ashley-ong-2816a8105/"
                  target={'_blank'}
                  className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold
                  hover:bg-light hover:text-dark
                  border-2 border-solid border-transparent hover:border-dark

                  dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light
                  md:p-2 md:px-4 md:text-base"
                >
                  Let’s Connect <ArrowRightCircle size={25} style={{ marginLeft: '10px' }} />
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
