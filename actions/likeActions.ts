'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const likePostAction = async (postId: number, userId: string) => {
  console.log('reached here');
  try {
    const likeExists = await prisma.likes.findMany({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (likeExists.length > 0) return null;

    console.log('creating like');
    await prisma.likes.create({
      data: {
        postId,
        userId,
      },
    });

    return { ok: true };
  } catch (err) {
    return null;
  }
};

export const isLikedAction = async (postId: number, userId: string) => {
  try {
    const likeExists = await prisma.likes.findMany({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    console.log('likeExists', likeExists);
    if (likeExists.length > 0) return { ok: true };
    return { ok: false };
  } catch (err) {
    return null;
  }
};

export const removeLikeAction = async (postId: number, userId: string) => {
  try {
    await prisma.likes.deleteMany({
      where: {
        postId,
        userId,
      },
    });

    return { ok: true };
  } catch (err) {
    return null;
  }
};
