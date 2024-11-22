'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaHeart } from 'react-icons/fa6';
import { FaCommentAlt } from 'react-icons/fa';
import { HiMiniArrowUturnLeft } from 'react-icons/hi2';
import Image from 'next/image';
import { isRepostedAction } from '@/actions/respostActions';
import { useToast } from '@/hooks/use-toast';
import {
  isLikedAction,
  likePostAction,
  removeLikeAction,
} from '@/actions/likeActions';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { removeRepostAction, repostAction } from '@/actions/respostActions';

interface postInfoProps {
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

const Post = ({ postInfo }: { postInfo: postInfoProps }) => {
  const {toast} = useToast()
  const [countOfLikes, setCountOfLikes] = useState<number>(
    postInfo._count.likes
  );
  const [countOfReposts, setCountOfReposts] = useState<number>(
    postInfo._count.reposts
  );
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) return null;

  useEffect(() => {
    (async () => {
      const resLike = await isLikedAction(postInfo.id, userId);
      if (resLike?.ok) {
        setLiked(true);
      } else setLiked(false);
    })();
  }, [countOfLikes]);

  useEffect(() => {
    (async () => {
      const resRepost = await isRepostedAction(postInfo.id, userId);
      if (resRepost?.ok) {
        setReposted(true);
      } else setReposted(false);
    })();
  }, [countOfReposts]);

  const likeHandler = async () => {
    if (liked) {
      const res = await removeLikeAction(postInfo.id, userId);
      if (res) {
        setLiked(false);
        setCountOfLikes((prev) => prev - 1);
      }
      return;
    }
    console.log('going to like');
    const res = await likePostAction(postInfo.id, userId);
    console.log('like response', res);
    if (res) {
      setLiked(true);
      setCountOfLikes((prev) => prev + 1);
    }
  };

  const repostHandler = async () => {
    if (reposted) {
      const res = await removeRepostAction(postInfo.id, userId);
      if (res) {
        setReposted(true);
        setCountOfReposts((prev) => prev - 1);
      }
      return;
    }
    const res = await repostAction(postInfo.id, userId);
    if (res?.ok) {
      setReposted(true);
      setCountOfReposts((prev) => prev + 1);
    } else {
      toast({
        description: "You cannot repost your own post / Network issue"
      })
    }
  };

  const openPostHandler = () => {
    console.log('reached');
    router.push(`/${postInfo.id}`);
  };

  return (
    <div
      className={`${
        postInfo.picture && postInfo.picture !== '' && 'row-span-2'
      }  border-neutral-800
       rounded h-fit  border`}
    >
      <Card
        onClick={openPostHandler}
        className="cursor-pointer px-3 bg-black text-slate-100  border-none rounded"
      >
        <div className=" grid grid-cols-12  items-center  mx-auto py-2">
          <div className="col-span-1">
            <Avatar className="bg-slate-50">
              <AvatarImage
                width={10}
                height={10}
                src={postInfo.user.profilePic}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <CardHeader className="ps-4 col-span-10">
            <CardTitle>{postInfo.username}</CardTitle>
          </CardHeader>
        </div>
        <div className="">
          {postInfo.picture && (
            <Image
              src={postInfo.picture}
              alt="image"
              className="rounded-md mx-auto w-full mb-3"
              width={800}
              height={800}
            />
          )}
          <CardContent className=" max-h-44 me-0 overflow-scroll">
            <p>{postInfo.postContent}</p>
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
          <p>{postInfo._count.comments}</p>
        </div>
        <div className="flex gap-2 col-span-3 items-center">
          <HiMiniArrowUturnLeft
            onClick={repostHandler}
            strokeWidth={2}
            color={reposted ? 'green' : 'white'}
            className="cursor-pointer"
          />
          <p>{countOfReposts}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
