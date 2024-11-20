import React from 'react';
import { Card } from '../ui/card';
import { getUserNameFromClerkId } from '@/actions/userActions';

const EachComment = async ({
  userIdComment,
  commentContent,
}: {
  userIdComment: string;
  commentContent: string;
}) => {
  const username = await getUserNameFromClerkId(userIdComment);
  return (
    <Card className="rounded-sm p-2 bg-black text-slate-50">
      <h3 className="text-sm font-bold">{username}</h3>
      <p className="tracking-tight font-light">{commentContent}</p>
    </Card>
  );
};

export default EachComment;
