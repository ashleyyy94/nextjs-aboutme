'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
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
        className={`h-px inline-block bg-dark absolute left-0 -bottom-0.5 
      group-hover:w-full transition-[width] ease duration-300
      ${router.asPath === href ? 'w-full' : 'w-0'} dark:bg-light`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const CustomDropdownLink = ({ title, items, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isAnySubmenuActive = items.some((item) => router.asPath === item.href);

  return (
    <div className={`${className} relative inline-block`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group hover:no-underline flex items-center text-inherit cursor-pointer outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0"
      >
        {title}
        <svg
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>

        <span
          className={`h-px inline-block bg-dark absolute left-0 -bottom-0.5 
        group-hover:w-full transition-[width] ease duration-300
        ${isAnySubmenuActive ? 'w-full' : 'w-0'} dark:bg-light`}
        >
          &nbsp;
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-48 bg-light dark:bg-dark border border-dark/10 dark:border-light/10 rounded-lg shadow-lg backdrop-blur-sm z-50"
          >
            <div className="py-2">
              {items.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 text-sm cursor-pointer outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 transition-colors duration-200 hover:bg-dark/5 dark:hover:bg-light/5 ${
                    router.asPath === item.href
                      ? 'bg-dark/10 dark:bg-light/10 text-dark dark:text-light font-medium'
                      : 'text-dark/80 dark:text-light/80 hover:text-dark dark:hover:text-light'
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
      className={`${className} relative group text-light dark:text-dark my-2 hover:no-underline w-full flex items-center justify-center text-center cursor-pointer`}
      onClick={handleClick}
    >
      {title}

      <span
        className={`h-px inline-block bg-light absolute left-0 -bottom-0.5 
      group-hover:w-full transition-[width] ease duration-300
      ${router.asPath === href ? 'w-full' : 'w-0'} dark:bg-dark`}
      >
        &nbsp;
      </span>
    </button>
  );
};

const CustomMobileDropdownLink = ({ title, items, className = '', toggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const isAnySubmenuActive = items.some((item) => router.asPath === item.href);

  const handleItemClick = (href) => {
    setIsOpen(false);
    toggle();
    router.push(href);
  };

  return (
    <div className={`${className} my-2`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group text-light dark:text-dark hover:no-underline flex items-center justify-center w-full text-center cursor-pointer"
      >
        {title}
        <svg
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>

        <span
          className={`h-px inline-block bg-light absolute left-0 -bottom-0.5 
        group-hover:w-full transition-[width] ease duration-300
        ${isAnySubmenuActive ? 'w-full' : 'w-0'} dark:bg-dark`}
        >
          &nbsp;
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-1">
              {items.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleItemClick(item.href)}
                  className={`block w-full text-center py-1 text-sm cursor-pointer outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 transition-colors duration-200 ${
                    router.asPath === item.href
                      ? 'text-light dark:text-dark font-semibold'
                      : 'text-light/80 dark:text-dark/80 hover:text-light dark:hover:text-dark'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const navigationLinks = [
    { href: '/', title: 'Home', enabled: featureFlags.navigation.home, type: 'link' },
    { href: '/about', title: 'About', enabled: featureFlags.navigation.about, type: 'link' },
    {
      title: 'Projects',
      enabled: featureFlags.navigation.collection && featureFlags.navigation.experiments,
      type: 'dropdown',
      items: [
        { href: '/collection', title: 'Collection', enabled: featureFlags.navigation.collection },
        { href: '/experiments', title: 'Experiments', enabled: featureFlags.navigation.experiments },
        { href: '/three', title: '3D Projects', enabled: featureFlags.navigation.three },
        { href: '/toto', title: 'Toto', enabled: featureFlags.navigation.toto },
      ].filter((item) => item.enabled),
    },
    { href: '/guestbook', title: 'Guestbook', enabled: featureFlags.navigation.guestbook, type: 'link' },
  ];

  return (
    <header
      className="w-full flex items-center justify-between 
    dark:text-light text-lg px-32 py-8 font-medium z-10 lg:px-16 relative md:px-12 sm:px-8 "
    >
      <button className="flex-col justify-center items-center hidden lg:flex" onClick={handleClick}>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-xs ${
            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-xs my-0.5 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-xs  ${
            isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
          } `}
        ></span>
      </button>

      <div className="w-full flex justify-between items-center lg:hidden">
        <nav className="flex items-center">
          {navigationLinks.map((link) => {
            if (!link.enabled) return null;

            if (link.type === 'dropdown') {
              return <CustomDropdownLink key={link.title} title={link.title} items={link.items} className="mx-4" />;
            }

            return (
              <CustomLink
                key={link.href}
                href={link.href}
                title={link.title}
                className={link.href === '/' ? 'mr-4' : link.href === '/guestbook' ? 'ml-4' : 'mx-4'}
              />
            );
          })}
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
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
        >
          <nav className="flex flex-col items-center justify-center">
            {navigationLinks.map((link) => {
              if (!link.enabled) return null;

              if (link.type === 'dropdown') {
                return (
                  <CustomMobileDropdownLink
                    key={link.title}
                    title={link.title}
                    items={link.items}
                    toggle={handleClick}
                  />
                );
              }

              return (
                <CustomMobileLink
                  key={link.href}
                  href={link.href}
                  title={link.title}
                  className={link.href === '/guestbook' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}
                  toggle={handleClick}
                />
              );
            })}
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
