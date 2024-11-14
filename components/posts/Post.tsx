import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaHeart } from 'react-icons/fa6';
import { FaCommentAlt } from 'react-icons/fa';
import { HiMiniArrowUturnLeft } from 'react-icons/hi2';
import Image from 'next/image';

interface postProps {
  username: string;
  content: string;
  picture?: string | null;
  likes: number;
  comments: number;
}

const Post = ({ username, content, picture, likes, comments }: postProps) => {
  return (
    <div className={`${picture && picture !== "" && "row-span-2"} "border-neutral-700 shadow shadow-slate-200  h-fit bg-black border"`}>
      <Card className="cursor-pointer px-3 bg-black text-slate-100  border-none rounded-none">
        <div className=" grid grid-cols-12  items-center  mx-auto py-2">
          <div className="col-span-1">
            <Avatar className="bg-slate-50">
              <AvatarImage width={10} height={10} src={"/goole.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <CardHeader className="ps-4 col-span-10">
            <CardTitle>{username}</CardTitle>
          </CardHeader>
        </div>
        <div className="">
        {picture &&  <Image src={picture} alt="image" className='w-5/6 mx-auto mb-3' width={100} height={100} />}
          <CardContent className=" w-full max-h-44 me-0 overflow-scroll">
            <p>{content}</p>
          </CardContent>
        </div>
      </Card>
      <div className="grid grid-cols-12 px-3 mb-2 w-full text-slate-50">
        <div className="flex gap-2  col-start-2 col-span-4 items-center">
          <FaHeart color="white" className="cursor-pointer" />
          <p>{likes}</p>
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