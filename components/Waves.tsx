import styled from 'styled-components';
import useRelativeY from '../lib/client/hooks/useRelativeY';
import useTimer from '../lib/client/hooks/useTimer';
import Wave from './Wave';

const wavePattern = (x: number, dampening: number = 1): number => Math.sin(x / dampening) + 1;

export interface WaveProps {
  colors: string[];
  reverse?: boolean;
  children?: React.ReactNode;
}

const Container = styled.div<{ reverse?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;

  ${({ reverse }) => (reverse ? 'margin-top: 50%;' : 'margin-bottom: 50%;')}
`;

const Content = styled.div<{ reverse?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  z-index: 50;

  * {
    z-index: 100;
  }
`;

const StyledWave = styled(Wave)<{
  reverse?: boolean;
  n: number;
}>`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.palette.primary.main};
  position: absolute;
  left: 0;
  z-index: 0;
  ${({ n, reverse }) => (reverse ? `bottom: calc(100% + ${n}rem);` : `top: calc(100% + ${n}rem);`)}
  transition: ease-in-out 0.125s;
`;

const SlidingWave = ({
  reverse,
  n,
  fill,
  maxOffset,
  ...props
}: {
  reverse?: boolean;
  n?: number;
  fill?: string;
  maxOffset: number;
}) => {
  const { ref, y, viewportHeight } = useRelativeY();
  const t = useTimer(75);

  const offset = (reverse ? -1 : 1) * maxOffset;
  const absoluteY = (viewportHeight / 2 + y) * 0.1;

  return (
    <StyledWave
      innerRef={ref}
      reverse={reverse}
      n={n || 0}
      fill={fill}
      {...props}
      style={
        {
          transform: `
          translate(
            ${2 * (wavePattern(t, 50) - 1) * offset}rem,
            ${wavePattern(absoluteY + t, 50) * offset}rem
          )
          scale(1.1) rotate(${reverse ? '180deg' : '0deg'})
        `,
        } as any
      }
    />
  );
};

const Waves = ({ colors = [], children, reverse = false, ...props }: WaveProps) => (
  <Container reverse={reverse}>
    <Content reverse={reverse} {...props}>
      {children}
    </Content>
    {(reverse ? [...colors].reverse() : colors).map((color, n) => (
      <SlidingWave
        reverse={reverse}
        key={n}
        n={colors.length - n - 1}
        maxOffset={colors.length - n - 1}
        fill={color}
      />
    ))}
  </Container>
);

export default Waves;
