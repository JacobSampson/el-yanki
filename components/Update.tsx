import { RichText } from 'prismic-reactjs';
import { useState } from 'react';
import styled from 'styled-components';
import useLocalization, { denominalize, ucc } from '../lib/client/hooks/useLocalization';
import { formatDate } from '../lib/core/utils';

const Container = styled.section`
  position: relative;
`;

const TextArea = styled.div`
  position: relative;
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  border-radius: 0.5rem;
  margin-bottom: 2rem;

  box-shadow: 0.5rem 0.5rem 0 #0a316144;
  overflow-x: hidden;

  img {
    max-width: 100%;
    margin-top: 1rem;
    border-radius: 0.5em;
  }
`;

const Date = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  opacity: 0.5;
`;

const Button = styled.button`
  background: none repeat scroll 0 0 transparent;
  border: medium none;
  border-spacing: 0;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.43rem;
  list-style: none outside none;
  margin: 0;
  padding: 0;
  text-align: center;
  text-decoration: none;
  text-indent: 0;
  cursor: pointer;
  background-color: #6cace4;
  color: ${({ theme }) => theme.palette.secondary.main};
  padding: 1rem;
  box-shadow: 0.5rem 0.5rem 0 #0a316144;
  transition: 0.125s ease-in-out;
  overflow: hidden;
  transform-origin: bottom right;

  &:hover {
    box-shadow: 0.25rem 0.25rem 3px #0a316144;
    transform: translate(0.25rem, 0.25rem);
  }
`;

const Buttons = styled.div`
  position: absolute;
  right: 0;
  top: -5rem;
  display: flex;
  flex-direction: row;
  grid-gap: 1rem;
`;

const EditComment = styled(Button)`
  border-radius: 0.5rem 0.5rem 0rem 0.5rem;
`;
const AddComment = styled(Button)`
  border-radius: 0.5rem 0.5rem 0rem 0.5rem;
  background-color: #ffb81c;
`;

const CommentEditor = styled.div<{ isEditing: boolean }>`
  position: relative;
  margin-top: 1rem;
  width: 100%;
  transition: 0.25s ease-in-out;

  ${({ isEditing }) =>
    isEditing
      ? `
    height: 9rem;
  `
      : `
    height: 0rem;
    margin-bottom: -1rem;
  `}
`;

const CommentTextArea = styled(TextArea)`
  margin-top: 7rem;
  background-color: #6cace4;
  color: ${({ theme }) => theme.palette.secondary.main};
  transition: 0.25s ease-in-out;
  transform-origin: top right;
  width: calc(100% - 3rem);
  margin-left: 3rem;
  border-radius: 0.5rem 0.5rem 0rem 0.5rem;

  textarea {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    height: 5rem;
    resize: none;
    background-color: #86c1f5;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 1rem;
    color: inherit;
  }
`;

const Comment = styled.div<{ isAdmin: boolean }>`
  position: relative;
  padding: 3rem 2rem;
  background-color: #6cace4;
  color: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 0.5rem;
  box-shadow: 0.5rem 0.5rem 0 #0a316144;
  overflow-x: hidden;
  width: calc(100% - 3rem);
  margin-left: 3rem;
  border-radius: 0.5rem 0.5rem 0rem 0.5rem;

  img {
    max-width: 100%;
    margin-top: 1rem;
    border-radius: 0.5em;
  }

  ${({ theme, isAdmin }) =>
    isAdmin &&
    `
    background-color: ${theme.palette.secondary.main};
    color: ${theme.palette.secondary.contrastText};
    transform: translateX(-3rem);
    border-radius: 0.5rem 0.5rem 0.5rem 0rem;
  `};
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 2rem;
`;

export interface UpdateProps {
  title: string;
  updateTimestamp: string;
  body: any;
  comments: { isAdmin: boolean; body: string; updateTimestamp?: string }[];
  onCreate: (comment: string) => void;
}

const Update: React.FC<UpdateProps> = ({
  title,
  updateTimestamp,
  body,
  comments,
  onCreate,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState<string>();
  const l = useLocalization();

  const editText = !isEditing ? l('comment', ucc, denominalize) : l('close', ucc);
  const addText = l('post', ucc);

  return (
    <Container {...props}>
      <TextArea>
        <h1>{title}</h1>
        <Date>{formatDate(updateTimestamp)}</Date>
        {RichText.render(body)}
      </TextArea>

      <Comments>
        {comments.map(({ isAdmin, body, updateTimestamp }, index) => (
          <Comment key={index} isAdmin={isAdmin}>
            {updateTimestamp && <Date>{formatDate(updateTimestamp)}</Date>}
            {body}
          </Comment>
        ))}
      </Comments>

      <CommentEditor isEditing={isEditing}>
        <CommentTextArea
          style={{
            transform: isEditing ? 'scale(1)' : 'scale(0)',
          }}
        >
          <textarea onChange={e => setComment(e.target.value)} value={comment}></textarea>
        </CommentTextArea>

        <Buttons>
          <AddComment
            onClick={() => comment && onCreate(comment)}
            style={{
              width: `${editText.length}rem`,
              // transform: isEditing ? 'scale(1)' : 'scale(0)',
              opacity: isEditing ? 1 : 0,
            }}
          >
            {addText}
          </AddComment>
          <EditComment
            onClick={() => setIsEditing(!isEditing)}
            style={{ width: `${editText.length}rem` }}
          >
            {editText}
          </EditComment>
        </Buttons>
      </CommentEditor>
    </Container>
  );
};

export default Update;
