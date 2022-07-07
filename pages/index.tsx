import styled from 'styled-components';
import TopicOverview from '../components/TopicOverview';
import Layout from '../layouts/Landing';
import LanguageToggle from '../components/LanguageToggle';
import Wave from '../components/Wave';
import useRelativeY from '../lib/client/hooks/useRelativeY';

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

const Waves = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  z-index: 50;

  * {
    z-index: 100;
  }
`;

const StyledWave = styled(Wave)<{ offset?: number; n?: number }>`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.palette.primary.main};
  position: absolute;
  transform: translate(
      ${({ offset }) => (offset ? offset : '0')}%,
      ${({ offset }) => (offset ? offset : '0')}%
    )
    scale(1.1);
  left: 0;
  z-index: 0;
  top: calc(101% + ${({ n }) => n || 0}rem);
  transition: ease-in-out 0.125s;
`;

const wavePattern = (x: number, dampening: number = 1): number => Math.sin(x / dampening) + 1;

const SlidingWave = ({ n, maxYOffset, ...props }: { n?: number; maxYOffset: number }) => {
  const { ref, y } = useRelativeY();
  return <StyledWave n={n} innerRef={ref} offset={wavePattern(y, 50) * maxYOffset} {...props} />;
};

export default function Home() {
  return (
    <Layout>
      <Container>
        <Waves>
          <StyledLanguageToggle />

          <TopicOverview
            title="Argentine Culture Overview"
            subTitle="topic 1/13"
            description="This is a brief description"
            isLocked
            style={{ backgroundColor: '#6CACE4', padding: '4rem 0', textAlign: 'center' }}
          />

          <SlidingWave n={1} maxYOffset={2} fill="#FFB81C" />
          <StyledWave />
        </Waves>

        <TopicOverview
          title="Argentine Culture Overview"
          subTitle="topic 1/13"
          description="This is a brief description"
          isLocked
        />

        {/* <StyledWave />
        <StyledWave /> */}
      </Container>
    </Layout>
  );
}
