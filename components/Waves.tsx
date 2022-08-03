import styled from 'styled-components';
import useRelativeY from '../lib/client/hooks/useRelativeY';
import useTimer from '../lib/client/hooks/useTimer';
import Wave from './Wave';

const wavePattern = (x: number, dampening: number = 1): number => Math.sin(x / dampening) + 1;

export interface WaveProps {
  colors: string[];
  top?: boolean;
  both?: boolean;
  children?: React.ReactNode;
}

const Container = styled.div<{ top?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  overflow-x: clip;
`;

const Content = styled.div<{ top?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  z-index: 50;

  * {
    z-index: 100;
  }
`;

const Decoration = styled.div<{
  top?: boolean;
}>`
  position: relative;
  width: 100%;
  height: 25vw;
`;

const StyledWave = styled(Wave)<{
  offset: number;
}>`
  width: 100%;
  height: fit-content;
  color: ${({ theme }) => theme.palette.primary.main};
  position: absolute;

  z-index: 0;
  transform: translateY(${({ offset }) => offset}rem);
  transition: ease-in-out 0.125s;
` as any;

const SlidingWave = ({
  top,
  initialOffset,
  fill,
  maxOffset,
  ...props
}: {
  top?: boolean;
  initialOffset?: number;
  fill?: string;
  maxOffset: number;
}) => {
  const { ref, y } = useRelativeY();
  const t = useTimer(100, 50 * Math.random());

  const offset = (top ? -1 : 1) * maxOffset;

  return (
    <StyledWave
      innerRef={ref}
      offset={initialOffset}
      fill={fill}
      {...props}
      style={{
        transform: `
          translate(
            ${2 * (wavePattern(t, 50) - 1) * offset}rem,
            ${wavePattern(y * 0.5 + t, 50) * offset + offset}rem
          )
          scale(1.1) rotate(${top ? '180deg' : '0deg'})
        `,
      }}
    />
  );
};

const StyledDecoration = ({ top, colors, ...props }: WaveProps) => (
  <Decoration top={top} {...props}>
    {colors.map((color, n) => (
      <SlidingWave
        top={!!top}
        key={n}
        initialOffset={n}
        maxOffset={colors.length - n - 1}
        fill={color}
      />
    ))}
  </Decoration>
);

const Waves = ({ colors = [], children, both = false, top = false, ...props }: WaveProps) => (
  <Container top={top}>
    {(both || top) && <StyledDecoration colors={[...colors].reverse()} top={true} />}
    <Content top={top} {...props}>
      {children}
    </Content>
    {(both || !top) && (
      <StyledDecoration colors={both ? [...colors].reverse() : colors} top={false} />
    )}
  </Container>
);

export default Waves;
