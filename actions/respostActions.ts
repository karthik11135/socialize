'use server';

import prisma from '@/lib/db';
import { getUserNameFromClerkId } from './userActions';
import { revalidatePath } from 'next/cache';

export const repostAction = async (postId: number, userId: string) => {
  try {
    const exists = await prisma.post.findFirst({
      where: {
        id: postId,
        userId,
      },
    });

    console.log('checking if it is reposted', exists);

    if (exists) return null;

    const postDetails = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    console.log('found original post', postDetails);

    const username = await getUserNameFromClerkId(userId);

    if (postDetails) {
      const res = await prisma.post.create({
        data: {
          userId: userId,
          username: username,
          postContent: postDetails?.postContent,
          picture: postDetails?.picture,
        },
      });

      console.log('created new detials', 'created new details');

      const repostRes = await prisma.rePosts.create({
        data: {
          postId: postId,
          userId: userId,
          repostId: res.id,
        },
      });

      console.log('updated in reposts table', repostRes);

      revalidatePath('/feed')
      if (res && repostRes) return { ok: true };
    }
    return { ok: false };
  } catch (err) {
    return null;
  }
};

export const removeRepostAction = async (postId: number, userId: string) => {
  const exists = await prisma.rePosts.findFirst({
    where: {
      postId: postId,
      userId: userId,
    },
  });

  if (!exists) return null;

  const repostedId = exists.repostId;

  const res = await prisma.rePosts.deleteMany({
    where: {
      postId: postId,
      userId: userId,
    },
  });

  const deletePost = await prisma.post.deleteMany({
    where: {
      id: repostedId,
    },
  });

  if (res && deletePost) {
    revalidatePath('/feed')
    return { ok: true };
  }

  return { ok: false };
};

export const isRepostedAction = async (postId: number, userId: string) => {
  const res = await prisma.rePosts.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if(res) return {ok: true};
  return {ok: false}
};
