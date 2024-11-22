'use client';
import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
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
import { addPostAction } from '@/actions/postActions';
import { useAuth } from '@clerk/nextjs';

const formSchema = z.object({
  postContent: z.string().min(5),
  image: z.any(),
});

type formType = z.infer<typeof formSchema>;

export function NewPost() {
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [imageFile, setImageFile] = React.useState('');
  const { userId } = useAuth();

  const submitHandler: SubmitHandler<formType> = async (data) => {
    setLoading(true);
    try {
      let bytes = null;
      if (data.image[0]) {
        const arrayBuffer = await data.image[0].arrayBuffer();
        bytes = Buffer.from(arrayBuffer);
      }

      if (userId) {
        const res = await addPostAction(userId, {
          postContent: data.postContent,
          image: JSON.stringify(bytes),
        });

        if (res.status) {
          router.push('/feed');
        }
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
          <div className="grid w-full mb-4 items-center gap-4">
            <div>
              {imageFile !== '' && (
                <Image
                  src={imageFile}
                  id={'imageInput'}
                  className='rounded-md mb-2'
                  alt="nn"
                  width={700}
                  height={700}
                />
              )}
              <Label htmlFor="content">Upload an image - max 5mb</Label>
              <Input
                {...register('image')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  if (e.target.files !== null)
                    setImageFile(URL.createObjectURL(e.target.files[0]));
                }}
                type="file"
                className="w-1/6 bg-blue-300 px-0 py-0 h-fit border border-neutral-700"
                placeholder="Say something..."
              />
              {errors.image && <p>errornous input</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">
                Content <span className="text-red-400">*</span>
              </Label>
              <textarea
                rows={4}
                className="border bg-black rounded-md px-2 py-1 focus:outline-none font-light border-neutral-700"
                {...register('postContent')}
                placeholder="Say something..."
              />
              {errors.postContent && (
                <p className="text-xs text-red-600 px-0.5">
                  {errors.postContent.message}
                </p>
              )}
            </div>
          </div>
          <Button
            onClick={() => {
              toast({
                description:
                  'Image containing posts take around 1-2 min to load',
              });
            }}
            disabled={loading}
            type="submit"
            className="w-full"
          >
            {loading ? 'Loading' : 'Post'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
