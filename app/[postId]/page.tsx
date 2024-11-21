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
  console.log(post?.comments);

  if (!post) return null;

  return (
    <div className="w-4/6 mx-auto mt-5">
      <BackBtn />
      <Post
        profilePic={post.user.profilePic}
        postId={post.id}
        username={post.username}
        likes={post._count.likes}
        content={post.postContent}
        picture={post.picture}
        comments={post.comments.length}
      />
      <CommentBox comments={post.comments.reverse()} postId={post.id} />
    </div>
  );
};

export default page;