import React from 'react';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import EachComment from './EachComment';
import { Button } from '../ui/button';
import CommentInput from './CommentInput';

interface CommentsProps {
  userId: string;
  commentContent: string;
}

const CommentBox = ({
  comments,
  postId,
}: {
  comments: CommentsProps[];
  postId: number;
}) => {
  return (
    <div className="mt-2">
      <CommentInput postId={postId} />

      <div>
        {comments.map((comment) => {
          return (
            <EachComment
              userIdComment={comment.userId}
              commentContent={comment.commentContent}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentBox;
