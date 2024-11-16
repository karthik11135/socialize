'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dyglifgei',
  api_key: '936352583434641',
  api_secret: '_pI9cbdc2udRlaChOGyoS0ZmA4I',
});

export const getAllPostsAction = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: [{
        createdAt: 'desc',
      }],
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    console.log(posts)
    return posts;
  } catch (err) {
    return null;
  }
};

export const revalidatePosts = () => {
  revalidatePath('/feed');
  return;
};

export const likePostAction = async (postId: number, inc: boolean) => {
  try {
    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: { increment: inc ? 1 : -1 },
      },
    });
    revalidatePath('/feed');
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

export const addPostAction = async (
  userId: string,
  data: { image?: any; postContent: string }
) => {
  console.log(data);

  try {
    if (!JSON.parse(data.image)) {
      await prisma.post.create({
        data: {
          postContent: data.postContent,
          picture: '',
          userId: '2',
        },
      });
      revalidatePath('/feed');
      return { ok: true, status: 200 };
    }

    cloudinary.uploader
      .upload_stream(
        {
          folder: 'postImages',
          eager: [{ effect: 'upscale' }, { width: '4.0', crop: 'scale' }],
        },
        async (err, res) => {
          if (!err) {
            await prisma.post.create({
              data: {
                postContent: data.postContent,
                picture: res ? res.url : '',
                userId: '2',
              },
            });
            revalidatePath('/feed');
            return { ok: true, status: 200 };
          } else {
            console.log(err);
          }
        }
      )
      .end(Buffer.from(JSON.parse(data.image).data));
  } catch (err) {
    return { status: 400, ok: false };
  }
  return { status: 400, ok: false };
};
