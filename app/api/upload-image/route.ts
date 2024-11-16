import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


cloudinary.config({
  cloud_name: 'dyglifgei',
  api_key: '936352583434641',
  api_secret: '_pI9cbdc2udRlaChOGyoS0ZmA4I',
});

export async function POST(req: NextRequest, responses: NextResponse) {
  const data = await req.json();

  try {
    if (!data.image) {
      await prisma.post.create({
        data: {
          postContent: data.postContent,
          picture: '',
          userId: '2',
        },
      });
      return NextResponse.json({ ok: true, status: 200 });
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
            return NextResponse.json({ ok: true, status: 200 });
          } else {
            console.log(err);
          }
        }
      )
      .end(Buffer.from(data.image.data));

  } catch (err) {
    return NextResponse.json({ status: 400, ok: false });
  }
  return NextResponse.json({ status: 400, ok: false });
}
