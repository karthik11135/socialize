import React from 'react';
import { Card } from '../ui/card';

const EachComment = ({
  userIdComment,
  commentContent,
}: {
  userIdComment: string;
  commentContent: string;
}) => {
  return (
    <Card className="rounded-sm p-2 bg-black text-slate-50">
      <h3 className="text-sm font-bold">{userIdComment}</h3>
      <p className="tracking-tight font-light">{commentContent}</p>
    </Card>
  );
};

export default EachComment;
