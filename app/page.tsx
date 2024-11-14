import Navbar from '@/components/ui/Navbar';
import { Signin } from '@/components/auth/Signin';
import { Signup } from '@/components/auth/Signup';
import Post from '@/components/posts/Post';

export default function Home() {
  return (
    <div>
      <h1 className="scroll-m-20 bg-clip-text text-transparent bg-gradient-to-br text-center mt-40 from-slate-50 to-slate-600 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to Socialize
      </h1>
    </div>
  );
}
