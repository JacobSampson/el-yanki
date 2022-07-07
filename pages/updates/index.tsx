import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';

import Layout from '../../layouts/Landing';
import PrismicService from '../../lib/core/services/prismic';
import { Language } from '../../lib/core/types';
import Update from '../../components/Update';

const Container = styled.main``;

export type Update = {
  title: string;
};

export interface UpdatesPageProps {
  updates: Update[];
}

const UpdatesPage: React.FC<UpdatesPageProps> = ({ updates }: { updates: any[] }) => {
  console.log('updates', updates);
  return (
    <Layout>
      <Container>
        {updates.map(update => (
          <Update
            key={update.data.title[0].text}
            title={update.data.title[0].text}
            body={update.data.body}
          />
        ))}
      </Container>
    </Layout>
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
