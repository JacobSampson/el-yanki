import styled from 'styled-components';
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
  padding: 10rem 0;
  text-align: center;
`;

const LandingPage = ({
  title,
  subTitle,
  profile,
  quoteText,
  quoteAuthor,
  reports,
}: {
  title: string;
  subTitle: string;
  profile: PrismicImage;
  quoteText: string;
  quoteAuthor: string;
  reports: Report[];
}) => {
  const l = useLocalization();

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

      <About id="about">{l('about', ucc)}</About>
      {/* <About id="signUp">{l('signUp', ucc)}</About> */}
    </Container>
  );
};

export async function getServerSideProps({ query }: { query: { lang: Language } }) {
  const [landing, reports] = await Promise.all([
    PrismicService.landing({ language: query.lang }),
    PrismicService.reports({ language: query.lang }),
  ]);

  const { title, subTitle, profile, quoteText, quoteAuthor } = landing;

  return {
    props: {
      reports,
      title,
      subTitle,
      profile,
      quoteText,
      quoteAuthor,
    },
  };
}

export default LandingPage;
