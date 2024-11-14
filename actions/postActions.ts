'use server';
import prisma from '@/lib/db';

export const getAllPostsAction = async () => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        likes: true,
        postContent: true, 
        picture: true,
        userId: true,
        _count: {
          select: {
            comments: true,
          }
        }
      }
    });
    return posts;
  } catch (err) {
    return null;
  }
};

export const likePostAction = async (postId: number) => {
  try {
    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: { increment: 1 },
      },
    });
  } catch (err) {
    return null;
  }
};

export const addCommentAction = async (
  userId: string,
  postId: number,
  comment: string
) => {
  try {
    await prisma.comment.create({
      data: {
        userId: userId,
        commentContent: comment,
        postId: postId,
      },
    });
  } catch (err) {
    return null;
  }
};
