// 'use client';
import React from 'react';
import { AllPosts } from './AllPosts';

export const revalidate = 300;

interface feedProps {
  id: number;
  postContent: string;
  userId: string;
  username: string;
  picture: string | null;
  user: {
    profilePic: string;
  };
  _count: {
    comments: number;
    likes: number;
    reposts: number;
  };
}

const Feed = ({ posts }: { posts: feedProps[] | null }) => {

  return (
    <div>
      <AllPosts posts={posts} />
    </div>
  );
};

export default Feed;
