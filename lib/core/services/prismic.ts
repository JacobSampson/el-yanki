import * as prismic from '@prismicio/client';
import { Report } from '../models/report';
import { Language } from '../types';
import { formatDate } from '../utils';

const PRISMIC_ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN!;
const PRISMIC_ENDPOINT = process.env.PRISMIC_ENDPOINT!;

const client = prismic.createClient(PRISMIC_ENDPOINT, {
  accessToken: PRISMIC_ACCESS_TOKEN,
});

class PrismicService {
  static async updates({ language }: { language: Language }) {
    const updates = await client.getAllByType('update', { lang: language });

    if (!updates?.length) return [];

    try {
      return updates
        .map(({ id, data, first_publication_date: updateTimestamp }) => ({
          updateTimestamp: formatDate(updateTimestamp),
          title: data.title[0].text,
          body: data.body,
          comments: data.comments?.length
            ? data.comments.map(
                ({ comment }: { isAdmin: boolean; comment: { text: string }[] }) => ({
                  body: comment?.length ? comment[0].text : '',
                })
              )
            : [],
          id,
        }))
        .sort(({ updateTimestamp: ut1 }, { updateTimestamp: ut2 }) => ut1.localeCompare(ut2))
        .reverse();
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  static async landing({ language }: { language: Language }) {
    const { data } = await client.getSingle('landing', { lang: language });
    const { width, height } = data.profile.dimensions;

    return {
      title: data.title[0].text,
      subTitle: data.subtitle[0].text,
      quoteText: data.quotetext[0].text,
      quoteAuthor: data.quoteauthor[0].text,
      profile: {
        url: data.profile.url,
        width,
        height,
      },
    };
  }

  static async reports({ language }: { language: Language }): Promise<Partial<Report>[]> {
    const reports = await client.getAllByType('post', {
      graphQuery: `
        {
          post {
            title
            summary
            topicnumber
            islocked
            cover
            summary
          }
        }
      `,
      ...(language ? { lang: language } : {}),
    });

    if (!reports?.length) return [];

    try {
      return reports
        .map(({ uid, last_publication_date: updateTimestamp, data }) => ({
          uid: uid || '',
          title: data.title[0].text,
          reportNumber: +data.topicnumber,
          isLocked: data.islocked,
          summary: data.summary[0]?.length ? data.summary[0].text : null,
          cover: {
            url: data?.cover?.url,
            width: data?.cover?.dimensions?.width,
            height: data?.cover?.dimensions?.height,
          },
          updateTimestamp,
        }))
        .sort((a, b) => a.reportNumber - b.reportNumber);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  static async report({ language, reportId }: { language: Language; reportId: string }) {
    const { data, last_publication_date: updateTimestamp } = await client.getByUID(
      'post',
      reportId,
      language ? { lang: 'es-ar' } : {}
    );

    return {
      title: data.title[0].text,
      body: data.body,
      updateTimestamp,
    };
  }
}

export default PrismicService;
