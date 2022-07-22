import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';

const Container = styled.section`
  padding: 2rem;
`;

export interface ReportProps {
  body: any;
}

const Report: React.FC<ReportProps> = ({ body, ...props }) => {
  return <Container {...props}>{RichText.render(body)}</Container>;
};

export default Report;
