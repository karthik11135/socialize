'use server';

import prisma from '@/lib/db';
import { getUserNameFromClerkId } from './userActions';
import { revalidatePath } from 'next/cache';

export const repostAction = async (postId: number, userId: string) => {
  try {
    return prisma.$transaction(async (tx) => {
      const exists = await tx.post.findFirst({
        where: {
          id: postId,
          userId,
        },
      });

      if (exists) return null;

      const postDetails = await tx.post.findUnique({
        where: {
          id: postId,
        },
      });

      const username = await getUserNameFromClerkId(userId);

      if (postDetails) {
        const res = await tx.post.create({
          data: {
            userId: userId,
            username: username,
            postContent: postDetails?.postContent,
            picture: postDetails?.picture,
          },
        });

        console.log('created new detials', 'created new details');

        const repostRes = await tx.rePosts.create({
          data: {
            postId: postId,
            userId: userId,
            repostId: res.id,
          },
        });

        revalidatePath('/feed');
        if (res && repostRes) return { ok: true };
      }
      return { ok: false };
    });
  } catch (err) {
    return null;
  }
};

export const removeRepostAction = async (postId: number, userId: string) => {
  return prisma.$transaction(async (tx) => {
    const exists = await tx.rePosts.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (!exists) return null;

    const repostedId = exists.repostId;

    const res = await tx.rePosts.deleteMany({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    const deletePost = await tx.post.deleteMany({
      where: {
        id: repostedId,
      },
    });

    if (res && deletePost) {
      revalidatePath('/feed');
      return { ok: true };
    }

    return { ok: false };
  });
};

export const isRepostedAction = async (postId: number, userId: string) => {
  const res = await prisma.rePosts.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (res) return { ok: true };
  return { ok: false };
};
