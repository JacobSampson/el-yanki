import styled from 'styled-components';
import ReportOverview from '../components/ReportOverview';
import LanguageToggle from '../components/LanguageToggle';
import Waves from '../components/Waves';
import PrismicService from '../lib/core/services/prismic';
import { Language } from '../lib/core/types';
import { Report } from '../lib/core/models/report';
import Profile from '../components/Profile';
import Quote from '../components/Quote';
import useLocalization from '../lib/client/hooks/useLocalization';

const Container = styled.main`
  position: relative;
  overflow: hidden;
`;

const StyledLanguageToggle = styled(LanguageToggle)`
  position: absolute;
  left: 0;
  top: 7rem;
  transform: rotate(90deg) translateY(3rem);
  z-index: 1000 !important;
`;

const StyledReportOverview = styled(ReportOverview)`
  margin: 4rem 2rem;
`;

const StyledWaves = styled(Waves)`
  background-color: #6cace4;
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
  margin: 6rem 0;
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
  profile: string;
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

      <StyledWavesReports colors={['#0A3161', '#6CACE4']}>
        <Reports id="reports">
          {reports.map(
            ({ uid, title, reportNumber, summary, isLocked, updateTimestamp, cover }, index) => (
              <StyledReportOverview
                key={uid}
                reportId={uid}
                title={title}
                subTitle={`${l('report')} ${reportNumber}/${reports.length}`}
                description={summary}
                isLocked={!!isLocked}
                cover={cover}
                updateTimestamp={updateTimestamp}
                style={{ alignItems: index % 2 === 0 ? 'end' : 'start' }}
              />
            )
          )}
        </Reports>
      </StyledWavesReports>
    </Container>
  );
};

export async function getServerSideProps({ query }: { query: { lang: Language } }) {
  const [{ title, subTitle, profile, quoteText, quoteAuthor }, reports] = await Promise.all([
    PrismicService.landing({ language: query.lang }),
    PrismicService.reports({ language: query.lang }),
  ]);

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
