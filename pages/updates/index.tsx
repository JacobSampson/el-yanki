import styled from 'styled-components';

import { Language } from '../../lib/core/types';
import Update from '../../components/Update';
import Waves from '../../components/Waves';
import { Update as UpdateModel } from '../../lib/core/models/update';
import useLocalization, { plural, ucc } from '../../lib/client/hooks/useLocalization';
import PrismicService from '../../lib/core/services/prismic';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 3rem;
  padding-bottom: 3rem;
  color: ${({ theme }) => theme.palette.secondary.contrastText};

  & > * {
    width: 100%;
  }
`;

export interface UpdatesPageProps {
  updates: UpdateModel[];
}

const StyledUpdate = styled(Update)`
  width: 100%;
  max-width: 50rem;
`;

const StyledWaves = styled(Waves)`
  background-color: #6cace4;
`;

const Title = styled.h2`
  text-align: center;
`;

const UpdatesPage: React.FC<UpdatesPageProps> = ({ updates }: { updates: any[] }) => {
  const l = useLocalization();
  return (
    <Container>
      <StyledWaves colors={['#FFB81C', '#6CACE4']}>
        <Title>{l('update', plural)}</Title>
      </StyledWaves>
      {updates.map(update => (
        <StyledUpdate
          key={update.data.title[0].text}
          title={update.data.title[0].text}
          body={update.data.body}
        />
      ))}
    </Container>
  );
};

export async function getServerSideProps({ query }: { query: { lang: Language } }) {
  const updates = await PrismicService.updates({ language: query.lang });

  return {
    props: {
      updates,
    },
  };
}

export default UpdatesPage;
