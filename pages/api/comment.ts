import { NextApiRequest, NextApiResponse } from 'next';
import { ResourceService } from '../../lib/core/services/firebase';

const postComment = async (request: NextApiRequest, response: NextApiResponse) => {
  const comment = request.body;

  try {
    const result = await new ResourceService().addComment(comment);
    response.status(200).json(result);
  } catch (e) {
    console.log('[err]', e);
  }

  response.status(500).json({});
};

export default postComment;
