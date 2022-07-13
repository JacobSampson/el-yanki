import styled from 'styled-components';
import TopicOverview from '../components/TopicOverview';
import LanguageToggle from '../components/LanguageToggle';
import Waves from '../components/Waves';

const Container = styled.main`
  position: relative;
  overflow: hidden;
`;

const StyledLanguageToggle = styled(LanguageToggle)`
  position: fixed;
  left: 0;
  top: 13rem;
  transform: rotate(90deg) translateY(3rem);
  z-index: 1000 !important;
`;

const StyledTopicOverview = styled(TopicOverview)`
  text-align: center;
`;

const StyledWaves = styled(Waves)`
  background-color: #6cace4;
`;

const StyledWavesTopics = styled(Waves)`
  background-color: #0a3161;
`;

export default function Home() {
  return (
    <Container>
      <StyledWaves colors={['#FFB81C', '#6CACE4']}>
        <StyledLanguageToggle />

        <TopicOverview
          title="Argentine Culture Overview"
          subTitle="topic 1/13"
          description="This is a brief description"
          isLocked
          style={{ padding: '4rem 0', textAlign: 'center' } as any}
        />
      </StyledWaves>

      <StyledTopicOverview
        title="Argentine Culture Overview"
        subTitle="topic 1/13"
        description="This is a brief description"
        isLocked
      />

      <StyledWavesTopics colors={['#0A3161', '#6CACE4']} reverse>
        <StyledLanguageToggle />

        <TopicOverview
          title="Argentine Culture Overview"
          subTitle="topic 1/13"
          description="This is a brief description"
          isLocked
          style={{ padding: '4rem 0', textAlign: 'center' } as any}
        />
      </StyledWavesTopics>
    </Container>
  );
}
