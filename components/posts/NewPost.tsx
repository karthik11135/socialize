'use client';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
  postContent: z.string(),
  image: z.string(),
});

type formType = z.infer<typeof formSchema>;

export function NewPost() {
  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const submitHandler: SubmitHandler<formType> = (data) => {
    console.log('hey tehrerere');
    console.log(data);
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
                id="content"
                placeholder="Say something..."
              />
            </div>
            <div>
              <Label htmlFor="content">Upload an image</Label>
              <Input
                {...register('image')}
                id="content"
                type="file"
                className="w-fit"
                placeholder="Say something..."
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Post
          </Button>
          <button>submit </button>
        </form>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button disabled={isLoading} className="w-full">
          Post
        </Button>
      </CardFooter> */}
    </Card>
  );
}
