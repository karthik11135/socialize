import React from 'react';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import EachComment from './EachComment';

interface CommentsProps {
  userId: string;
  commentContent: string;
}

const CommentBox = ({ comments }: { comments: CommentsProps[] }) => {
  return (
    <div className="mt-2">
      <Input
        className="text-slate-50 mb-2 placeholder:text-zinc-700"
        placeholder="Send a comment"
      />
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
