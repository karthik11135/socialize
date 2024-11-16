'use client';
import * as React from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { useRouter } from 'next/navigation';
import { addPostAction, revalidatePosts } from '@/actions/postActions';

const formSchema = z.object({
  postContent: z.string().min(5),
  image: z.any(),
});

type formType = z.infer<typeof formSchema>;

export function NewPost() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const submitHandler: SubmitHandler<formType> = async (data) => {
    setLoading(true);
    try {
      let bytes = null;
      if (data.image[0]) {
        const arrayBuffer = await data.image[0].arrayBuffer();
        bytes = Buffer.from(arrayBuffer);
      }

      const res = await addPostAction('2', {
        postContent: data.postContent,
        image: JSON.stringify(bytes),
      });

      if (res.status) {
        router.push('/feed');
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <Card className="w-3/6 mt-20 bg-black text-slate-50 border-neutral-700 mx-auto">
      <CardHeader>
        <CardTitle>Upload a POST</CardTitle>
        <CardDescription>Deploy your new post to the world.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Input
                {...register('postContent')}
                placeholder="Say something..."
              />
              {errors.postContent && <p>{errors.postContent.message}</p>}
            </div>
            <div>
              <Label htmlFor="content">Upload an image</Label>
              <Input
                {...register('image')}
                type="file"
                className="w-fit"
                placeholder="Say something..."
              />
              {errors.image && <p>errornous input</p>}
            </div>
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? 'Loading' : 'Post'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
