import styled from 'styled-components';
import { useRouter } from 'next/router';

import PrismicService from '../../lib/core/services/prismic';
import Waves from '../../components/Waves';
import Report from '../../components/Report';

const Container = styled.main`
  overflow-x: hidden;
`;

export type Report = {
  title: string;
};

export interface ReportPageProps {
  title: string;
  body: any;
}

const StyledReport = styled(Report)`
  width: 100%;
  max-width: 50rem;
`;

const StyledWaves = styled(Waves)`
  background-color: #6cace4;
`;

const Title = styled.h2`
  text-align: center;
`;

const ReportPage: React.FC<ReportPageProps> = ({ title, body }: { title: string; body: any }) => {
  const router = useRouter();

  if (!body?.length) {
    router.push('/404');
  }

  return (
    <Container>
      <StyledWaves colors={['#FFB81C', '#6CACE4']}>
        <Title>{title}</Title>
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
