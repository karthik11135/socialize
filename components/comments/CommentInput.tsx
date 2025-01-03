'use client';
import React, { FormEvent, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAuth } from '@clerk/nextjs';
import { addCommentAction } from '@/actions/postActions';
import { IoReloadOutline } from "react-icons/io5";

const CommentInput = ({ postId }: { postId: number }) => {
  const { userId } = useAuth();

  const [commentInput, setCommentInput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  if (!userId) return null;

  const commentSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (commentInput === '') return;
    const res = await addCommentAction(userId, postId, commentInput);
    if(res?.ok) {
      setLoading(false)
      setCommentInput("")
    }
  };

  return (
    <form onSubmit={commentSubmitHandler} className="flex  gap-2">
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCommentInput(e.target.value)
        }
        value={commentInput}
        className="text-slate-50 border border-neutral-700 mb-2 placeholder:text-zinc-700"
        placeholder="Send a comment"
      />
      <Button
        disabled={loading}
        variant={'outline'}
        className="text-black"
        type="submit"
      >
        {loading ? <IoReloadOutline className='animate-spin' /> : 'Add comment'}
      </Button>
    </form>
  );
};

export default CommentInput;
