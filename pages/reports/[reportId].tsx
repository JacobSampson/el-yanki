import styled from 'styled-components';
import { useRouter } from 'next/router';

import PrismicService from '../../lib/core/services/prismic';
import Waves from '../../components/Waves';
import Report from '../../components/Report';
import { formatDate } from '../../lib/core/utils';
import { useLanguageContext } from '../../lib/client/contexts/LanguageContext';

const Container = styled.main`
  overflow-x: hidden;
`;

export type Report = {
  title: string;
};

export interface ReportPageProps {
  title: string;
  body: any;
  updateTimestamp: string;
}

const Timestamp = styled.h3`
  position: absolute;
  bottom: -7rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  opacity: 0.5;

  @media (max-width: ${({ theme }) => theme.screen.xsmall}) {
    position: relative;
    bottom: 0;
  }
`;

const StyledReport = styled(Report)`
  width: 100%;
  max-width: 50rem;
  margin: 3rem 0;
`;

const StyledWaves = styled(Waves)`
  background-color: #6cace4;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.palette.secondary.main};
  margin-bottom: -100%;

  @media (max-width: ${({ theme }) => theme.screen.xsmall}) {
    margin-bottom: 0%;
  }
`;

const ReportPage: React.FC<ReportPageProps> = ({
  title,
  body,
  updateTimestamp,
}: ReportPageProps) => {
  const router = useRouter();
  const { language } = useLanguageContext();

  if (!body?.length) {
    router.push('/404');
  }

  return (
    <Container>
      <StyledWaves colors={['#FFB81C', '#6CACE4']}>
        <Title>{title}</Title>
        <Timestamp>{formatDate(updateTimestamp, language)}</Timestamp>
      </StyledWaves>
      <StyledReport key={title} body={body} />
    </Container>
  );
};

export async function getServerSideProps({ query }: { query: { reportId: string } }) {
  const report = await PrismicService.report({ reportId: query.reportId, language: 'es-ar' });

  return {
    props: {
      ...report,
    },
  };
}

export default ReportPage;
