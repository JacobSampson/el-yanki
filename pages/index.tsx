import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';

import ReportOverview from '../components/ReportOverview';
import LanguageToggle from '../components/LanguageToggle';
import Waves from '../components/Waves';
import PrismicService from '../lib/core/services/prismic';
import { Language } from '../lib/core/types';
import { Report } from '../lib/core/models/report';
import Profile from '../components/Profile';
import Quote from '../components/Quote';
import useLocalization, { plural, ucc } from '../lib/client/hooks/useLocalization';
import { PrismicImage } from '../lib/core/models/prismic/image';
import { useEffect, useState } from 'react';
import useEmail from '../lib/client/hooks/useEmail';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;

  & > * {
    width: 100%;
  }
`;

const StyledLanguageToggle = styled(LanguageToggle)`
  position: absolute;
  left: 0;
  top: 12rem;
  width: fit-content;
  transform: rotate(90deg) translateY(3rem);
  z-index: 100 !important;

  @media (max-width: ${({ theme }) => theme.screen.xsmall}) {
    left: -0.75rem;
  }
`;

const StyledReportOverview = styled(ReportOverview)`
  margin: 4rem 3rem;
`;

const StyledWaves = styled(Waves)`
  background-color: #6cace4;
  width: 100%;
`;

const Reports = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  width: 100%;
  gap: 10rem;
`;

const StyledWavesReports = styled(Waves)`
  background-color: #0a3161;
`;

const StyledProfile = styled.div`
  margin-top: 8rem;
  margin-bottom: 5rem;
`;

const StyledQuote = styled.div`
  display: flex;
  justify-content: center;
  margin: 6rem auto;
  width: calc(100% - 4rem);
`;

const About = styled.section`
  padding: 6rem 3rem;
  text-align: center;
  max-width: 50rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 4rem;
  }

  p {
    font-size: 1.15rem;
  }
`;

const SignUp = styled.section`
  padding: 6rem 3rem;
  text-align: center;
  max-width: 50rem;
`;

const InputItems = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 1rem;
  justify-content: center;
  margin: 3rem 0;

  @media (max-width: ${({ theme }) => theme.screen.xsmall}) {
    flex-direction: column;
    margin: 3rem 0;
  }

  @keyframes stretch {
    from {
      letter-spacing: 0.5rem;
    }
    to {
      letter-spacing: 1rem;
    }
  }

  input {
    outline: none;
    border: none;
    background-image: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    transition: 0.125s ease-in-out;
    padding-left: 1rem;
    box-shadow: 0rem 0rem 0.15rem #0a31617d, 0.5rem 0.5rem 0 #0a316144;
    overflow-x: auto;
    min-height: 3.5rem;
    min-width: 20rem;
    font-size: 16px;

    &:hover {
      cursor: text;
    }
  }

  button {
    background: none repeat scroll 0 0 transparent;
    border: medium none;
    border-spacing: 0;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.43rem;
    list-style: none outside none;
    margin: 0;
    padding: 0;
    height: 3.5rem;
    text-align: center;
    text-decoration: none;
    text-indent: 0;
    cursor: pointer;
    background-color: #6cace4;
    color: ${({ theme }) => theme.palette.secondary.main};
    padding: 1rem 2rem;
    box-shadow: 0.5rem 0.5rem 0 #0a316144;
    transition: 0.125s ease-in-out;
    overflow: hidden;
    transform-origin: bottom right;
    position: relative;
    min-width: 10rem;

    &:hover {
      box-shadow: 0.25rem 0.25rem 3px #0a316144;
      transform: translate(0.25rem, 0.25rem);
    }

    &:disabled {
      user-select: none;
      filter: opacity(70%);
      pointer-events: none;

      &:after {
        content: '...';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -33%);
        width: 5rem;
        height: 3rem;
        font-weight: 800;
        letter-spacing: 0.5rem;
        animation: stretch 1s ease-in infinite alternate-reverse;
      }
    }
  }
`;

const LandingPage = ({
  title,
  subTitle,
  profile,
  quoteText,
  quoteAuthor,
  about,
  reports,
}: {
  title: string;
  subTitle: string;
  profile: PrismicImage;
  quoteText: string;
  quoteAuthor: string;
  about: any;
  reports: Report[];
}) => {
  const l = useLocalization();
  const { loading, subscribeEmail } = useEmail();
  const [email, setEmail] = useState<string>('');
  const [label, setLabel] = useState<string>('');

  const handleSubscribe = () => {
    if (!email) return;
    setLabel(l('success', ucc));
    subscribeEmail(email);
    setEmail('');
  };

  useEffect(() => {
    if (loading || !label) return;

    setLabel(l('success', ucc));
    setTimeout(() => {
      setLabel(l('subscribe', ucc));
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [l, loading]);

  return (
    <Container>
      <StyledLanguageToggle />
      <StyledWaves colors={['#FFB81C', '#6CACE4']}>
        <StyledProfile>
          <Profile
            title={title}
            subTitle={subTitle}
            profile={profile}
            quoteText={quoteText}
            quoteAuthor={quoteAuthor}
          />
        </StyledProfile>
      </StyledWaves>

      <StyledQuote>
        <Quote text={quoteText} author={quoteAuthor} />
      </StyledQuote>

      <StyledWavesReports colors={['#0A3161', '#6CACE4']} both>
        <Reports id="reports">
          {reports.map(
            ({ uid, title, reportNumber, summary, isLocked, updateTimestamp, cover }, index) => (
              <StyledReportOverview
                key={uid}
                reportId={uid}
                title={title}
                subTitle={`${l('report', ucc)} ${reportNumber}/${reports.length}`}
                description={summary}
                isLocked={!!isLocked}
                cover={cover}
                updateTimestamp={updateTimestamp}
                style={{
                  alignItems: index % 2 === 0 ? 'end' : 'start',
                  flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row',
                }}
              />
            )
          )}
        </Reports>
      </StyledWavesReports>

      <About id="about">
        {RichText.render([{ type: 'heading2', text: l('about', ucc), spans: [] }, ...about])}
      </About>
      <SignUp id="signup">
        <h3>{l('emailForUpdates')}</h3>
        <InputItems>
          <input
            disabled={loading}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={l('email', ucc)}
          ></input>
          <button disabled={loading} onClick={handleSubscribe}>
            {!loading ? label || l('subscribe', ucc) : ''}
          </button>
        </InputItems>
      </SignUp>
    </Container>
  );
};

export async function getServerSideProps({ query }: { query: { lang: Language } }) {
  const [landing, reports] = await Promise.all([
    PrismicService.landing({ language: query.lang }),
    PrismicService.reports({ language: query.lang }),
  ]);

  const { title, subTitle, profile, quoteText, quoteAuthor, about } = landing;

  return {
    props: {
      reports,
      title,
      subTitle,
      profile,
      about,
      quoteText,
      quoteAuthor,
    },
  };
}

export default LandingPage;
