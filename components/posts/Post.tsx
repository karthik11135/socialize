'use client';
import React, { useState, useEffect } from 'react';
import {  CardHeader, CardTitle } from '@/components/ui/card';
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
import { IoReloadOutline } from 'react-icons/io5';


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
  
    const { userId } = useAuth();
    const router = useRouter();

  const { toast } = useToast();
  const [countOfLikes, setCountOfLikes] = useState<number>(
    postInfo._count.likes
  );
  const [countOfReposts, setCountOfReposts] = useState<number>(
    postInfo._count.reposts
  );
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [repostLoader, setRepostLoader] = useState(false);
  const [likeLoader, setLikeLoader] = useState(false);

  useEffect(() => {
    if(!userId) return
    (async () => {
      const resLike = await isLikedAction(postInfo.id, userId);
      if (resLike?.ok) {
        setLiked(true);
      } else setLiked(false);
    })();
  }, [postInfo.id]);

  useEffect(() => {
    if(!userId) return
    console.log("what is this man");
    (async () => {
      const resRepost = await isRepostedAction(postInfo.id, userId);
      if (resRepost?.ok) {
        setReposted(true);
      } else setReposted(false);
    })();
  }, [postInfo.id]);
    
  if (!userId) return null;


  const likeHandler = async () => {
    try {
      setLikeLoader(true);
      if (liked) {
        const res = await removeLikeAction(postInfo.id, userId);
        if (res) {
          setLiked(false);
          setCountOfLikes((prev) => prev - 1);
          setLikeLoader(false);
        }
        return;
      }

      const res = await likePostAction(postInfo.id, userId);

      if (res) {
        setLikeLoader(false);
        setLiked(true);
        setCountOfLikes((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const repostHandler = async () => {
    try {
      setRepostLoader(true);
      if (reposted) {
        const res = await removeRepostAction(postInfo.id, userId);
        if (res) {
          setReposted(true);
          setCountOfReposts((prev) => prev - 1);
          setRepostLoader(false);
          toast({
            description: 'Your repost removed',
          });
        }
        return;
      }
      const res = await repostAction(postInfo.id, userId);
      if (res?.ok) {
        setReposted(true);
        setRepostLoader(false);
        setCountOfReposts((prev) => prev + 1);
        toast({
          description: 'Successfully reposted',
        });
      } else {
        setRepostLoader(false);
        toast({
          description: 'You cannot repost your own post / Network issue',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openPostHandler = () => {
    router.push(`/${postInfo.id}`);
  };

  return (
    <div
      className={`${
        postInfo.picture && postInfo.picture !== '' && 'row-span-2'
      }  border-neutral-800
       rounded-md h-fit px-2  border`}
    >
      <div
        onClick={openPostHandler}
        className="cursor-pointer bg-black text-slate-100  border-none rounded"
      >
        <div className=" grid grid-cols-12 items-center  mx-auto">
          <div className="col-span-1 ">
            <Avatar className="bg-slate-50">
              <AvatarImage
                width={10}
                height={10}
                src={postInfo.user.profilePic}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <CardHeader className="ps-3 col-span-11">
            <CardTitle>{postInfo.username}</CardTitle>
          </CardHeader>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-span-11">
            {postInfo.picture && (
              <Image
                src={postInfo.picture}
                alt="image"
                className="rounded px-3 mx-auto w-full mb-2"
                width={600}
                height={600}
              />
            )}
            <div className=" pb-3 ps-3 max-h-44 overflow-scroll">
              <p className="">{postInfo.postContent}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 mb-2 w-full text-slate-50">
        <div className="flex gap-2 col-start-2 ps-3 col-span-4 items-center">
          {likeLoader ? (
            <IoReloadOutline className="animate-spin" />
          ) : (
            <FaHeart
              onClick={likeHandler}
              color={liked ? 'red' : 'white'}
              className="cursor-pointer"
            />
          )}
          <p>{countOfLikes}</p>
        </div>
        <div className="flex gap-2 col-span-4 items-center">
          <FaCommentAlt color="white" className="cursor-pointer" />
          <p>{postInfo._count.comments}</p>
        </div>
        <div className="flex gap-2 col-span-3 items-center">
          {repostLoader ? (
            <IoReloadOutline className="animate-spin" />
          ) : (
            <HiMiniArrowUturnLeft
              onClick={repostHandler}
              strokeWidth={2}
              color={reposted ? 'green' : 'white'}
              className="cursor-pointer"
            />
          )}
          <p>{countOfReposts}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
