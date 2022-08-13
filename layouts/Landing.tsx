import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import PageHeader from '../components/PageHeader';
import useLocalization, { plural, ucc } from '../lib/client/hooks/useLocalization';
import PrismicService from '../lib/core/services/prismic';
import { Report } from '../lib/core/models/report';
import { Language } from '../lib/core/types';
import { useLanguageContext } from '../lib/client/contexts/LanguageContext';
import Waves from '../components/Waves';

export interface LayoutProps {
  reports?: Report[];
  children?: React.ReactNode;
}

const Body = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  min-height: 100vh;
`;

const StyledPageHeader = styled(PageHeader)`
  width: 100%;
  z-index: 1000;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const ReportDisclaimer = styled.ul`
  box-shadow: 1rem 0.5rem 0px #00000024;
  background-color: #001e32;
  text-align: left;
  padding: 3rem;
  list-style: none;
  margin: 0;
  border-top-right-radius: 100rem;

  p {
    margin: 0.5rem;
    opacity: 0.5;
  }

  @media (max-width: ${({ theme }) => theme.screen.xsmall}) {
    order: 1;
  }
`;

const PageLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 3rem 5rem;
  text-align: right;
  justify-content: center;
  display: flex;
  flex-direction: column;

  li {
    margin: 0.5rem 0;
  }

  a {
    transition: all 0.25s;
    opacity: 1;
    text-decoration: none;
  }

  a:hover {
    opacity: 0.4;
  }
`;

const Footer = ({ ...props }) => {
  const { language } = useLanguageContext();
  const l = useLocalization();

  return (
    <footer {...props}>
      <ReportDisclaimer>
        <li>
          {l('reportDisclaimer')
            .split('\n')
            .map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </li>
      </ReportDisclaimer>
      <PageLinks>
        <li>
          <Link href={{ pathname: '/', query: { lang: language } }}>{l('home', ucc)}</Link>
        </li>
        <li>
          <Link href={{ pathname: '/updates', query: { lang: language } }}>
            {l('update', ucc, plural)}
          </Link>
        </li>
      </PageLinks>
    </footer>
  );
};

const StyledFooter = styled(Footer)`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};

  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${({ theme }) => theme.screen.xsmall}) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: none;
  }
`;

export const SITE_TITLE = 'El Yanki en Buenos Aires';

export const Layout: React.FC<LayoutProps> = ({ reports, children, ...props }) => {
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
        <StyledPageHeader />
        {children}
        <Waves colors={['#0A3161', '#6CACE4']} top>
          <StyledFooter reports={reports || []} />
        </Waves>
      </Body>
    </>
  );
};

export default Layout;
