import React from 'react';

import EachComment from './EachComment';

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
        {comments.map((comment, ind) => {
          return (
            <EachComment
              key={ind}
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
