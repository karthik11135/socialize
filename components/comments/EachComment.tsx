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
    <Card className="rounded-sm border-neutral-700 border p-2 bg-black text-slate-50">
      <h3 className="text-xs font-black">{username}</h3>
      <p className="tracking-tight font-light">{commentContent}</p>
    </Card>
  );
};

export default EachComment;
