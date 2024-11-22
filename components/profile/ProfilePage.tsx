import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { getAllPostsForUser, getLikedPostsAction } from '@/actions/postActions';
import Post from '../posts/Post';
import { currentUser } from '@clerk/nextjs/server';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Image from 'next/image';
import DeletePostBtn from './DeletePostBtn';


const ProfilePage = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    return null;
  }
  const posts = await getAllPostsForUser(userId);
  const likedPosts = await getLikedPostsAction(userId);
  if (!posts) return null;

  return (
    <div className="w-3/6 mt-5 mx-auto">
      <div className="flex gap-5 mb-6">
        <Avatar className="bg-slate-50">
          <AvatarImage width={30} height={30} src={user?.imageUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl"> {user?.username} </h1>
      </div>
      <Tabs defaultValue="myposts" className="">
        <TabsList className="grid w-full bg-black border border-neutral-700 text-slate-50 grid-cols-2">
          <TabsTrigger value="myposts">My Posts</TabsTrigger>
          <TabsTrigger value="likedposts">Liked Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="myposts">
          {posts.length === 0 && (
            <h3 className="text-lg m-1 ">No posts on your profile</h3>
          )}
          {posts?.map((post) => {
            return (
              <div className="relative">
                <Post
                  postInfo={post}
                />
                <DeletePostBtn postId={post.id} />
              </div>
            );
          })}
        </TabsContent>
        <TabsContent value="likedposts">
        {likedPosts?.map((post) => {
            return (
              <div className="relative">
                <Post
                  postInfo={post}
                />
              </div>
            );
          })}
        </TabsContent>
      </Tabs>
      {/* <div>
        {posts?.map((post) => {
          return (
            <Post
              profilePic={post.user.profilePic}
              postId={post.id}
              username={post.username}
              likes={post._count.likes}
              content={post.postContent}
              picture={post.picture}
              comments={post._count.comments}
            />
          );
        })}
      </div> */}
    </div>
  );
};

export default ProfilePage;
