'use client';

import React, { useRef } from 'react';
import {  searchPostsAction } from '@/actions/postActions';
import Post from '../posts/Post';
import { useEffect } from 'react';
import { Input } from '../ui/input';
import { IoReloadOutline } from 'react-icons/io5';

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

export const AllPosts = ({ posts }: { posts: feedProps[] | null }) => {
  const [searchVal, setSearchVal] = React.useState('');
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [filteredPosts, setFilteredPosts] = React.useState(posts);
  const [searching, setSearching] = React.useState(false);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.keyCode === 75 && e.metaKey) {
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  useEffect(() => {
    if (searchVal.trim() === '') {
      setFilteredPosts(posts);
      return;
    }

    setSearching(true);
    const bounce = setTimeout(() => {
      console.log(searchVal, 'rendered');
      (async () => {
        const getPosts = await searchPostsAction(searchVal);
        if (getPosts) {
          setFilteredPosts(getPosts);
          setSearching(false);
        }
      })();
    }, 1000);

    return () => {
      setSearching(false);
      clearTimeout(bounce);
    };
  }, [searchVal]);

  return (
    <div className="mx-10 my-6">
      <Input
        ref={inputRef}
        className="mb-4 border placeholder:font-bold focus:outline-1 focus:border-neutral-400 border-neutral-800"
        placeholder="Search for posts ( CMD + K )"
        onChange={(e) => {
          setSearching(true);
          setSearchVal(e.target.value);
        }}
      />
      <div className="grid grid-cols-3 gap-5">
        {searching && <IoReloadOutline className="animate-spin m-10 mx-auto" />}
        {!searching && filteredPosts?.length === 0 && <p>No posts found</p>}
        {!searching &&
          filteredPosts?.map((post, ind) => {
            return <Post key={ind} postInfo={post} />;
          })}
      </div>
    </div>
  );
};
