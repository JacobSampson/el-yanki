import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

export interface LayoutProps {
  children?: React.ReactNode;
}

const Body = styled.div`
  margin-left: 25rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Footer = ({ ...props }) => {
  return (
    <footer {...props}>
      <Link href="/updates?lang=en">Updates</Link>
    </footer>
  );
};

const StyledFooter = styled(Footer)`
  background-color: #9fb8ad90;
  /* background-color: #499b3955; */
  padding: 3rem;
  margin-top: auto;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;

    li {
      margin: 0.5rem 0;
    }
  }

  a {
    transition: all 0.25s;
    opacity: 1;
    color: black;
    text-decoration: none;
  }

  a:hover {
    opacity: 0.4;
  }
`;

export const SITE_TITLE = 'El Yanki en Buenos Aires';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>El Yanki en Buenos Aires</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            SITE_TITLE
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Body>
        {children}
        <StyledFooter />
      </Body>
    </>
  );
};

export default Layout;
