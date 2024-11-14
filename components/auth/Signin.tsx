'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Oauth from './Oauth';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

type formType = z.infer<typeof formSchema>;

export const Signin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const submitHandler: SubmitHandler<formType> = (data) => {
    console.log('hye there');
    console.log(data);
  };

  return (
    <form
      className="text-zinc-100 border rounded border-zinc-800 mt-10 px-10 py-8 w-2/6 mx-auto"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2 className="scroll-m-20 text-center pb-2 mb-7 text-3xl font-semibold tracking-tight first:mt-0">
        Login Form
      </h2>
      <Oauth />
      <div className="mb-4">
        <label className="text-zinc-200 font-semibold tracking-tight">
          Email
        </label>
        <Input className="border-neutral-700" {...register('email')}></Input>
        {errors.email && (
          <p className="text-red-500 text-sm font-semibold my-1">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-zinc-200 font-semibold tracking-tight">
          Password
        </label>
        <Input className="border-neutral-700" {...register('password')}></Input>
        {errors.password && (
          <p className="text-red-500 text-sm font-semibold my-1">
            {errors.password.message}
          </p>
        )}
      </div>
      <Button
        disabled={isLoading}
        className="w-full"
        variant={'secondary'}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};
