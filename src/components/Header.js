'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { GithubIcon, LinkedInIcon, MoonIcon, SunIcon } from './Icons';
import Logo from './Logo';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import featureFlags from '../config/featureFlags.json';

const CustomLink = ({ href, title, className = '' }) => {
  const router = useRouter();

  return (
    <Link href={href} className={`${className} relative group hover:no-underline`}>
      {title}

      <span
        className={`h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 
      group-hover:w-full transition-[width] ease duration-300
      ${router.asPath === href ? 'w-full' : 'w-0'} dark:bg-light`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const CustomMobileLink = ({ href, title, className = '', toggle }) => {
  const router = useRouter();

  const handleClick = () => {
    toggle();
    router.push(href);
  };

  return (
    <button
      href={href}
      className={`${className} relative group text-light dark:text-dark my-2 hover:no-underline`}
      onClick={handleClick}
    >
      {title}

      <span
        className={`h-[1px] inline-block bg-light absolute left-0 -bottom-0.5 
      group-hover:w-full transition-[width] ease duration-300
      ${router.asPath === href ? 'w-full' : 'w-0'} dark:bg-dark`}
      >
        &nbsp;
      </span>
    </button>
  );
};

const Header = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const navigationLinks = [
    { href: '/', title: 'Home', enabled: featureFlags.navigation.home },
    { href: '/about', title: 'About', enabled: featureFlags.navigation.about },
    { href: '/collection', title: 'Collection', enabled: featureFlags.navigation.collection },
    { href: '/experiments', title: 'Experiments', enabled: featureFlags.navigation.experiments },
    { href: '/three', title: '3D', enabled: featureFlags.navigation.three },
  ];

  return (
    <header
      className="w-full flex items-center justify-between 
    dark:text-light text-lg px-32 py-8 font-medium z-10 lg:px-16 relative md:px-12 sm:px-8 "
    >
      <button className="flex-col justify-center items-center hidden lg:flex" onClick={handleClick}>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm  ${
            isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
          } `}
        ></span>
      </button>

      <div className="w-full flex justify-between items-center lg:hidden">
        <nav>
          {navigationLinks.map(
            (link) =>
              link.enabled && (
                <CustomLink
                  key={link.href}
                  href={link.href}
                  title={link.title}
                  className={link.href === '/' ? 'mr-4' : link.href === '/experiments' ? 'ml-4' : 'mx-4'}
                />
              )
          )}
        </nav>

        <nav className="flex items-center justify-center flex-wrap">
          <motion.a
            href="https://github.com/ashleyyy94"
            target={'_blank'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mr-3"
          >
            <GithubIcon className="w-full h-auto" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/ashley-ong-2816a8105/"
            target={'_blank'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3"
          >
            <LinkedInIcon className="w-full h-auto" />
          </motion.a>
          <motion.a
            href="mailto:ashley_2461994@hotmail.com"
            target={'_blank'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 ml-3"
          >
            <MdEmail className="w-full h-auto" />
          </motion.a>

          <button
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            className={`ml-3 flex items-center justify-center rounded-full p-1
          ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}
          `}
          >
            {mode === 'dark' ? <SunIcon className={'fill-dark'} /> : <MoonIcon className={'fill-dark'} />}
          </button>
        </nav>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
        >
          <nav className="flex flex-col items-center justify-center">
            {navigationLinks.map(
              (link) =>
                link.enabled && (
                  <CustomMobileLink
                    key={link.href}
                    href={link.href}
                    title={link.title}
                    className=""
                    toggle={handleClick}
                  />
                )
            )}
          </nav>

          <nav className="flex items-center justify-center flex-wrap mt-2">
            <motion.a
              href="https://github.com/ashleyyy94"
              target={'_blank'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mr-3 sm:mx-1 bg-light rounded-full dark:bg-dark"
            >
              <GithubIcon className="w-full h-auto" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ashley-ong-2816a8105/"
              target={'_blank'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1"
            >
              <LinkedInIcon className="w-full h-auto" />
            </motion.a>
            <motion.a
              href="mailto:ashley_2461994@hotmail.com"
              target={'_blank'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 ml-3 sm:mx-1 dark:text-dark text-light"
            >
              <MdEmail className="w-full h-auto" />
            </motion.a>

            <button
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              className={`ml-3 flex items-center justify-center rounded-full p-1
          ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}
          `}
            >
              {mode === 'dark' ? <SunIcon className={'fill-dark'} /> : <MoonIcon className={'fill-dark'} />}
            </button>
          </nav>
        </motion.div>
      ) : null}

      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
