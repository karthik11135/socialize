import { getPostByIdAction } from '@/actions/postActions';
import React from 'react';
import Post from '@/components/posts/Post';
import BackBtn from './BackBtn';
import CommentBox from '@/components/comments/CommentBox';

interface postIdProps {
  params: {
    postId: string;
  };
}

const page = async ({ params: postId }: postIdProps) => {
  const post = await getPostByIdAction(Number(postId.postId));

  if (!post) return null;

  return (
    <div className="w-4/6 mx-auto mt-5">
      <BackBtn />
      <Post
        postId={post.id}
        username={'karthik'}
        likes={post.likes}
        content={post.postContent}
        picture={post.picture}
        comments={post.comments.length}
      />
      <CommentBox comments={post.comments} />
    </div>
  );
};

export default page;
