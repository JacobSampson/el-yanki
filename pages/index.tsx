import styled from 'styled-components';
import TopicOverview from '../components/TopicOverview';
import Layout from '../layouts/Landing';
import LanguageToggle from '../components/LanguageToggle';

const Container = styled.main``;

const StyledLanguageToggle = styled(LanguageToggle)`
  position: fixed;
  left: 10rem;
  bottom: 0rem;
  transform: rotate(90deg);
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

      <Container />
    </Layout>
  );
}
