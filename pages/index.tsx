import styled from 'styled-components';
import TopicOverview from '../components/TopicOverview';
import Layout from '../layouts/Landing';
import LanguageToggle from '../components/LanguageToggle';
import Wave from '../components/Wave';

const Container = styled.main`
  position: relative;
`;

const StyledLanguageToggle = styled(LanguageToggle)`
  position: fixed;
  left: 0rem;
  top: 12rem;
  transform: rotate(90deg);
`;

const StyledWave = styled(Wave)`
  width: 100%;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export default function Home() {
  return (
    <Layout>
      <StyledLanguageToggle />

      <TopicOverview
        title="Argentine Culture Overview"
        subTitle="topic 1/13"
        description="This is a brief description"
        isLocked
      />

      <StyledWave fill="yellow" />

      <Container />
    </Layout>
  );
}
