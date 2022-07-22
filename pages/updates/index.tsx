import styled from 'styled-components';

import { Language } from '../../lib/core/types';
import Update from '../../components/Update';
import Waves from '../../components/Waves';
import { Update as UpdateModel } from '../../lib/core/models/update';

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
  console.log('updates', updates);
  return (
    <Container>
      <StyledWaves colors={['#FFB81C', '#6CACE4']}>
        <Title>Updates</Title>
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

const response = [
  {
    id: 'YrProRMAACUAD21k',
    uid: null,
    url: null,
    type: 'update',
    href: 'https://el-yanki.cdn.prismic.io/api/v2/documents/search?ref=YrPrphMAACcAD219&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22YrProRMAACUAD21k%22%29+%5D%5D',
    tags: [],
    first_publication_date: '2022-06-23T04:27:18+0000',
    last_publication_date: '2022-06-23T04:27:18+0000',
    slugs: ['this-is-a-test'],
    linked_documents: [],
    lang: 'en-us',
    alternate_languages: [],
    data: {
      title: [{ text: 'This is a Title' }],
      body: [
        { type: 'paragraph', text: 'Hola!', spans: [] },
        { type: 'heading1', text: 'Check', spans: [] },
        { type: 'heading2', text: 'This out', spans: [] },
        { type: 'heading3', text: 'man', spans: [] },
        { type: 'paragraph', text: 'This is a test', spans: [] },
        { type: 'paragraph', text: '', spans: [] },
        {
          type: 'image',
          // url: 'https://images.prismic.io/slicemachine-blank/26d81419-4d65-46b8-853e-8ea902e160c1_groovy.png?auto=compress,format',
          url: '/resources/icons/logo.png',
          alt: null,
          copyright: null,
          dimensions: { width: 2048, height: 1536 },
        },
      ],
    },
  },
];

export async function getServerSideProps({ query }: { query: { lang: Language } }) {
  // const updates = await PrismicService.updates({ language: query.lang });
  // console.log('u', updates);
  return {
    props: {
      updates: response,
    },
  };
}

export default UpdatesPage;
