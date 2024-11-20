'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaHeart } from 'react-icons/fa6';
import { FaCommentAlt } from 'react-icons/fa';
import { HiMiniArrowUturnLeft } from 'react-icons/hi2';
import Image from 'next/image';
import {
  isLikedAction,
  likePostAction,
  removeLikeAction,
} from '@/actions/postActions';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

interface postProps {
  postId: number;
  username: string;
  content: string;
  picture?: string | null;
  likes: number;
  comments: number;
}

const Post = ({
  username,
  content,
  picture,
  likes,
  comments,
  postId,
}: postProps) => {
  const [countOfLikes, setCountOfLikes] = useState(likes);
  const [liked, setLiked] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) return null;

  useEffect(() => {
    (async () => {
      const res = await isLikedAction(postId, userId);
      console.log(res);
      if (res?.ok) {
        setLiked(true);
      } else setLiked(false);
    })();
  }, [likes]);

  const likeHandler = async () => {
    if (liked) {
      const res = await removeLikeAction(postId, userId);
      if (res) {
        setLiked(false);
        setCountOfLikes((prev) => prev - 1);
      }
      return;
    }
    console.log('going to like');
    const res = await likePostAction(postId, userId);
    console.log('like response', res);
    if (res) {
      setLiked(true);
      setCountOfLikes((prev) => prev + 1);
    }
  };

  const openPostHandler = () => {
    console.log('reached');
    router.push(`/${postId}`);
  };

  return (
    <div
      className={`${
        picture && picture !== '' && 'row-span-2'
      }  border-neutral-700 rounded h-fit  border`}
    >
      <Card
        onClick={openPostHandler}
        className="cursor-pointer px-3 bg-black text-slate-100  border-none rounded"
      >
        <div className=" grid grid-cols-12  items-center  mx-auto py-2">
          <div className="col-span-1">
            <Avatar className="bg-slate-50">
              <AvatarImage width={10} height={10} src={'/goole.png'} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <CardHeader className="ps-4 col-span-10">
            <CardTitle>{username}</CardTitle>
          </CardHeader>
        </div>
        <div className="">
          {picture && (
            <Image
              src={picture}
              alt="image"
              className=" mx-auto w-4/6 mb-3"
              width={100}
              height={100}
            />
          )}
          <CardContent className=" max-h-44 me-0 overflow-scroll">
            <p>{content}</p>
          </CardContent>
        </div>
      </Card>
      <div className="grid grid-cols-12 px-3 mb-2 w-full text-slate-50">
        <div className="flex gap-2  col-start-2 col-span-4 items-center">
          <FaHeart
            onClick={likeHandler}
            color={liked ? 'red' : 'white'}
            className="cursor-pointer"
          />
          <p>{countOfLikes}</p>
        </div>
        <div className="flex gap-2 col-span-4 items-center">
          <FaCommentAlt color="white" className="cursor-pointer" />
          <p>{comments}</p>
        </div>
        <div className="flex gap-2 col-span-3 items-center">
          <HiMiniArrowUturnLeft color="white" className="cursor-pointer" />
          <p>12</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
