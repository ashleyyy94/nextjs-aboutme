import Layout from './Layout';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      className="w-full border-t-2 border-solid border-dark
    font-medium text-lg dark:text-light dark:border-light sm:text-base"
    >
      <Layout className="py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
        <div className="flex items-center lg:py-2">
          <Link
            href="https://www.linkedin.com/in/ashley-ong-2816a8105/"
            target={'_blank'}
            className="underline underline-offset-2"
          >
            Say Hello
          </Link>
        </div>
      </Layout>
    </footer>
  );
};

export default Footer;
