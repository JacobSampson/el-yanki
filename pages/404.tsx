// 404.js
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export default function FourOhFour() {
  return (
    <Container>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </Container>
  );
}
