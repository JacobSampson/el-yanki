import firebase from 'firebase-admin';
import { Language } from '../types';
import { formatDate } from '../utils';

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const firestore = firebase.firestore();

export class ResourceService {
  db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = firestore;
  }

  async fetchComments({
    language,
  }: {
    language: Language;
  }): Promise<{ body: string; postedAt: string; updateId: string }[]> {
    const comments = await this.db.collection('comments').where('language', '==', language).get();

    if (!comments?.size) return [];

    const docs = comments.docs.map(d => {
      const { body, postedAt, language, updateId } = d.data();

      return { body, postedAt: formatDate(postedAt.toDate(), language), language, updateId };
    });

    return docs;
  }

  async addComment({
    updateId,
    language,
    body,
  }: {
    updateId: string;
    language: Language;
    body: string;
  }) {
    return await this.db
      .collection('comments')
      .add({ updateId, language, body, postedAt: firebase.firestore.FieldValue.serverTimestamp() });
  }

  async subscribeEmail({ email }: { email: string }) {
    return await this.db.collection('emails').add({ email });
  }
}
